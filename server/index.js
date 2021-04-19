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

// mongoose.onc

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
  console.log('')
})

const userRoutes = require('./route/index')  //bring in our user routes
app.use('/user', userRoutes)

//Category posts
const categoryAPI = require('./route/category')
// // const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
//  app.use(cors());

// API
app.use('/category', categoryAPI)

// Find 404
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });
// Create port
// const port = process.env.PORT || 4000;
// const server = app.listen(port, () => {
//   console.log('Connected to port ' + port)
// })
