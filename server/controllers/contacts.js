// var Contacts = require('../models/Contacts');
// var express = require('express');
// var mongoose = require('mongoose');
// var router = require.Router();

// // CRUD Routers

// // GET ALL DATA
// router.get('/', function (req, res, next){
//   Contacts.find(function (err,contacts){
//     if(err) return next(err);
//     res.json(contacts);

//   })
// })

// // GET single DATA by ID
// router.get('/:id', function (req, res, next) {
//   Contacts.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   })
// })

// // POST create DATA to
// router.post('/', function (req, res, next) {
//   Contacts.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   })
// })

// // EDIT DATA 
// router.put('/:id', function (req, res, next) {
//   console.log("req.body");
//   Contacts.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   })
// })

// // DELETE DATA 
// router.delete('/:id', function (req, res, next) {
//   Contacts.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   })
// })


// module.exports = router;

