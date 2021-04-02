const User = require('../model/user')
// const firebaseFunctions = require('firebase-functions');

exports.signUpUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
  })
  try {
    const newUser = await user.save()

    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
  // try {
  //   const user = new User({
  //     username: req.body.username,
  //     email: req.body.email,
  //   })

  //   user.save(err => {
  //     if(err) {
  //       res.json(err) 
  //     } else {
  //       res.json("Succesfully Saved User!")
  //     }
  //   });
  //   // let userData = await user.save()
  // } catch (err) {
  //   res.status(400).json({ err: err })
  //   console.log(err)
  // }
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

// exports.getAllUsers = async (req, res) => { 
//   const user = await getAllUsers()
//   res.send(await user.find().toArray())
// }
