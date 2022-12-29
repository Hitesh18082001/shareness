import express from 'express';
import {userSignup,userSignin} from '../controller/userController.js';
import {createPost,getAllPosts,getPost} from '../controller/postController.js';
import {uploadImage,getImage} from '../controller/imageController.js'
import upload from '../utils/upload.js'
const router=express.Router();
router.post('/signup',userSignup);
router.post('/login',userSignin);
router.post('/createPost',createPost);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.get('/posts', getAllPosts);
router.get('/details/:id', getPost);

export default router;
