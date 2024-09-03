import express from 'express';
import userRouter from './routes/userRouter';
import formRouter from './routes/formRouter';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/api/user', userRouter);
app.use('/api/form', formRouter);



const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
});
