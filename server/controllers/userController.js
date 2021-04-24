const User = require('../models/user')


exports.signUp = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Missing required Content!"})
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    isAdmin: false,
  })

  await user.save(user)
    .then(() => {
      res.status(200).send("User created successfully!")
    }).catch(err => {
      return res.status(500).send({ message: err.message || "Some error occurred while creating a new user" })
    })
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
  User.findOne({ username: req.params.username })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      // console.log(err)
      res.status(500).send(err)
    })
}

exports.addProfile = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({message: 'Missing required Params!'})
  }
  try {
    var user = await User.findOne({ "username": req.body.username })
    if (!user) {
      return res.status(404).send({ message: `Cannot find User: ${req.body.username}` })
    }
    if (req.body.profilePath !== null) {
      user.profilePath = req.body.profilePath
    }
    console.log(user.profilePath)
    await user.save()
    return res.status(201).send("Profile updated!")
  } catch (err) {
    res.status(500).send({message: "Some error occurred while trying to update your profile."})
    return console.log(err)
  }
  
}
