const User = require('../models/user')

exports.signUpUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    isAdmin: false
  })
  try {
    const newUser = await user.save()
    return res.status(201).json(newUser)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

exports.getAllUsers = async (req, res) => {
  User.find().sort({ createdAt: -1 })
    .then(users => {
      res.status(200).json(users)
      // res.render('index', {title: 'all users', user: users})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

exports.getUser = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      console.log(user)
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}