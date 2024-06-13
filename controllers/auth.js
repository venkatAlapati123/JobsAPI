
require('dotenv').config()
const { BadRequestError, UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken')
const userschema = require('../models/User')
const bcrypt=require('bcryptjs');
const regiesteruser = async (req, res) => {
    const { username, Email, Password } = req.body;
    // if (!username || !Email || !Password) {
    //     throw new BadRequestError('Enter All Details');
    // }

    const createduser = await userschema.create({ username: username, Email: Email, Password: Password })
    const token = jwt.sign({ user_id:createduser._id,username: username }, process.env.SECRET, { expiresIn: '15m' })
    res.json({ msg: createduser.username, token: token })
}


const loginuser = async (req, res) => {
    const { Email, Password } = req.body;
    
    if (!Email || !Password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await userschema.findOne({ Email: Email })
   
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const matched = await user.comparePassword(Password)
    if (!matched) {
        throw new UnauthenticatedError('Invalid credentials')

    }
    const token = jwt.sign({ user_id:user._id,username: user.username }, process.env.SECRET, { expiresIn: '15m' })
    res.json({ msg: user.username, token: token })
}
module.exports = { loginuser, regiesteruser }