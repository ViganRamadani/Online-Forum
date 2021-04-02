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
  }
  // uid: { 
  //   type: String,
  //   required: [true, 'Please Include your id']
  // }
})

// const User = mongoose.model('User', userSchema)

module.exports = mongoose.model('User', userSchema)