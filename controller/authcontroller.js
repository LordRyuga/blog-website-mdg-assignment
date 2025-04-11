import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_KEY;

export const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    try{
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(userCheck.rows.length > 0)
        {
            return res.status(200).json({error: 'Email already registered'});
        }

        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email', [username, email, hashed]);
        console.log(newUser);
        res.status(201).json({user: newUser.rows[0]});
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userRes.rows[0];

        if(!user) return res.status(404).json({error: 'Invalid credentials'});

        const authorized = await bcrypt.compare(password, user.password);
        if(!authorized) return res.status(401).json({error: 'Invalid credentials'})

        const token = jwt.sign({id: user.id, email: user.email, username: user.username}, JWT_SECRET, {expiresIn: '12h'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 12 * 60 * 60 * 1000
        })

        res.json({token, user: {id: user.id, username: user.username, email: user.email} });
    }catch (err){
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
}
