const express = require('express')
const router = express.Router()

const userPostController = require('../controllers/userPostController')
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')

//@ ADMIN
router.get('/allUsers', userController.getAllUsers)

//@ USER
router.post('/signUp', userController.signUp)
router.get('/:id', userController.getUser)


//@ USER POST
router.post('/addPost', userPostController.addUserPost)

//@ Forum
router.post('/createForum', adminController.createForum)


module.exports = router