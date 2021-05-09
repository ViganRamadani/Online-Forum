const mongoose = require('mongoose')
// const userPosts = require('./userPost')
const commentSchema = mongoose.Schema({
  commentedBy: { type: String, required: false },
  commentDescription: { type: String, required: false },
})

const userPostSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, },
  author: { type: String, required: true },
  likes: [{
    likedBy: { type: String, required: true },
    postId: { type: String, required: true },
  }],
  likeCount: { type: Number, required: true , default: 0 },
  comments: [ commentSchema ],
  commentCount: { type: Number, required: true, default: 0 },
}, { timestamps: true }
)

const forumSchema = mongoose.Schema({
  forumTopic: { type: String, unique: true,
    required: [true, 'Please Include your forumTopic']
  },
  forumDescription: { type: String,
    required: [true, 'Please Include your forumDescription']
  },
  imagePath: { type: String, required: true },
  allPosts: [ userPostSchema ],
  postsSum: { type: Number, required: true, default: 0},
  },
  { timestamps: true }
  )

module.exports = mongoose.model('Forum', forumSchema)