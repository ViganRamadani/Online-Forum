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
      res.json(myDoc);
    })
    .catch((err) => {
      console.error(err);
  })
} 