import express from 'express';
import { createCover, DeleteCover, getAllCovers, UpdateCover } from '../controller/coverController.js';


const coverRouter = express.Router();

coverRouter.post('/', createCover);
coverRouter.get('/', getAllCovers);
coverRouter.delete('/:coverID', DeleteCover);
coverRouter.put('/:coverID', UpdateCover);

export default coverRouter;