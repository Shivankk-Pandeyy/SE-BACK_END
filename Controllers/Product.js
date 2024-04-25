
const Student=require('../Schema/StudentSchema');
const SignupStudent=async(req,res)=>{
    const {name,sid,email,password}=req.body;
        const student=await new Student({
            name,
            sid,
            email,
            password,
        })
        await student.save();
        res.status(200).json({message:"SIGNUP SUCCESFUL"});
}
module.exports=SignupStudent;