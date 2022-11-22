const { application } = require('express');
const { register, login ,Adminlogin} = require('../Controllers/AuthControllers');
const { checkUser } = require('../Middleware/AuthMiddleware');
const  Form  = require('../models/ApplicationModels')

const router = require('express').Router();


router.post("/",checkUser)
router.post('/register',register)
router.post('/login',login)
router.post("/application",(req,res)=>{
    console.log(req.body);
    Form(req.body).save()
})




module.exports = router