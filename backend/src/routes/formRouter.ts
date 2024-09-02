import express from 'express';
import { handleFormSubmissionCtrl } from '../controllers/formCtrl';
import { authMiddleware } from '../middlewares/authMiddleware';

const formRouter = express.Router();

formRouter.post('/submit', authMiddleware, handleFormSubmissionCtrl);

export default formRouter;
