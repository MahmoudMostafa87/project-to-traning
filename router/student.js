const {addStudent,
    createStudent,
    addStudentByHardcore,
    deleteStudent,
    getAllStudent,
    getSpcificStudent,
    updateNameStudent,
    updateSpcificThingInStudent,
    updateStudent,
}=require("../controller/studentController");
const catchError=require("../utils/catchError");
const validationId=require("../middleware/validationId");
const upload=require("../middleware/upload");
const router=require("express").Router();

router.post("/addStudent",upload.single("imageFile"),catchError(createStudent));//done used

router.route('/')
.get(catchError(getAllStudent))//done used
.post(catchError(addStudent))//done
.patch(catchError(updateNameStudent));//done

router.route('/:id')
.get(validationId,catchError(getSpcificStudent))//done used
.put(validationId,catchError(updateStudent))//done used
.patch(validationId,catchError(updateSpcificThingInStudent))//done
.delete(validationId,catchError(deleteStudent));//done used

router.post("/first-student",catchError(addStudentByHardcore));//done

module.exports=router;