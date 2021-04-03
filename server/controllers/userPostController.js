// const User = require('../models/user')
const UserPost = require('../models/userPost')


exports.addUserPost = async (req, res) => {
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
}