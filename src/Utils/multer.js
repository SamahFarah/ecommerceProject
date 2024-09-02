import multer from 'multer';

function fileUpload(){
    const storage = multer.diskStorage({});
       

    function fileFilter(req,file,cb){
             if(['image/png','image/jpeg','image/gif'].includes(file.mimetype)){
                cb(null,true)
             }
             else{
                cb("invalid format",false)
             }
    }
    const upload=multer({fileFilter,storage})
    return upload;
}
export default fileUpload;