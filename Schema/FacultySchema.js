const mongoose=require('mongoose');
const facultySchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    fid:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
},{timestamps:true});
const Faculty=mongoose.model("Faculty",facultySchema);
module.exports=Faculty;