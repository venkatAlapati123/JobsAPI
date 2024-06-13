const express=require('express');
const { loginuser, regiesteruser } = require('../controllers/auth');
const routerauth=express.Router();

routerauth.post('/login',loginuser)
routerauth.post('/register',regiesteruser)


module.exports=routerauth;