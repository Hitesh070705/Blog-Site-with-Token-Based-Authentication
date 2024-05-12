require('dotenv').config()
const express=require("express")
const path=require('path')
const cookieParser=require('cookie-parser')
const {connectToMongoDb}=require("./connect")
const {checkAuthentication}=require("./middlewares/auth")

const userRoute=require("./routes/user")
const blogRoute=require("./routes/blog")

const Blog = require('./models/blog')
const Comment = require('./models/comment')
const User = require('./models/user')

const app=express()
const PORT=process.env.PORT || 8000

connectToMongoDb(process.env.MONGO_URL).then(res=>console.log("Mongodb Connection Successfull !"))

app.set("view engine","ejs")
app.set("views",path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkAuthentication)
app.use(express.static(path.resolve("./public")))

app.get("/",async(req,res)=>{
   const allBlogs=await Blog.find({})
   return res.render("home",{
    user:req.user,
    blogs:allBlogs
   })
})

app.post("/comment/:id",async(req,res)=>{
    const {commentBody}=req.body
    await Comment.create({
        commentBody,
        blogID:req.params.id,
        createdBy:req.user.id
    })
    return res.redirect(`/blog/${req.params.id}`)
})

app.use('/user',userRoute)
app.use("/blog",blogRoute)

app.listen(PORT , ()=>{
    console.log(`Server started at PORT ${PORT}`)
})