const express=require('express');
const { getAllJobs, createJob, getJobById, updateJob, deleteJob } = require('../controllers/jobs');
const router=express.Router();

router.get('/',getAllJobs)
router.post('/',createJob)
router.get('/:id',getJobById);
router.patch('/:id',updateJob);
router.delete('/:id',deleteJob);

module.exports=router;