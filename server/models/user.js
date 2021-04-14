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
  }
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
  isAdmin: {
    type: { Boolean, default: false }
  },
  allPosts: [ postDetails ]
  // postId: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }]
})


// module.exports = mongoose.model('All', postDetails)

module.exports = mongoose.model('User', userSchema)
