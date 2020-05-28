const mongoose = require('mongoose');
const config = require('./keys')

// everywhere that says config.get needs to be changed to support default.json being changed to js and files sorted into a server folder

const mongoURI = config.mongoURI

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

