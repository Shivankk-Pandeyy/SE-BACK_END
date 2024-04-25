const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv').config();
const PORT=process.env.PORT;
//MIDDLEWARE
app.use(express.json());
app.use(cors());
//STUDENT SCHEMA
const Student=require('./Schema/StudentSchema');
//TEACHER SCHEMA
const Faculty=require('./Schema/FacultySchema');
//CLASROOM SCHEMA
const Classroom=require('./Schema/Classroom')
const ClassroomStudent=require('./Schema/ClassroomStudent')
//MONGO DB EXPORT
const Connect=require('./Connection/Connection');
Connect();
//STUDENT NOTES
const SNotes=require('./Schema/SNotes')
//STUDENT SIGNUP
app.post("/SignupStudent",async(req,res)=>{
    console.log(req.body);
    const {name,sid,email,password}=req.body;
    const dummyemail=await Student.findOne({email});
    const dummyid=await Student.findOne({sid})
    if(dummyemail){
        return res.status(300).json({message:"EMAIL"});
    }
    else if(dummyid){
        return res.status(300).json({message:"ID"});
    }
    else{
        try{
            const Stud=await new Student({
                name,
                sid,
                email,
                password,
            });
            await Stud.save();
            res.status(202).json({message:"SIGNUP SUCCESS"})
        }
        catch(err){
            console.log(err);
        }
    }
    
});
//TEACHER SIGNUP
app.post("/SignupFaculty",async(req,res)=>{
    //console.log(req.body);
    const {name,fid,email,password}=req.body;
    const dummyemail=await Faculty.findOne({email});
    const dummyid=await Faculty.findOne({fid})
    if(dummyemail){
        return res.status(300).json({message:"EMAIL"});
    }
    else if(dummyid){
        return res.status(300).json({message:"ID"});
    }
    else{
        try{
            const Fac=await new Faculty({
                name,
                fid,
                email,
                password,
            });
            await Fac.save();
            res.status(202).json({message:"SIGNUP SUCCESS"})
        }
        catch(err){
            console.log(err);
        }
    }
    
});
//LOGIN FOR STUDENTS
app.post('/LoginStudent',async(req,res)=>{
    //console.log(req.body)
    const {sid,password}=req.body;
    const id_check=await Student.findOne({sid,password});
    if(!id_check){
        return res.status(400).json({message:"INVALID"})
    }
    else{
        return res.status(200).json({message:"LOGIN"})
    }
})
//LOGIN FOR TEACHERS
app.post('/LoginFaculty',async(req,res)=>{
    //console.log(req.body)
    const {fid,password}=req.body;
    const id_check=await Faculty.findOne({fid,password});
    if(!id_check){
        return res.status(400).json({message:"INVALID"})
    }
    else{
        return res.status(200).json({message:"LOGIN"})
    }
})
//GET FACULTIES FOR LOGIN
app.get('/FacultyList',async(req,res)=>{
    try{
        const FacultyList=await Faculty.find({});
        res.json(FacultyList);
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"ERROR OCCURRED"})
    }
})
//GET STUDENTS FOR LOGIN
app.get('/StudentList',async(req,res)=>{
    try{
        const StudentList=await Student.find({});
        res.json(StudentList);
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"ERROR OCCURRED"})
    }
})
// GET TEACHERS AND STUDENTS FOR SEARCHING IN MEMBER LIST
app.post('/GetMembers',async(req,res)=>{
    const {info}=req.body;
    try{
        const studentid=await Student.find({sid:info})
        const studentemail=await Student.find({email:info})
        const facultyid=await Faculty.find({fid:info})
        const facultyemail=await Faculty.find({email:info})
        if(studentid||studentemail||facultyemail||facultyid){
            if(studentid){
                return res.json(studentid);
            }
            if(studentemail){
                return res.json(studentemail);
            }
            if(facultyid){
                return res.json(facultyid);
            }
            if(facultyemail){
                return res.json(facultyemail);
            }
        }
    }
    catch(err){
        console.log(err);
    }
})
//UPDATE STUDENT PASSWORD
app.put('/UpdateStudentPassword/:id',async(req,res)=>{
    //console.log(req.body);
    const {id}=req.params;
    const {password}=req.body;
    try{
        const student=await Student.findByIdAndUpdate({_id:id},{password});
        await student.save();
        return res.status(200).json({message:"PASSWORD UPDATED"})
    }
    catch(err){
        console.log(err);
    }
})
//UPDATE TEACHER PASSWORD
app.put('/UpdateFacultyPassword/:id',async(req,res)=>{
    //console.log(req.body);
    const {id}=req.params;
    const {password}=req.body;
    try{
        const teacher=await Faculty.findByIdAndUpdate({_id:id},{password});
        await teacher.save();
        return res.status(200).json({message:"PASSWORD UPDATED"})
    }
    catch(err){
        console.log(err);
    }
})
//CREATING A CLASS BY TEACHERS
app.post('/CreateClassroom',async(req,res)=>{
    //console.log(req.body);
    const {name,code,head}=req.body;
    const dummycode=await Classroom.findOne({code});
    if(dummycode){
        return res.status(400).json({message:"CODE"})
    }
    else{
        try{
            const classroom=await new Classroom({
                name,
                code,
                head,
            });
            await classroom.save()
            return res.status(200).json({message:"Created"})
        }
        catch(err){
            console.log(err);
        }
    }
    
})
//DELETING CLASSROOM
app.delete('/DeleteClass/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await Classroom.findByIdAndDelete({
            _id:id
        })
        res.status(200).json({message:"DELETED CLASS"});
    }
    catch(err){
        console.log(err);
    }
})
//GET CLASS LIST
app.get('/ClassList',async(req,res)=>{
    try{
        const ClassList=await Classroom.find({});
        res.json(ClassList);
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"ERROR OCCURRED"})
    }
})
//ADDING STUDENTS TO CLASS
app.post('/AddStudent/:id',async(req,res)=>{
    const {code,sid}=req.body;
    const dummy=await ClassroomStudent.findOne({code,sid});
    if(dummy){
        return res.status(400).json({message:"MEMBER ALREADY ADDED"})
    }
    //console.log(req.body)
    try{
        const member=await new ClassroomStudent({
            code,
            sid,
        });
        await member.save();
        return res.status(200).json({message:"MEMBER ADDED"})
    }
    catch(err){
        console.log(err);
        return res.status(300).json('CLASS NOT FOUND')
    }
})
//GET STUDENT LIST
app.get('/ClassListStudent',async(req,res)=>{
    try{
        const ClassList=await ClassroomStudent.find({});
        res.json(ClassList);
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"ERROR OCCURRED"})
    }
})
//DELETING STUDENT
app.delete('/DeleteStudent/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await ClassroomStudent.findByIdAndDelete({
            _id:id
        })
        res.status(200).json({message:"DELETED CLASS"});
    }
    catch(err){
        console.log(err);
    }
})
//STUDENT NOTES UPLOAD
app.post('/SNotes',async(req,res)=>{
    console.log(req.body);
    const {code,sid,para}=req.body;
        try{
            const SNOTES=await new SNotes({
                code,
                sid,
                para,
            });
            await SNOTES.save()
            return res.status(200).json({message:"Created"})
        }
        catch(err){
            console.log(err);
        }
})
app.get('/SNotesGet',async(req,res)=>{
    //console.log(req.body);
    try{
        const ClassList=await SNotes.find({});
        res.json(ClassList);
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"ERROR OCCURRED"})
    }
})
app.delete('/DeleteStudentNotes/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await SNotes.findByIdAndDelete({
            _id:id
        })
        res.status(200).json({message:"DELETED NOTES"});
    }
    catch(err){
        console.log(err);
    }
})
//FOR PDF FILES MADE STATIC
app.use("/files",express.static("files"));
const multer=require('multer');
const AS=require('./Schema/ASchema')
const QUIZ=require('./Schema/QSchema')
const NOTES=require('./Schema/NSchema')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './files')
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null,uniqueSuffix+file.originalname)
    }
})
const upload = multer({ storage: storage })
//UPLOAD PDF
app.post("/UA",upload.single("file"),async(req,res)=>{
    const {name,code,head}=req.body;
    const {filename}=req.file;
    try {
        const Assignment=await new AS({
            name,
            code,
            head,
            pdf:filename,
        })
        await Assignment.save();
        return res.status(200).json({message:"FILES POSTED"})
    } 
    catch(err) {
        console.log(err);
    }
})
//GET PDF
app.get("/UAP",async(req,res)=>{
    try{
        const pdfs=await AS.find({});
        res.status(200).json(pdfs);
    }
    catch(err){
        console.log(err)
    }
})
//DELETE PDF
//delete pdf
app.delete("/DELA/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const pdfdummy=await AS.findByIdAndDelete({_id:id})
        return res.status(200).json({message:"PDF DELETED"});
    }
    catch(err){
        console.log(err);
    }
})
app.post("/UN",upload.single("file"),async(req,res)=>{
    const {name,code,head}=req.body;
    const {filename}=req.file;
    try {
        const Assignment=await new NOTES({
            name,
            code,
            head,
            pdf:filename,
        })
        await Assignment.save();
        return res.status(200).json({message:"FILES POSTED"})
    } 
    catch(err) {
        console.log(err);
    }
})
//GET PDF
app.get("/UNP",async(req,res)=>{
    try{
        const pdfs=await NOTES.find({});
        res.status(200).json(pdfs);
    }
    catch(err){
        console.log(err)
    }
})
//DELETE PDF
//delete pdf
app.delete("/DELN/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const pdfdummy=await NOTES.findByIdAndDelete({_id:id})
        return res.status(200).json({message:"PDF DELETED"});
    }
    catch(err){
        console.log(err);
    }
})
app.post("/UQ",upload.single("file"),async(req,res)=>{
    const {name,code,head}=req.body;
    const {filename}=req.file;
    try {
        const Assignment=await new QUIZ({
            name,
            code,
            head,
            pdf:filename,
        })
        await Assignment.save();
        return res.status(200).json({message:"FILES POSTED"})
    } 
    catch(err) {
        console.log(err);
    }
})
//GET PDF
app.get("/UQP",async(req,res)=>{
    try{
        const pdfs=await QUIZ.find({});
        res.json(pdfs);
    }
    catch(err){
        console.log(err)
    }
})
//DELETE PDF
//delete pdf
app.delete("/DELQ/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const pdfdummy=await QUIZ.findByIdAndDelete({_id:id})
        return res.status(200).json({message:"PDF DELETED"});
    }
    catch(err){
        console.log(err);
    }
})
//SERVER STARTED
app.listen(PORT,()=>{
    console.log(`Server Started At Port ${PORT}`);
})