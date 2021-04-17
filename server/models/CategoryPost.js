const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

let CategorySchema = mongoose.Schema({
  title: {type: String, required:true},
  question: {type: String, required:true},
  selected: {type: String, required:true},
  author:{type: String , required:true}
}, 
// {collection: 'Categories'},
{
    timestamps: true
})

module.exports = mongoose.model('Categories', CategorySchema)