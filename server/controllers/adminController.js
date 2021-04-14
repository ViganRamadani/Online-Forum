// const User = require('../models/user')
const Forum = require('../models/forum')

exports.createForum = async (req, res) => {
  const forum = new Forum({
    forumTopic: req.body.forumTopic,
    forumDescription: req.body.forumDescription,
    imagePath: req.body.imagePath,
    allPosts: req.body.allPosts,
  })
  try {
    const newForum = await forum.save()
    return res.status(201).json(newForum)
  } catch(err) {
    return res.status(400).json({ message: err.message }), console.log(err)
  }
}

exports.getForums = (req, res) => {
  Forum.find().sort({ createdAt: 0 })
    .then(forums => {
      res.status(200).json(forums)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getForumPosts = async (req, res) => {
  Forum.find({ forumTopic: req.params.forumTopic }).sort({ createdAt: -1 })
    .then(forumPosts => {
      res.status(200).json(forumPosts)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getAllUsers = async (req, res) => {
  User.find().sort({ createdAt: -1 })
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}



// exports.createForum = async (req, res) => {
//   const forum = new Forum({
//     forumTopic: req.body.forumTopic,
//     description: req.body.description
//   })
//   try {
//     const newForum = await forum.save()
//     return res.status(201).json(newForum)
//   } catch {
//     return res.status(400).json({ message: err.message })
//   }
// }
