const mongoose=require('mongoose');
const classroomSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    code:{
        type:String,
        require:true,
    },//TEACHER ID-HEAD
    head:{
        type:String,
        require:true,
    },
},{timestamps:true});
const Classroom=mongoose.model('Classroom',classroomSchema);
module.exports=Classroom; 