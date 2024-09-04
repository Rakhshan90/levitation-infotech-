"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const formRouter_1 = __importDefault(require("./routes/formRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "https://levitation-infotech-1-yyfd.onrender.com",
    credentials: true,
}));
app.use('/api/user', userRouter_1.default);
app.use('/api/form', formRouter_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
