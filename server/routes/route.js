import express from 'express';
import {userSignup,userSignin} from '../controller/userController.js';
const router=express.Router();
router.post('/signup',userSignup);
router.post('/login',userSignin);
// router.post('/createPost',CreatePost);
export default router;
