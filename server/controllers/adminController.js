const User = require('../models/user')
const Forum = require('../models/forum')

exports.createForum = async (req, res) => {
  const forum = new Forum({
    forumTopic: req.body.forumTopic,
    forumDescription: req.body.forumDescription,
    imagePath: req.body.imagePath,
    allPosts: req.body.allPosts,
  })
  // console.log(forum.forumTopic, "YEE")
  await Forum.find()
    .then(async allForums => {
      // console.log(allForums)
      // allForums.forEach(async myForum => {
      //   if (myForum.forumTopic == forum.forumTopic) {
      //     return console.log("FOUND"),
      //     console.log(myForum)
      //     // break;
      //   }
      // })
      // @ Instead of using the forEach or a normal forEach you can use some to return a simple true/false 
      const same = allForums.some(myForum => myForum.forumTopic == forum.forumTopic)
      console.log(same)
      if (same === true) {
        //@ 409 = Confilts the data on the Database
        return res.status(409).send("Please enter a different Forum Topic!")
      }
      try {
        const newForum = await forum.save()
        return res.status(201).json(newForum)
      } catch(err) {
        return res.status(400).json({ message: err.message }), 
        console.log(err)
      }
    })
}

exports.getForums = async (req, res) => {

  // Forum.find().sort({ createdAt: 0 }).limit(2).skip(pageIndex).exec()
  Forum.find().sort({ createdAt: -1 })
    .then(forums => {
      res.status(200).json(forums)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.test = (req, res) => {
  Forum.find()
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
      
      var Forum = await Forum.findOneAndUpdate({ 'forumTopic': post.Forum },
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

exports.deleteForum = async (req, res) => {
  forumTopic = req.params.forumTopic

  Forum.findOneAndDelete({forumTopic: forumTopic})
    .then(async forumData => {
      // res.send(forumData)
      const forumPosts = forumData.allPosts
      
      const seen = new Set(); //@ Will set for only the objects with the unique author
      const uniquePosts = forumPosts.filter(el => {
        const duplicate = seen.has(el.author);
        seen.add(el.author);
        return !duplicate;
      });

      const usersAffected = uniquePosts.reduce((a, o) =>
        (a.push([" " + o.author]), a), [])
      // console.log(usersAffected)
      
      console.log(uniquePosts.length);
      for (let i = 0; i < uniquePosts.length; i++) {
        // console.log(uniquePosts[i].author)
        const myUser = await User.findOneAndUpdate(
          {
            "username": uniquePosts[i].author
          },
          {
            $pull: { "allPosts": { "forum": forumTopic }}
          },
          {
            safe: true,
          }).catch(err => {
            console.log(err)
          })
          if (!myUser) {
            res.status(404).send("User not found!");
          }
          await myUser.save()
          console.log(myUser)
      }
      res.status(200).send(`Forum: "${forumTopic}" was deleted altogether with: ${forumPosts.length} post/s form this/these user/s:
        ${usersAffected}
      `)
    }).catch(err => {
      console.log(err)
    })
}
  
