const Doctor=require("../module/doctor");
const Student=require("../module/student");
const status=require("../utils/statuscode");

exports.getAllData=async(req,res)=>{
        const {pagesize=5,search,page=1}=req.query;
        let students,doctors;
        
        if(search){
            students=await Student.find({
                $or:[{name:search},{level:search,address:search}]
            }).limit(pagesize).skip(pagesize*page-pagesize).select("-__v").sort("age");
            
            doctors=await Doctor.find({
                $or:[{name:search},{phone:search}]
            }).limit(pagesize).skip(pagesize*page-pagesize).select("-__v").sort("age");

        }else{
            students=await Student.find().limit(pagesize).skip(pagesize*page-pagesize).select("-__v").sort("age");
            doctors=await Doctor.find().limit(pagesize).skip(pagesize*page-pagesize).select("-__v").sort("age");
        }
    
        const data=[{students},{doctors}];//[studnets:{},doctors:{}]
        // const data=[...students,...doctors];//[{}]

        if(data.length===0||!data)return res.status(404).json({message:status(404)});
        

        res.status(200).json(data);//[]
        // res.status(200).json({users:data});{users:[]}
}
