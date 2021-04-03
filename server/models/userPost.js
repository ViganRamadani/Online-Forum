const mongoose = require('mongoose')

const userPostSchema = mongoose.Schema ({
  // postOwner: { type: Schema.Types.ObjectId, ref: 'user' },

  title: { type: String },
  description: { type: String }
},
  { timestamps: true }
)

module.exports = mongoose.model('UserPosts', userPostSchema)
