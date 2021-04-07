const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  forumTopic: {
    type: String,
    unique: true,
    required: [true, 'Please Include your username']
  },
  description: {
    type: String,
    required: [true, 'Please Include your description']
  },
  // uid: { 
  //   type: String,
  //   required: [true, 'Please Include your id']
  // }
})

module.exports = mongoose.model('Forum', userSchema)