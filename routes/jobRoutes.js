import express from 'express';
import { userAuth } from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobController, jobstatsController, updateJobController } from '../controllers/jobController.js';
const router = express.Router();


//create job/post
router.post('/create-job', userAuth, createJobController)


//get job | get
router.get('/get-job', userAuth, getAllJobController)


// update up || patch

router.patch('/update-job/:id', userAuth, updateJobController)


//delete job || delete
router.delete('/delete-job/:id', userAuth, deleteJobController)

//job stats filter || get
router.get('/job-stats', userAuth, jobstatsController)

export default router;