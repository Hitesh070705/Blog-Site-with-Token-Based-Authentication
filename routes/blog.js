const express=require("express")
const multer  = require('multer')
const path=require("path")
const {addnewblog,handlesingleblog}=require("../controllers/blog")

const router=express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads'))
    },
    filename: function (req, file, cb) {
      const fileName= `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
  })
  
const upload = multer({ storage: storage })

router.get("/add-new",(req,res)=>{
    return res.render("addblogform",{
      user:req.user
    })
})
router.post("/add-new",upload.single("blogImageURL"),addnewblog)

router.get("/:id",handlesingleblog)

module.exports=router