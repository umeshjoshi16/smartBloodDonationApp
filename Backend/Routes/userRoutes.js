import express from 'express';
import { getProfile, loginUser, registerUser } from '../Controller/userController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';
import { putEmergencyRequest,getHospitalEmergencies,getAvailableEmergencies, cancelEmergencyRequest } from '../Controller/emergencyController.js';
import {  getCamp, modifyCampStatus, registerCamp } from '../Controller/campController.js';




const router=express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getprofile',authMiddleware,getProfile)

//emergency routes
router.post('/emergencies',authMiddleware,putEmergencyRequest)
router.get('/emergencies/hospital',authMiddleware,getHospitalEmergencies)
router.get('/emergencies/available',authMiddleware,getAvailableEmergencies)
router.put('/emergencies/hospital',authMiddleware,cancelEmergencyRequest)


//camp routes
router.post('/post-camp',authMiddleware,registerCamp);
router.get('/get-camp',authMiddleware,getCamp);
router.put('/camp-modify',authMiddleware,modifyCampStatus);


export default router;
  