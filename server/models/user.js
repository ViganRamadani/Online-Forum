const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
  // likedId: { type: ObjectId, ref: "users"},
  likedBy: { type: String, required: true },
  postId: { type: String, required: true },
})

const commentSchema = mongoose.Schema({ 
  commentedBy: { type: String, required: false },
  commentDescription: { type: String, required: false },
})

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
    type: String
  },
  likes: [ likeSchema ],
  likeCount: { type: Number, required: true, default: 0 },
  comments: [ commentSchema ],
  commentCount: { type: Number, required: true, default: 0 },
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
    default: null,
    unique: false,
  },
  isAdmin: {
    type: Boolean, 
    required: true, 
    default: false  
  },
  allPosts: [ postDetails ],
  bio: { type: String, default: null},
},
{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
