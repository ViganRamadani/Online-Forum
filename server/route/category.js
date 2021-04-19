const express = require('express');
const router = express.Router();
let CategoryModel = require('../models/CategoryPost');

router.get('/allCategories',(req,res) => {
    
    CategoryModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })
 router.get('/:selected', async(req,res)=> {
   try{
    var category =await CategoryModel.find().where('selected', req.params.selected);
    //console.log(category);
    res.json(category);
    //search params are case sensitive
   }catch(err){
      console.log(err)
   }

  
 })

 router.post('/createcategorypost',async (req,res) => {
   try{
    const post = new CategoryModel({
      title:req.body.title,
      question:req.body.question,
      selected:req.body.selected,
      author:req.body.author
      
    })
    const newPost = await post.save();
    return res.status(201).json(newPost);
   }catch(err){
    return console.log(err);
   }
}); 

router.get('/edit-categoryPost/:id',(req, res) => {
    CategoryModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
})

// Update student
router.patch('/update-categoryPost/:id',async (req, res) => {
  try{
    const post = await CategoryModel.findById(req.params.id)
    if(req.body.title != null){
      post.title = req.body.title
    }
    if(req.body.question != null){
      post.question = req.body.question
    }
    if(req.body.selected != null){
      post.selected = req.body.selected
    }
    if(req.body.author != null){
      post.author = req.body.author
    }
    post.save();
    
  }catch(err){
    console.log(err);
  }
  //   CategoryModel.findByIdAndUpdate(req.params.id, {
  //   $set: req.body
  // }, (error, data) => {
  //   if (error) {
  //     return next(error);
  //   } else {
  //     res.json(data)
  //     console.log('Student successfully updated!')
  //   }
  // })
})

// Delete student
router.route('/delete-categoryPost/:id').delete((req, res, next) => {
    CategoryModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;