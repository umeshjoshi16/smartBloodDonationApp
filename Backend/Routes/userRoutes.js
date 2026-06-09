import express from 'express';
import { getProfile, loginUser, registerUser } from '../Controller/userController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';




const router=express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getprofile',authMiddleware,getProfile)

export default router;
  