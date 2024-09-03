"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userCtrl_1 = require("../controllers/userCtrl");
const userRouter = express_1.default.Router();
userRouter.post('/signup', userCtrl_1.userSignUpCtrl);
userRouter.post('/signin', userCtrl_1.userSignInCtrl);
userRouter.post('/signout', userCtrl_1.userSignOutCtrl);
exports.default = userRouter;
