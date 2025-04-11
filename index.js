import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';


import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import profileRoute from './routes/profileRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true                
  }));

app.use(cookieParser());
app.use(express.json());

app.use('/api/blog', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', profileRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
})
app.get('/blogs/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{ console.log('server listening on port 3000');});
