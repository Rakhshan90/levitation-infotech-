import express from 'express';
import {userSignInCtrl, userSignOutCtrl, userSignUpCtrl} from '../controllers/userCtrl';

const userRouter = express.Router();

userRouter.post('/signup', userSignUpCtrl);
userRouter.post('/signin', userSignInCtrl);
userRouter.post('/signout', userSignOutCtrl);

export default userRouter;