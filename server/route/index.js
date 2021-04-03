const express = require('express')
const router = express.Router()

const userPostController = require('../controllers/userPostController')
const userController = require('../controllers/userController')

//@ USER
router.post('/signUp', userController.signUpUser)
router.get('/allUsers', userController.getAllUsers)
router.get('/:id', userController.getUser)
// router.get('/me', userController.getUserDetails)

//@ USER POST
router.post('/addPost', userPostController.addUserPost)

module.exports = router