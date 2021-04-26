const express = require('express')
const router = express.Router()
var multer = require('multer');
const crypto = require("crypto");
var upload = multer({ dest: 'uploads/' }) // Creates a uploads/ Folder

//@ ROUTES METHODS
const userPostController = require('../controllers/userPostController')
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const reportController = require('../controllers/reportController')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomBytes(16).toString("hex") + ".jpg") //Appending extension
  }
})
var upload = multer({ storage: storage });

router.post('/user/addImage', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

//@ ADMIN
router.get('/allUsers', userController.getAllUsers)
router.post('/admin/forumImg', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

//@ ADMIN Forum
router.post('/admin/createForum', adminController.createForum)
router.post('/addPost/:forumTopic', userPostController.addUserPost)

router.patch('/updatePost/:forumTopic&:id', userPostController.updatePost)
router.patch('/admin/editUserRole/:username', adminController.editUserRole)

router.get('/getForums', adminController.getForums)
router.get('/getForumPosts/:forumTopic', adminController.getForumPosts)

router.delete('/admin/deleteUser/:username', adminController.deleteUser)

// //@ USER
router.post('/signUp', userController.signUp)

router.get('/:username', userController.getUser)

router.post('/profilePic', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});
router.patch('/addProfile', userController.addProfile)

// //@ USER POST
router.get('/getPost/:username&:id', userPostController.getPost)
// router.get('/getPost/:id', userPostController.getPost)

router.put('/like/:username&:postId', userPostController.likePost)
router.put('/unlike/:username&:postId', userPostController.unlikePost)

router.delete('/deletePost/:username&:postId', userPostController.deletePost)


// router.get('/test/:username', userPostController.test)

// //@ Forum
// router.post('/createForum', adminController.createForum)

// ! REPORTS
router.post('/report/:author&:postId', reportController.createReport)


module.exports = router