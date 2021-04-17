const express = require('express');
const categoryRoute = express.Router();
let CategoryModel = require('../models/CategoryPost');

categoryRoute.route('/').get((req, res) => {
    console.log('test');
    CategoryModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 categoryRoute.route('/createcategorypost').post((req, res, next) => {
    CategoryModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

categoryRoute.route('/edit-categoryPost/:id').get((req, res) => {
    CategoryModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update student
categoryRoute.route('/update-categoryPost/:id').post((req, res, next) => {
    CategoryModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Student successfully updated!')
    }
  })
})

// Delete student
categoryRoute.route('/delete-categoryPost/:id').delete((req, res, next) => {
    CategoryModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = categoryRoute;