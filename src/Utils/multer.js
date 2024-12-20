import multer from 'multer';

export const fileType= {
   image: ['image/png','image/jpeg','image/gif','image/JFIF'],
   excel:['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
}

function fileUpload(customTypes=[]){
    const storage = multer.diskStorage({});

    function fileFilter(req,file,cb){
      //console.log(file);

             if(customTypes.includes(file.mimetype)){
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