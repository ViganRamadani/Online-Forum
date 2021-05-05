const Report = require('../models/report')

exports.createReport = async (req, res) => {
  try {
    const report = new Report({
      author: req.params.author,
      postId: req.params.postId,
      reportReason: req.body.reportReason,
    })
    const newReport = await report.save()
    console.log("Report Created!")
    return res.status(201).json(newReport)
  } catch (err) {
    return console.error(err)
  }
}

//@ Get All Reports
exports.getReports = async (req, res) => {
  await Report.find()
    .then(reports => {
       res.status(200).json(reports)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

//@ Get Reports of Specified ReportReason
exports.getFilteredReports = async (req, res) => {
  await Report.find().where('reportReason', req.params.reportReason)
    .then(reports =>{
      res.send(reports)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.deleteReport = async  (req, res) => {
  // const same = allForums.some(myForum => myForum.forumTopic == forum.forumTopic)
  const id = req.params.reportId
  await Report.find()
    .then(async allReports => {
      const same = allReports.some(myReport => myReport._id == id)
      if (!same) {
        return res.status(404).send("Report may not be found!")
      }
      await Report.findByIdAndDelete(req.params.reportId)
        .then(() => {
          res.status(200).send("Report deleted successfully!")
        })
          .catch(err => {
            res.send(err);
      })
  })
}
// router.get('/:selected', async (req, res) => {
//   try {
//     var category = await CategoryModel.find().where('selected', req.params.selected);
//     // console.log(category);
//     res.json(category);
//     //search params are case sensitive
//   } catch (err) {
//     console.log(err)
//   }
// })



//@ Get All Posts of Specified Category
// router.get('/:selected', async (req, res) => {
//   try {
//     var category = await CategoryModel.find().where('selected', req.params.selected);
//     // console.log(category);
//     res.json(category);
//     //search params are case sensitive
//   } catch (err) {
//     console.log(err)
//   }
// })