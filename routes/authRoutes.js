import express from 'express';
import {registerUser, loginUser} from '../controller/authcontroller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', (req, res)=> {
    res.clearCookie('token', {
        httpOnly: true
    })
    res.status(200).json({ message: 'Logged out successfully' });
})

export default router;