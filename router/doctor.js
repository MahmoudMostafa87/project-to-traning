const {
    deleteDoctor,
    getAllDoctor,
    getSpcificDoctor,
    updateDoctor,
    updateNameDoctor,
    updateSpcificThingInDoctor,
    createDoctor
}=require("../controller/doctorController");
const catchError=require("../utils/catchError");
const upload=require("../middleware/upload");
const validationId=require("../middleware/validationId");
const router=require("express").Router();

router.post("/",upload.single("imageFile"),catchError(createDoctor));//done used

router.route('/')
.get(catchError(getAllDoctor))//done used
// .post(catchError(addDoctor))//done
.patch(catchError(updateNameDoctor));//done 


router.route('/:id')
.get(validationId,catchError(getSpcificDoctor))//done used
.put(validationId,catchError(updateDoctor))//done used
.patch(validationId,catchError(updateSpcificThingInDoctor))//done
.delete(validationId,catchError(deleteDoctor));//done used



module.exports=router;