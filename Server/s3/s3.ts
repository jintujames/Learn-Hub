import { S3Client } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

interface MulterS3File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    contentDisposition: null;
    storageClass: string;
    serverSideEncryption: null;
    metadata: any;
    location: string;
    etag: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        file?: MulterS3File; // Extend Request type to include file property with MulterS3File type
    }
}

// Assuming you have defined these variables elsewhere in your code
const bucketName = process.env.AWS_BUCKET_NAME as string;
const region = process.env.AWS_REGION as string;
const bucketAccessKey = process.env.AWS_ACCESS_KEY as string;
const bucketSecretAccessKey = process.env.AWS_SECRET_KEY as string;

const s3 = new S3Client({
    credentials: {
        accessKeyId: bucketAccessKey,
        secretAccessKey: bucketSecretAccessKey
    },
    region: "ap-south-1" // Update with your desired region
});

const s3Storage = multerS3({
    s3: s3,
    bucket: bucketName, // Use the bucketName variable
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname});
    },
    key: (req, file, cb) => {
        const fileName = Date.now() + "" + file.fieldname + "" + file.originalname;
        cb(null, fileName);
    }
});

function sanitizeFile(file: any, cb: any) {
    // Define the allowed extensions and mime types for videos
   
    const videoExts = [".mp4", ".avi", ".mov", ".mkv"]; // Add more as needed

    // Check allowed extensions
    const isAllowedExt = videoExts.includes(path.extname(file.originalname.toLowerCase()));

    // Mime type must be a video
    const isAllowedMimeType = file.mimetype.startsWith("video/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true);
    } else {
        cb("Error: File type not allowed!");
        
    }
}

export const uploadMedia = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 100 
    }
});