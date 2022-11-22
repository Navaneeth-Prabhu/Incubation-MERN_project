const { application } = require('express');
const { Adminlogin,DashboardData,PendingStatus,ApproveStatus,UserData,GetSlot,ApprovedCompany,bookSlot,blockUser,unblockUser} = require('../Controllers/AdminControllers');
const { checkUser } = require('../Middleware/AuthMiddleware');
const  Form  = require('../models/ApplicationModels')

const router = require('express').Router();


// router.post("/",checkUser)

router.post('/login',Adminlogin)
router.get('/dashboard',DashboardData)
router.post('/dashboard',PendingStatus)
router.get('/showUser',UserData)
router.patch('/blockuser',blockUser)
router.patch('/unblock',unblockUser)
// router.patch('/updatePending',PendingStatus)
router.get('/updateApprove/:id',ApproveStatus)
router.get('/getSlot',GetSlot)
router.get('/getApprovedCompany',ApprovedCompany)
router.patch('/bookSlot',bookSlot)






module.exports = router