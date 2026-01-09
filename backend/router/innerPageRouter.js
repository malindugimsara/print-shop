import express from 'express';
import { createInner, deleteInner, getAllInners, updateInner } from '../controller/innerPageController.js';



const innerPageRouter = express.Router();

innerPageRouter.post('/', createInner);
innerPageRouter.get('/', getAllInners);
innerPageRouter.delete('/:innerID', deleteInner);
innerPageRouter.put('/:innerID', updateInner);

export default innerPageRouter;