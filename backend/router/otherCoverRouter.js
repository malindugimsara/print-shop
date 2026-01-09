import express from 'express';
import { createOtherCover, deleteOtherCover, getAllOtherCovers, updateOtherCover } from '../controller/otherCoverController.js';

const otherCoverRouter = express.Router();

otherCoverRouter.post('/', createOtherCover);
otherCoverRouter.get('/', getAllOtherCovers);
otherCoverRouter.delete('/:coverID', deleteOtherCover);
otherCoverRouter.put('/:coverID', updateOtherCover);

export default otherCoverRouter;