import express from 'express';
import { createBlog, getBlogById, getAllBlogs } from '../controller/blogController.js';
import { verifyToken } from '../middleware/authMiddlware.js';
import { getUserBlogs } from '../controller/userController.js';

const router = express.Router();

router.post('/new', verifyToken, createBlog);
router.get('/myBlogs', verifyToken, getUserBlogs);
router.get('/getById/:id', getBlogById);
router.get('/getAllBlogs', getAllBlogs);

export default router;

