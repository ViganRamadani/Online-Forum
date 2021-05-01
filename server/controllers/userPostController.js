const User = require('../models/user')
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
  try {
    var forum = await Forum.findOne({ forumTopic: req.params.forumTopic });
    forum.allPosts.push(userPost);
    forum.save()
    var user = await User.findOne({ username: req.body.author });
    var obj = {
      postId: userPost._id,
      forum: req.params.forumTopic,
      postTitle: userPost.title,
      description: userPost.description,
      imagePath: userPost.imagePath
    };
    user.allPosts.push(obj);
    user.save();
    res.send(userPost)
  } catch (err) {
    console.log(err)
  }
}

exports.updatePost = async (req, res) => {
  try {
    var forum = await Forum.findOne({ "forumTopic": req.params.forumTopic, "allPosts._id": req.params.id });

    if (req.body.title != null) {
      forum.allPosts.id(req.params.id).title = req.body.title;
    }
    if (req.body.description != null) {
      forum.allPosts.id(req.params.id).description = req.body.description;
    }
    // if (req.body.category != null) {
    //   user.articles.id(req.params._id).category = req.body.category;
    // }
    forum.save();
    // res.send(forum.allPosts.id(req.params.id));
  } catch (err) {
    console.log(err)
  }

}

exports.getPost = async (req, res) => {
  await User.findOne(
    {
      "username": req.params.username,
      "allPosts.postId": req.params.id
    },
    {
      'profilePath': 1,
      'allPosts.$': 1,
      'username': 1,
    })
    .then((myPost) => {
      console.log(myPost);
      res.send(myPost);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    })
}

exports.deletePost = async (req, res) => {
  try {
    // res.status(202).send("Proccessing Request.")
    const pId = req.params.postId;
    const user = await User.findOneAndUpdate(
      {
        "username": req.params.username,
        "allPosts.postId": pId
      },
      {
        $pull: { allPosts: { "postId": pId } }
      }, { safe: true }).then(async data => {
        var filteredPost = await data.allPosts.filter(obj => {
          if (pId == null) {
            return res.status(404, "The Post on the Forums Collections is not found!").end()
          } return obj.postId == pId;
        })[0]; //@ the [0] selects the object withing the array of only one single object... like me :D
        // console.log(filteredPost);
        const forum = await Forum.findOneAndUpdate(
          {
            'forumTopic': filteredPost.forum
          },
          {
            $pull: { allPosts: { '_id': filteredPost.postId } }
          }, { safe: true }
        )
        // console.log(forum)
      })
    res.status(200).send("Post Deleted!")
  } catch (err) {
    console.error(err);
  }
}


exports.likePost = async (req, res) => {
  const username = req.params.username;
  var index;

  await User.findOne({ "username": username }, (err, post) => {
    if (!err) {
      for (let i = 0; i < post.allPosts.length; i++) {
        if (post.allPosts[i].postId == req.params.postId) {
          index = i;
          break;
        }
      }
      const obj = {
        postId: req.params.postId,
        likedBy: req.body.likedBy
      }

      User.findOneAndUpdate({ "username": username},
        {
          "$push": { ["allPosts." + index + ".likes"]: obj },
          "$inc": { ["allPosts." + index + ".likeCount"]: 1 },
        }, 
        { 
          returnOriginal: false //@ This ensures returning the updated Document Object
        }).then((post) => {
          res.send(post);
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
    } else {
      // res.status(400).send(err);
      console.log(err)
    }
  })
}

exports.test = (req, res) => {
  User.find({"username": req.params.username}).populate('likes')
    .then(data => {
      res.send(data);
    })
}

exports.unlikePost = async (req, res) => {
  const username = req.params.username;
  var index;

  await User.findOne({ "username": username }, (err, post) => {
    if (!err) {
      for (let i = 0; i < post.allPosts.length; i++) {
        if (post.allPosts[i].postId == req.params.postId) {
          index = i;
          break;
        }
      }
      const obj = {
        postId: req.params.postId,
        likedBy: req.body.likedBy
      }

      User.findOneAndUpdate({ "username": username },
        {
          "$pull": { ["allPosts." + index + ".likes"]: obj },
          "$inc": { ["allPosts." + index + ".likeCount"]: -1 },
          returnOriginal: false
        },
        {
          returnOriginal: false //@ This ensures returning the updated Document Object
        }).then((post) => {
          res.send(post);
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
    } else {
      // res.status(400).send(err);
      console.log(err)
    }
  })
}
