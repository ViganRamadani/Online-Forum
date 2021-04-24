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
    .then((myDoc) => {
      console.log(myDoc);
      res.send(myDoc);
    })
    .catch((err) => {
      console.error(err);
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
  const postId = req.params.postId;
  const author = req.params.author;
  var index;
  // console.log(postId)
  await User.findOne({ "username": author}, (err, results) => {
    if (!err) {
      // console.log(results)
      // res.send(results);
      for (let i = 0; i < results.allPosts.length; i++) {
        if (results.allPosts[i].postId == req.params.postId) {
          index = i;
          break;
        }
      }
      // res.send(results.allPosts[index]);
      User.findOneAndUpdate({"allPosts.postId": postId},
        {
          "$push": { ["allPosts." + index + ".likes"]: req.params }
        }, 
        (err, result) => {
          // res.redirect('/home/' + req.params.postId);
          res.send(result);
          // res.redirect('/');
        })
        .catch(err => {
          console.log(err);
        })

    } else {
      console.log(err)
    }

  // const user = User.findOne({
  //   "username": req.params.username,
  //   "allPosts.postId": pId
  // },
  // {
  //   $push: { allPosts: {"postId": pId} }
  // })
})
}
