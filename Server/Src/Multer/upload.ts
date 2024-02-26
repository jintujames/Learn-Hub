
import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Enter to Multer");
    
    console.log(file,"FILESSS");
    
    return cb(null, "public/images/")
  },  
  filename: (req, file, cb) => {
    console.log("Entered to mult");
    
    cb(null, Date.now() + file.originalname)
  },
})


const   upload = multer({ storage: storage });

export {
    upload
}