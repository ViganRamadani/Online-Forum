// const User = require('../models/user')
const UserPost = require('../models/userPost')
const Forum = require('../models/forum')

exports.addUserPost = async (req, res) => {
  // console.log(req.body)
  const userPost = new UserPost({
    title: req.body.title,
    description: req.body.description,
    imagePath: req.body.imagePath,
    author: req.body.author
  })
  // console.log(userPost)

  try {
    var forum = await Forum.findOne({ forumTopic: req.params.forumTopic });
    forum.allPosts.push(userPost);
    forum.save()
    res.send(userPost)
  } catch (err) {
    console.log(err)
  }
}

exports.getPost = async (req, res) => {
  UserPost.find().sort({ createdAt: -1 })
  
}