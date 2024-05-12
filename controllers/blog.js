const Blog=require("../models/blog")
const Comment = require('../models/comment')

async function addnewblog(req,res){
   const {title,contentBody}=req.body
   await Blog.create({
       blogImageURL:`/uploads/${req.file.filename}`,
       title,
       contentBody,
       createdBy:req.user.id,
   })
   return res.redirect("/")
}

async function handlesingleblog(req,res){

    const blog=await Blog.findById(req.params.id)
    const comments=await Comment.find({blogID:req.params.id}).populate("createdBy")
    console.log(comments)
    return res.render("blog",{
        blog,comments,user:req.user
    })
}


module.exports={addnewblog,handlesingleblog}