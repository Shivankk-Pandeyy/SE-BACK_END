const mongoose=require("mongoose")
const classroomStudentSchema=mongoose.Schema({
    //UNIQUE FOR CLASS
    code:{
        type:String,
        require:true,
    },
    //UNIQUE FOR STUDENT
    sid:{
        type:String,
        require:true,
    },
},{timestamps:true});
const ClassroomStudent=mongoose.model('ClassroomStudent',classroomStudentSchema);
module.exports=ClassroomStudent; 