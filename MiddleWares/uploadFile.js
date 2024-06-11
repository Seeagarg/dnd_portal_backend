const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/Files")
    },
    fileName:(req,file,cb)=>{
        cb(null,file.fieldName + "_" + Date.now() + path.extname(file.originalname))
    }

})

const uploadFile = multer({
    storage:storage
})

module.exports = uploadFile