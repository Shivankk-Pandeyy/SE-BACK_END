const express=require('express');
const router=express.Router();
const Student=require('../Schema/StudentSchema');
router.post("/SignupStudent",async(req,res)=>{
    console.log(req.body);
    const {name,sid,email,password}=req.body;
    try{
        const Stud=await new Student({
            name,
            sid,
            email,
            password,
        });
        await Stud.save();
        res.status(200).json({Message:"SIGNUP SUCCESS"})
    }
    catch(err){
        console.log(err);
    }
});

module.exports=router;