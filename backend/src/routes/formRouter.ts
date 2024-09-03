import express, {RequestHandler} from 'express';
import { handleFormSubmissionCtrl, getUserSubmissionsCtrl } from '../controllers/formCtrl';
import { authMiddleware } from '../middlewares/authMiddleware';
import filesUpload from '../middlewares/filesUpload';


const formRouter = express.Router();

formRouter.post('/submit', authMiddleware, filesUpload.array('photos', 3), handleFormSubmissionCtrl);
formRouter.get('/submissions', authMiddleware, getUserSubmissionsCtrl);

export default formRouter;
