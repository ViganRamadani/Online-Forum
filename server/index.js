const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const config = require('./config/db')
const app = express()


mongoose.set('useFindAndModify', false);
//configure database and mongoose
mongoose.set('useCreateIndex', true)
mongoose // Connect to the database
  .connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database is connected')
  })
  .catch(err => {
    console.log({ database_error: err })
  })
// db configuaration ends here

//registering cors 
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(morgan('dev'))  // configire morgan

const PORT = process.env.PORT
app.listen(PORT, (err) => {
  if (err) {
    console.log("Huoston, we got a problem.", err)
  } else
    console.log(`App is running on port: ${PORT}`)
})

// define first route
app.get('/', (req, res) => {
  console.log('HEllo')
})

const userRoutes = require('./route/index')  //bring in our user routes
app.use('/user', userRoutes)

//Category posts
// const categoryAPI = require('./route/category')

// app.use('/category', categoryAPI)
