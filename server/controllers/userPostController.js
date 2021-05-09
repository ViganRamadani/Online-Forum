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
  const forumTopic = req.body.forumTopic;
  var index;
  const obj = {
    postId: req.params.postId,
    likedBy: req.body.likedBy
  }
  // console.log(forumTopic);
  try {
    //@ Liking in forum
    await Forum.findOne({"forumTopic": forumTopic }, (err, forum) => {
      // console.log(forum)
      for (let i = 0; i < forum.allPosts.length; i++) {
        if (forum.allPosts[i]._id == req.params.postId) {
          index = i;
          break;
        }
      }
      postsSum = forum.allPosts.length
      likeSum = forum.allPosts[index].likes.length + 1
    }).then(async () => {
      await Forum.findOneAndUpdate({ "forumTopic": forumTopic },
        {
          "$set": { "postsSum": postsSum },
          "$push": { ["allPosts." + index + ".likes"]: obj },
          "$set": { ["allPosts." + index + ".likeCount"]: likeSum },
          // "$inc": { ["allPosts." + index + ".likeCount"]: 1 },
        }).catch(err => {
          console.error(err);
        })
    })
    //@ Liking in user
    await User.findOne({ "username": username }, (err, post) => {
      // console.log(post)
      for (let i = 0; i < post.allPosts.length; i++) {
        if (post.allPosts[i].postId == req.params.postId) { 
          index = i;
          break;
        }
      }
      likeSum = post.allPosts[index].likes.length + 1
    }).then(async () => {
      await User.findOneAndUpdate({ "username": username },
        {
          "$push": { ["allPosts." + index + ".likes"]: obj },
          "$set": { ["allPosts." + index + ".likeCount"]: likeSum },
          // "$inc": { ["allPosts." + index + ".likeCount"]: 1 },
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
    })
  } catch (err) {
    console.log(err);
  }
}

exports.unlikePost = async (req, res) => {
  const username = req.params.username;
  var index;
  const forumTopic = req.body.forumTopic;
  const obj = {
    postId: req.params.postId,
    likedBy: req.body.likedBy
  }
  try {
    //@ Unliking in forum
    await Forum.findOne({ "forumTopic": forumTopic }, (err, forum) => {
      console.log(forum)
      for (let i = 0; i < forum.allPosts.length; i++) {
        if (forum.allPosts[i]._id == req.params.postId) {
          index = i;
          break;
        }
      }
      postsSum = forum.allPosts.length - 1
    }).then(async () => {
      await Forum.findOneAndUpdate({ "forumTopic": forumTopic },
        {

          "$set": { "postsSum": postsSum },
          "$pull": { ["allPosts." + index + ".likes"]: obj },
          "$inc": { ["allPosts." + index + ".likeCount"]: -1 },
        }).catch(err => {
          console.error(err);
        })
    })
    //@ Unliking in User
      await User.findOne({ "username": username }, (err, post) => {
        for (let i = 0; i < post.allPosts.length; i++) {
          if (post.allPosts[i].postId == req.params.postId) {
            index = i;
            break;
          }
        }
        User.findOneAndUpdate({ "username": username },
          {
            "$pull": { ["allPosts." + index + ".likes"]: obj },
            "$inc": { ["allPosts." + index + ".likeCount"]: -1 },
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
      })
  } catch {
    res.status(400).send(err);
    console.log(err)
  }
}

exports.commentPost = async (req, res) => {
  const username = req.params.username;
  const forumTopic = req.body.forumTopic;
  let index;
  let userIndex;
  const obj = {
    postId: req.params.postId,
    commentedBy: req.body.commentedBy,
    commentDescription: req.body.commentDescription,
  }
  if (!req.body || req.body.commentDescription == '') {
    return res.status(400).send({ message: 'Missing required Params!' })
  }
  await User.findOne({"username": username}).then(user => {
    for (let i = 0; i < user.allPosts.length; i++) {
      if (user.allPosts[i].postId == req.params.postId) {
        userIndex = i;
        break;
      }
    }
    commentSum = user.allPosts[userIndex].comments.length + 1
  }).then(async () => {
    await User.findOneAndUpdate({ "username": username },
    {
      "$push": { ["allPosts." + userIndex + ".comments"]: obj },
      "$set": { ["allPosts." + userIndex + ".commentCount"]: commentSum },
      ["allPosts." + userIndex + "likes"]: 0,
    },
    {
      returnOriginal: false 
    }).then((userData) =>{
      userComments = userData.allPosts[userIndex].comments
      last = Object.keys(userComments)[Object.keys(userComments).length - 1] //@ gets the last index
      res.send(userComments[last]);
    })
  }).catch(err =>{
    console.log(err)
    res.status(404).send("Something went wrong.")
  })

  
}

exports.deleteCommentPost = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Missing required Params!' })
  }
  let postIndex
  let commentIndex;
  const obj = {
    _id: req.body.commentId,
    // commentedBy: req.body.username,

    // commentDescription: req.body.commentDescription,
  }
  // console.log(req.params.postId)
  await User.findOne({ "username": req.body.postAuthor }).then((user) => {
    for (let i = 0; i < user.allPosts.length; i++) {
      if (user.allPosts[i].postId == req.params.postId) {
        postIndex = i;
        // console.log("DONE", postIndex)
        break;
      }
    }
    // const commentLength = user.allPosts[postIndex].comments
    for (var j = 0; j < user.allPosts[postIndex].comments.length; j++) {
      if (user.allPosts[postIndex].comments[j]._id == req.body.commentId) {
        commentIndex = j;
        // console.log("DONE", commentIndex)
        break;
      }
    }
  }).then(async () => {
    console.log(req.body.commentId)
    await User.findOneAndUpdate({ "username": req.body.postAuthor },
    {
      "$pull": { ["allPosts." + postIndex + ".comments" ]: obj },
    },
    {
      returnOriginal: false
    })
    .then(user => {
      res.status(200).send(user)
      console.log("DONE", user)
    })
  })
}