// let express = require('express'),
//   cors = require('cors'),
//   mongoose = require('mongoose'),
//   database = require('./config/db'),
//   bodyParser = require('body-parser');

// // Connect mongoDB
// mongoose.Promise = global.Promise;
// mongoose.connect(database.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Database connected")
//   },
//   error => {
//     console.log("Database could't be connected to: " + error)
//   }
// )
// const app = express();

// const categoryAPI = require('../server/route/category.route')
// // const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// app.use(cors());

// // API
// app.use('/api', categoryAPI)

// // Create port
// const port = process.env.PORT || 3000;
// const server = app.listen(port, () => {
//   console.log('Connected to port ' + port)
// })

// // Find 404
// app.use((req, res, next) => {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });