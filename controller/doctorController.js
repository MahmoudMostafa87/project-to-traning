const status=require("../utils/statuscode")
const {validateDoctor,validateThingInDoctor}=require("../utils/validation")
const Doctor=require("../module/doctor");
const sendEmail=require("../utils/sendEmil");

//task and for me
exports.getAllDoctor=async(req,res)=>{
    const {pagesize=10,search,page=1}=req.query;
    let doctors;

    if(search){
        doctors=await Doctor.find({
            $or:[{name:search},{phone:search}]
        })
            .limit(pagesize)
            .skip(pagesize*page-pagesize)
            .select('-__v')
            .sort('age');
    }else 
        doctors=await Doctor
            .find()
            .limit(pagesize)
            .skip(pagesize*page-pagesize)
            .select('-__v')
            .sort('age');

    if(doctors.length===0||!doctors)return res.status(404).json({message:status(404)});

    res.status(200).json(doctors);
}

//for me
exports.getSpcificDoctor=async(req,res)=>{
    const doctor=await Doctor.findById(req.params.id).select('-__v').sort('age');
    if(!doctor)return res.status(404).json({message:status(404)});
    res.status(200).json(doctor);
}

//task
// exports.addDoctor=async(req,res)=>{
    
//     const {error}=validateDoctor(req.query);
//     if(error)return res.status(400).json({message:error.details[0].message});
   
//     let doctor=await Doctor.findOne({name:req.query.name});
//     if(doctor)return res.status(400).json({message:"this data not valid"});

//     doctor=await Doctor.create(req.query);
    
    
//     const account={...req.query};

//     const url=sendEmail(req.query.email,"congrayoulation you sign up in me wep page",`
//         <h1>your account is</h1>
//         <h3>${JSON.stringify(account)}</h3>`);
        
        
//     res.status(201).json({message:status(201),url});
// }


exports.createDoctor=async(req,res)=>{
   
    const {error}=validateDoctor(req.body);
   if(error)return res.status(400).json({message:error.details[0].message});
   
   let doctor=await Doctor.findOne({name:req.body.name});
   
   if(doctor)return res.status(400).json({message:"this data not valid"});

   const file={
    path:`${req.protocol}://${req.headers.host}/${req.file.path}`,
    file:req.file.filename,
    contentType:req.file.mimetype
    }

    req.body.fileInfo=file

   
   doctor=await Doctor.create(req.body);
    
    const account={...req.body};
    sendEmail(req.body.email,"congrayoulation you sign up in me wep page",`
        <h1>your account is</h1>
        <h3>${JSON.stringify(account)}</h3>`,(err,url)=>{
            if(err)return res.status(500).json({message:status(500),error:err.message})
            res.status(201).json({message:status(201),url});
        });

}


//for me
exports.updateDoctor=async(req,res)=>{

    const {error}=validateDoctor(req.body);
    if(error)return res.status(400).json({message:error.details[0].message});

        const isExist=await Doctor.findOne({
            $or:[{name:req.body.name},{phone:req.body.phone}]
        });

        if(isExist)return res.status(400).json({message:"this name is used already"});

    await Doctor.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json({message:status(200)});
}


//task
exports.updateNameDoctor=async(req,res)=>{
    const {oldname,newname}=req.query;

    const oldDoctor=await Doctor.findOne({name:oldname});

    if(!oldDoctor)return res.status(404).json({message:status(404)});

    const newDoctor=await Doctor.findOne({name:newname});
    if(newDoctor)return res.status(400).json({message:"this name is used already"})

    await oldDoctor.updateOne({name:newname},{new:true});

    res.status(200).json({message:status(200)});
}

//for me
exports.updateSpcificThingInDoctor=async(req,res)=>{
    const {error}=validateThingInDoctor(req.body);
    if(error)return res.status(400).json({message:error.details[0].message});

        const isExist=await Doctor.findOne({
            $or:[{name:req.body.name},{phone:req.body.phone}]
        });

        if(isExist)return res.status(400).json({message:"this name is used already"});

    await Doctor.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json({message:status(200)});
}

//task
exports.deleteDoctor=async(req,res)=>{
    const doctor=await Doctor.findById(req.params.id);

    if(!doctor)return res.status(404).json({message:status(404)});
    
    await doctor.deleteOne({new:true});

    res.status(200).json({message:status(200)});
}

//add voice or video
//when retreve doctor
//when delete data remove file but check if found it
//when update image when 