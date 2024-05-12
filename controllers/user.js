const User=require("../models/user")
const {generateToken}=require("../service/set&getToken")

async function handleSignup(req,res){
    const {name,email,password}=req.body
    const user= await User.create({
        name,
        email,
        password
    })
    const token=generateToken(user)         
    res.cookie("token",token)
    return res.redirect("/")
}

async function handleLogin(req,res){
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        return res.render("login",{
            error:"Invalid username or password"
        })
    }
   const isPasswordMatched=await user.comparePassword(password)
   if(!isPasswordMatched){
    return res.render("login",{
        error:"Invalid username or password"
    })
   }
   const token=generateToken(user)
   res.cookie("token",token)
   return res.redirect("/")
}

module.exports={
    handleSignup,handleLogin
}