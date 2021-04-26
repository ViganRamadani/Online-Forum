const User = require('../models/user')
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

//! Completly Deltes a USER also with all he's posts from the Forums Collection
exports.deleteUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Missing required Params!" })
  }
  try {
    var user = await User.findOne({ "username": req.params.username });
    if (!user) {
      return res.status(404).send({ message: `Cannot find User: ${req.params.username}` });
    }
    // console.log(user.allPosts)
    user.allPosts.forEach(async (post) => {
      console.log(post) //* Will List all the Users Posts
      
      var forum = await Forum.findOneAndUpdate({ 'forumTopic': post.forum },
        { $pull: { allPosts: { "_id": post.postId } } }, 
        { safe: true });
    });
    await user.remove(); 

    res.send(`User: ${user.username} was Deleted Duccessfully!` )
  } catch (err) {
    console.log(err)
  }
}

exports.editUserRole = async (req, res) => {
  console.log(req.body)
  if (req.params.username == null || typeof (req.params.username) != 'string') {
    return res.status(400).send({ message: "Missing required Params!" })
  }
  // if (req.body.isAdmin == null || typeof (req.body.isAdmin) != 'boolean') {
  //   return res.status(400).send({ message: "Missing required Params!" })
  // }
  try {
    const user = await User.findOneAndUpdate({"username": req.params.username}, req.body)
    if (!user) {
      return res.status(404).send({ message: `Cannot Update user: ${user}. User may not be foud!`})
    } else {
      const isRole = req.body.isAdmin
      return res.status(201).send(`${user.username}'s Role was updated to "${isRole}" successfully!`)
    }
  } catch (err) {
    console.log(err)
  }
}


  // User.findById(id).then((user) => {
  //   // Forum.find({ author: user.username })
  //   Forum.deleteMany({ author: user.username })
  // })


    
  

// exports.getUser = (req, res) => {
//   const currentUser = req.params.id;
//   // const currentUser = req.params.username

//   User.findOne({ username: currentUser })
//     .then(data => {
//       res.status(200).json(data)
//     })
//     .catch(err => {
//       // console.log(err)
//       res.status(500).json(err)
//     })
// }



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
