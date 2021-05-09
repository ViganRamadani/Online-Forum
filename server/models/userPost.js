const mongoose = require('mongoose')

const userPostSchema = mongoose.Schema ({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true, default: '' },
  author: {type: String, required: true},
  },
  { timestamps: true }
)

module.exports = mongoose.model('UserPosts', userPostSchema)
