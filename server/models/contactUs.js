const mongoose = require('mongoose')

const contactUsSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    subject: { type: String, required: true, default: 'None Selected' },
    message: { type: String, required: true },
},
{
    timestamps: true
})

module.exports = mongoose.model('ContactUsMessages', contactUsSchema)