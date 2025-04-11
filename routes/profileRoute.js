import express from 'express'
import { verifyToken } from '../middleware/authMiddlware.js'
import { getProfile } from '../controller/userController.js';
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/newBlog', verifyToken, (req, res )=> {
    // console.log(path.join(__dirname))
    res.sendFile(path.join(__dirname, '../views/newBlog.html'));
});
router.get('/profile', verifyToken, getProfile);

export default router;