const express = require('express')
const router = express.Router()
const ContactUs = require('../models/contactUs')

router.post('/contactUs', async (req, res) => {
    if(!req.body){
        return res.status(400).send({ message: "Missing required Content!"})
    }

        await ContactUs.create(req.body)
        .then(data =>{
            res.send(data)
            
        }).catch(err =>{
            console.log(err)
        })
});

router.get('/getContactUs', (req, res) => {
    ContactUs.find()
        .then(contactMessages => {
            res.status(200).send(contactMessages)
            console.log(contactMessages)
        }).catch(err => {
            console.log(err)
        })
})


module.exports = router