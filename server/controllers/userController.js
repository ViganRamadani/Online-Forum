const User = require('../models/user')


exports.signUp = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    isAdmin: false,
  })
  try {
    const newUser =  await user.save()
    return res.status(201).json(newUser)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

exports.getAllUsers = async (req, res) => {
  User.find().sort({ createdAt: -1 })
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

exports.getUser = (req, res) => {
  // const currentUser = req.params.username;
  
  User.findOne({ username: req.params.username })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      // console.log(err)
      res.status(500).json(err)
    })
}

exports.addProfile = async (req, res) => {
  try {
    var user = await User.findOne({ "username": req.body.username })
    if (req.body.profilePath !== null) {
      user.profilePath = req.body.profilePath
    }
    console.log(user.profilePath)
    await user.save()
  } catch (err) {
    console.log(err)
  }
  
}
