const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
});

// takes 2 parameters, 1 being the strategy used, 2 the callback function
passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: 'localhost:3000',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // console.log(profile.emails[0].value)  returns gavinc5523@gmail.com
            // check if user already exists
            const currentUser = await User.findOne({ googleId: profile.id });
            if (currentUser) {
                // already have the user -> return (login)
                console.log('logging in existing user' + currentUser)
                return done(null, currentUser);
            } else {
                // register user and return
                const newUser = await new User({
                    name: profile.displayName,
                    googleEmail: profile.emails[0].value,
                    token: accessToken,
                    password: ''
                }).save();
                console.log('Registering new user' + newUser)
                return done(null, newUser);
            }
        } catch (error) {
            console.log(error)
        }

    }
    )
);
