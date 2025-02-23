import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "uploads", 
    format: file.mimetype.split("/")[1], 
    public_id: file.originalname.split(".")[0], 
    resource_type: "image", 
  }),
});

// Multer Upload Middleware
const upload = multer({ storage });

export default upload;
