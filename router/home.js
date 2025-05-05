const {getAllData}=require("../controller/homeController");
const catchError=require("../utils/catchError");
const router=require("express").Router();

//ammar
router.get("/",catchError(getAllData));//done

module.exports=router;