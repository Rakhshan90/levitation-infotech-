"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Use memory storage to store the files temporarily in memory
const multerStorage = multer_1.default.memoryStorage();
const filesUpload = (0, multer_1.default)({
    storage: multerStorage,
    limits: {
        fileSize: 1000000 // limit file size to 1MB
    },
});
exports.default = filesUpload;
