const express = require('express')
const router = express.Router()
const User = require('../model/user')
const UserPost = require('../model/userPost')

const userController = require('../controller/userController')

// router.post('/signUp', userController.signUpUser)

router.post('/signUp', async(req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
    alert("Post Created")
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post('/addPost', async (req, res) => {
  const userPost = new UserPost({
    title: req.body.title,
    description: req.body.description,
  })
  try {
    const newUserPost = await userPost.save()

    res.status(201).json(newUserPost)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.get('/allUsers', userController.getAllUsers)

// router.post('/login', userController.loginUser)
// router.get('/me', userController.getUserDetails)




module.exports = router