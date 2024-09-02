import express from 'express';
import {userSignInCtrl, userSignUpCtrl} from '../controllers/userCtrl';

const userRouter = express.Router();

userRouter.post('/signup', userSignUpCtrl);
userRouter.post('/signin', userSignInCtrl);

export default userRouter;