import { Request, Response, NextFunction } from "express";
import multer from "multer";

// Use memory storage to store the files temporarily in memory
const multerStorage = multer.memoryStorage();

const filesUpload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1000000 // limit file size to 1MB
  },
});

export default filesUpload;
