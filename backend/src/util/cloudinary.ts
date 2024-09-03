// import { v2 as cloudinary } from "cloudinary";
// import dotenv from 'dotenv';

// dotenv.config();

// const cloudinaryUploader = async (fileBuffer: Buffer) => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY,
//   });

//   try {
//     const result = await cloudinary.uploader.upload_stream({
//       resource_type: 'auto'
//     }, (error, result) => {
//       if (error) throw new Error(error.message);
//       return result;
//     }).end(fileBuffer); // Upload directly from buffer

//     return result;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw error;
//   }
// };

// export default cloudinaryUploader;


import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import dotenv from 'dotenv';

dotenv.config();

const cloudinaryUploader = (fileBuffer: Buffer): Promise<{ url: string }> => {
  // Ensure Cloudinary is configured
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });

  // Use a Promise to handle the upload
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          reject(error || new Error("Upload failed, result is undefined."));
        } else {
          resolve({ url: result.secure_url });
        }
      }
    );

    // Write the file buffer to the stream
    stream.end(fileBuffer);
  });
};

export default cloudinaryUploader;
