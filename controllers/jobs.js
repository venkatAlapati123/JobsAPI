
const job=require('../models/Job');
const {BadRequestError,NotFoundError}=require('../errors');
const {StatusCodes}=require('http-status-codes')

const getAllJobs=async (req,res)=>{
    const availablejobs=await job.find({createdBy:req.user.user_id}).sort('createdAt');
    if(!availablejobs)
        {
            throw new BadRequestError('No Jobs available');
        }
        res.json({Jobs:availablejobs})
   
}
const createJob=async (req,res)=>{
    const {companyname,position,Status}=req.body;
    const createdBy=req.user.user_id;
    const jobdata=await job.create({companyname,position,Status,createdBy});
    if(!jobdata)
        {
            throw new BadRequestError('Job Not created');
        }
    res.json({jobdata:jobdata});

}
const getJobById=async (req,res)=>{
    const {id}=req.params;
    console.log(id);
    const singlejob=await job.findOne({_id:id});
    if(!singlejob)
        {
            throw new NotFoundError('Not-Found')
        }
    res.json({jobresult:singlejob});
    
}
const updateJob=async (req,res)=>{
    //res.send('Job Updated')
    const {companyname,position}=req.body;
    const {id}=req.params;
    const jobupdata=await job.findOneAndUpdate({_id:id},{companyname,position},{runValidators:true,new:true});
    if(!jobupdata)
        {
            throw new NotFoundError('Not Found');
        }
    res.json({updatedjob:jobupdata});

}
const deleteJob=async(req,res)=>{
    const {id}=req.params;
    const deletejob=await job.deleteOne({_id:id});
    console.log(deletejob);
    if(!deletejob)
        {
            throw NotFoundError('Job not available')
        } 
    res.json({msg:'job deleted'});
}

module.exports={getAllJobs,createJob,getJobById,updateJob,deleteJob}

