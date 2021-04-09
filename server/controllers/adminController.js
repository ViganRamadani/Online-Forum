// const User = require('../models/user')
const Forum = require('../models/forum')

// router.post('/user/addImage', upload.single('file'), (req, res) => {
//   res.json({ file: req.file });
// });


exports.createForum = async (req, res) => {
  const forum = new Forum({
    forumTopic: req.body.forumTopic,
    description: req.body.description
  })
  try {
    const newForum = await forum.save()
    return res.status(201).json(newForum)
  } catch(err) {
    return res.status(400).json({ message: err.message })
  }
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
