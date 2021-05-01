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