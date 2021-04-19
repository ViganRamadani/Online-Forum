const mongoose = require('mongoose')

const postDetails = mongoose.Schema({
  postId: {
    type: String,
    required: true
  },
  forum: {
    type: String,
    required: true
  },
  postTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
},
{ 
  timestamps: true
})

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
  profilePath: {
    type: String,
    sparse: true,
    unique: false,
  },
  isAdmin: {
    type: { Boolean, default: false }
  },
  allPosts: [ postDetails ]
},
{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
