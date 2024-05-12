const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    blogImageURL:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    contentBody:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Blog=mongoose.model("Blog",blogSchema)

module.exports=Blog