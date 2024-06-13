const { object } = require('joi')
const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError={
    statusCode:err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message||'Something went wrong please try again'
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if(err.code && err.code===1100)
    {
      customError.msg=`Duplicate value entered for ${err.keyValue}`
      customError.statusCode='400';
    }
    if(err.name=='ValidationError')
      {
        console.log(Object.values( err.errors))
       customError.msg=(Object.values(err.errors).map((item)=>(item.message)));
        customError.statusCode='400';
      }
  return res.status(customError.statusCode).json({ err:customError.msg })
}

module.exports = errorHandlerMiddleware
