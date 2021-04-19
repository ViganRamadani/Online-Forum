const mongoose = require('mongoose')
// const { Schema } = require('mongoose');
// const User = require('user')

const userPostSchema = mongoose.Schema ({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String },
  author: {type: String, required: true},
  },
  { timestamps: true }
)

module.exports = mongoose.model('UserPosts', userPostSchema)
