const jwt = require('jsonwebtoken');
const userschema=require('../models/User');
const {UnauthenticatedError} =require('../errors')

const authenticationmiddleware=(req, res, next) => {
    //console.log('excuted');

    const result = req.headers.authorization;
    // console.log(result);
    if (!result || !result.startsWith('Bearer ')) {
        throw new NotFound('Provide Token');
    }
    const token = result.split(' ')[1];
    try {
        const pay=jwt.verify(token, process.env.SECRET);
        const {user_id,username}=pay;
        req.user={user_id,username};
        next();
    } catch (error) {
        throw new Unauthorized('Authorization failed');
    }

}

module.exports=authenticationmiddleware