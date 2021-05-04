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

//@ ADMIN
router.get('/allUsers', userController.getAllUsers)


//@ ADMIN Forum
router.post('/admin/forumImg', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});
router.post('/admin/createForum', adminController.createForum)

router.patch('/updatePost/:forumTopic&:id', userPostController.updatePost)
router.patch('/admin/editUserRole/:username', adminController.editUserRole)

router.get('/getForums', adminController.getForums)
router.get('/getForumPosts/:forumTopic', adminController.getForumPosts)

router.delete('/admin/deleteUser/:username', adminController.deleteUser)
router.delete('/admin/forumTopic/:forumTopic', adminController.deleteForum)

router.get('/test', adminController.test)

//@ ADMIN Reports
router.post('/report/:author&:postId', reportController.createReport)

router.get('/reports', reportController.getReports)
router.get('/reports/:reportReason', reportController.getFilteredReports)

router.delete('/deleteReport/:reportId', reportController.deleteReport)


//@ USER
router.post('/signUp', userController.signUp)
router.post('/profilePic', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});


router.get('/:username', userController.getUser)

router.patch('/addProfile', userController.addProfile)

// //@ USER POST
router.post('/addPost/:forumTopic', userPostController.addUserPost)
router.post('/user/addImage', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

router.get('/getPost/:username&:id', userPostController.getPost)

router.put('/like/:username&:postId', userPostController.likePost)
router.put('/unlike/:username&:postId', userPostController.unlikePost)
router.post('/comment/:username&:postId', userPostController.commentPost)

router.delete('/deleteComment/:username&:postId', userPostController.deleteCommentPost)
router.delete('/deletePost/:username&:postId', userPostController.deletePost)

module.exports = router