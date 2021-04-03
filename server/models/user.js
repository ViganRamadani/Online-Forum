const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please Include your username']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please Include your email']
  },
  isAdmin: {
    type: { Boolean, default: false }
  },
  // uid: { 
  //   type: String,
  //   required: [true, 'Please Include your id']
  // }
})

module.exports = mongoose.model('User', userSchema)