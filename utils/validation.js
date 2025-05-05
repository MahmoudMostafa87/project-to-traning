const joi=require("joi");


exports.validateStudent=(body)=>{
    return joi.object({
        name:joi.string().required().min(3).max(15).trim(),
        age:joi.number().required().min(6).max(25),
        level:joi.string().valid('first','secound','third','forth').required().trim(),
        address:joi.string().required().regex(/^([a-zA-Z\u0600-\u06FF0-9\s\-\/\\,.'()#&]{1,50})(\s[a-zA-Z\u0600-\u06FF0-9\s\-\/\\,.'()#&]{1,50}){2,10}$/).trim(),
    }).validate(body);
}

exports.validateThingInStudent=(body)=>{
    return joi.object({
        name:joi.string().min(3).max(15).optional().trim(),
        age:joi.number().min(25).max(60).optional(),
        level:joi.string().valid('first','secound','third','forth').optional().trim(),
        address:joi.string().optional().regex(/^([a-zA-z0-9/\\''(),-\s]{2,255})$/).trim(),
    }).xor('name','age','level','address').validate(body);
}


exports.validateDoctor=(body)=>{
    return joi.object({
        name:joi.string().required().min(3).max(15).trim(),
        age:joi.number().required().min(25).max(60),
        phone:joi.string().regex(/^01[0125]\d{8}$/).required().trim(),
        email:joi.string().required().trim()
    }).validate(body);
}

exports.validateThingInDoctor=(body)=>{
    return joi.object({
        name:joi.string().min(3).max(15).optional().trim(),
        age:joi.number().min(25).max(60).optional(),
        phone:joi.string().regex(/^01[0125]\d{8}$/).optional().trim()
    }).xor('name','age','phone').validate(body);
}