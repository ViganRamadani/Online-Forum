const mongoose = require('mongoose')
// const { Schema } = require('mongoose');
// const User = require('user')
const {ObjectId} = mongoose.Schema.Types

const userPostSchema = mongoose.Schema ({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String },
  author: {type: String, required: true},
  // likes: [{
    // likedBy: { type: ObjectId, ref: 'User', },
    // postId: { type: String, required: true },
    // }], 
  },
  { timestamps: true }
)

module.exports = mongoose.model('UserPosts', userPostSchema)
