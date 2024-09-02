"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formCtrl_1 = require("../controllers/formCtrl");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const formRouter = express_1.default.Router();
formRouter.post('/submit', authMiddleware_1.authMiddleware, formCtrl_1.handleFormSubmissionCtrl);
exports.default = formRouter;
