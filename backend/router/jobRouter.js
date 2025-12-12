import express from 'express';
import { createJob, deleteJob, getJob, getJobById, updateJob } from '../controller/jobController.js';



const jobRouter = express.Router();

jobRouter.post('/', createJob )
jobRouter.get('/', getJob);
jobRouter.delete('/:jobID', deleteJob)
jobRouter.put('/:jobID', updateJob);
jobRouter.get('/:id', getJobById)
// parcelRouter.get('/:parcelID', searchParcel);
// parcelRouter.post('/send-email',emailParcelDetails)
// parcelRouter.post('/send-update-email',emailUpdatedParcelDetails)

export default jobRouter;