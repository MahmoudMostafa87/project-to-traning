const status=require("../utils/statuscode")
const {validateThingInStudent,validateStudent}=require("../utils/validation")
const Student=require("../module/student");

//task and forme
exports.getAllStudent=async(req,res)=>{
    const {pagesize=10,search,page=1}=req.query;
    const limit=+pagesize;
    const skip=pagesize*page-pagesize;
    let students;

    if(search){
            students=await Student.find({
                $or:[{name:search},{level:search},{address:search}]
            })
            .limit(limit)
            .skip(skip)
            .sort("age")
            .select("-__v");
        
    }else students=await Student.find().limit(limit).skip(skip).sort("age").select("-__v");

    if(students.length===0||!students)return res.status(404).json({message:status(404)});
 
    res.status(200).json(students);
}

//for me
exports.getSpcificStudent=async(req,res)=>{
    const student=await Student.findById(req.params.id).select("-__v");
    if(!student)return res.status(404).json({message:status(404)});
    res.status(200).json(student);
}

//task 
exports.addStudentByHardcore=async(req,res)=>{
    const data={
        name:"mahmoud",
        age:24,
        level:"first",
        address:"123 Main St, Apt 4B, New York"
    }

    const {error}=validateStudent(data);
    if(error)return res.status(400).json({message:error.details[0].message});
   
    let student=await Student.findOne({$or:[{name:data.name},{age:data.age}]});
    if(student)return res.status(400).json({message:"this data not valid"});

    student=await Student.create(data);
        
    res.status(201).json({message:status(201)});
}



//task
exports.addStudent=async(req,res)=>{

    const {error}=validateStudent(req.query);
    if(error)return res.status(400).json({message:error.details[0].message});
   
    let student=await Student.findOne({$or:[{name:req.query.name},{age:req.query.age}]}).select("-__v");
    if(student)return res.status(400).json({message:"this data not valid"});

    student=await Student.create(req.query);
    
    await student.save();
    
    res.status(201).json({message:status(201)});
}

exports.createStudent=async(req,res)=>{

    const {error}=validateStudent(req.body);
    if(error)return res.status(400).json({message:error.details[0].message});
   
    let student=await Student.findOne({$or:[{name:req.body.name}]}).select("-__v");
    if(student)return res.status(400).json({message:"this data not valid"});
    const file={
        path:`${req.protocol}://${req.headers.host}/${req.file.path}`,
        file:req.file.filename,
        contentType:req.file.mimetype
    }

    req.body.fileInfo=file

    student=await Student.create(req.body);
    
    await student.save();
    
    res.status(201).json({message:status(201)});
}

//for me
exports.updateStudent=async(req,res)=>{

    const {error}=validateStudent(req.body);
    if(error)return res.status(400).json({message:error.details[0].message});

        const isExist=await Student.findOne({name:req.body.name});

        if(isExist)return res.status(400).json({message:"this name is used already"});

    await Student.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json({message:status(200)});
}

//task
exports.updateNameStudent=async(req,res)=>{
    const {oldname,newname}=req.query;

    const oldStudent=await Student.findOne({name:oldname});

    if(!oldStudent)return res.status(404).json({message:status(404)});

    const newStudent=await Student.findOne({name:newname});
    if(newStudent)return res.status(400).json({message:"this name is used already"})

    await oldStudent.updateOne({name:newname},{new:true});

    res.status(200).json({message:status(200)});
}

//for me
exports.updateSpcificThingInStudent=async(req,res)=>{
    const {error}=validateThingInStudent(req.body);
    if(error)return res.status(400).json({message:error.details[0].message});

        const isExist=await Student.findOne({name:req.body.name});

        if(isExist)return res.status(400).json({message:"this name is used already"});

    await Student.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json({message:status(200)});
}


//task
exports.deleteStudent=async(req,res)=>{
    const student=await Student.findById(req.params.id);

    if(!student)return res.status(404).json({message:status(404)});
    
    await student.deleteOne({new:true});

    res.status(200).json({message:status(200)});
}
