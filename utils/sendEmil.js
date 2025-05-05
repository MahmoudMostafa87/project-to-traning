const nodemailer=require("nodemailer");
const logger=require("../startup/logging");
const joi=require("joi");

module.exports=(to,subject,html,cb)=>{

    const transport=nodemailer.createTransport({
        // service:"gmail",
        // host:"smtp.gmail.com",
        host: 'smtp.ethereal.email',
        port: 587,
        secure:false,
        // port: 465,
        // secure: true, 
        auth:{
            user: 'lois.nienow13@ethereal.email',
            pass: 'kUjQpdcdykfmz5XMJQ'
        },

    });
    
    const mailOptions={
        to,
        subject,
    }
    


    const {error}=joi.object({
        to:joi.string().email().max(100).required(),
        subject:joi.string().required().trim()
    }).validate(mailOptions)


    if(error)return cb(new Error(error.details[0].message));
    
    mailOptions.from="lois.nienow13@ethereal.email";
    mailOptions.html=html;

    transport.sendMail(mailOptions,(error,info)=>{

        if(error)
        {
            logger.error(error.message);
            cb(new Error(error.message));
        }
else{   
    console.log(info.response);
    console.log(nodemailer.getTestMessageUrl(info));
    cb(null,nodemailer.getTestMessageUrl(info));
}});
    
}


//create callback function to return data