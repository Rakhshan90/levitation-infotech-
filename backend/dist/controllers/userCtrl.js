"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignInCtrl = exports.userSignUpCtrl = void 0;
const levitation_validation_1 = require("@rakhshan90/levitation-validation");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client = new client_1.PrismaClient();
const userSignUpCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const { success } = yield levitation_validation_1.signUpSchema.safeParse({ name, email, password });
    if (!success) {
        res.status(403);
        return res.json({ message: "Invalid input type" });
    }
    const foundUser = yield client.user.findUnique({
        where: { email }
    });
    if (foundUser) {
        res.status(403);
        return res.json({ message: `User already registered with ${foundUser === null || foundUser === void 0 ? void 0 : foundUser.email}` });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield client.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
            select: {
                name: true,
                email: true
            }
        });
        return res.json(newUser);
    }
    catch (error) {
        return res.json({ message: "Something went wrong while creating your account" });
    }
});
exports.userSignUpCtrl = userSignUpCtrl;
const userSignInCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { success } = yield levitation_validation_1.signInSchema.safeParse({ email, password });
    if (!success) {
        res.status(403);
        return res.json({ message: "Invalid input type" });
    }
    try {
        const findUser = yield client.user.findUnique({
            where: { email }
        });
        if (!findUser) {
            res.status(404);
            return res.json({ message: `User is not found with ${email}` });
        }
        const passwordValidation = yield bcrypt_1.default.compare(password, findUser === null || findUser === void 0 ? void 0 : findUser.password);
        if (!passwordValidation) {
            res.status(401);
            return res.json({ message: "Invalid password" });
        }
        const token = yield jsonwebtoken_1.default.sign({ userId: findUser === null || findUser === void 0 ? void 0 : findUser.id }, process.env.JWT_SECRET_KEY);
        res.cookie('token', token);
        return res.json({ message: "You are now signed in" });
    }
    catch (error) {
        return res.json({ message: "Failed to login, try again" });
    }
});
exports.userSignInCtrl = userSignInCtrl;
