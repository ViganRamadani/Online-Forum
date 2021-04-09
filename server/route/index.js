const express = require('express')
const router = express.Router()
var multer = require('multer');
const crypto = require("crypto");

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
router.post('/admin/forumImg', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

const userPostController = require('../controllers/userPostController')

const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')

//@ ADMIN
router.get('/allUsers', userController.getAllUsers)

//@ USER
router.post('/signUp', userController.signUp)
router.get('/:id', userController.getUser)


//@ USER POST

router.post('/addPost', userPostController.addUserPost)
router.post('/getPost', userPostController.getPost)


//@ Forum
router.post('/createForum', adminController.createForum)


module.exports = router