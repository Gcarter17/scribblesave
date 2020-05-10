const express = require('express')
// const path = require('path');      ---------- dont know the use of yet
const cors = require('cors');
const connectDB = require('./config/db')
const app = express();
app.use(cors())
connectDB();

// init middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  // res.json({ msg: 'welcome to the api' })
  res.send('hello')
  console.log('hello')
})


//Import routes
app.use('/api/users', require('./server/routes/users'))
app.use('/api/auth', require('./server/routes/auth'))
app.use('/api/contacts', require('./server/routes/contacts'))



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

