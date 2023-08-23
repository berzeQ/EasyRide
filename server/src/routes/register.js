const express=require('express')
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("Register route is displaying data")
})
module.exports=router;