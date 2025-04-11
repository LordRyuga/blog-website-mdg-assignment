import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_KEY;

export const verifyToken = (req, res, next) =>
{
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message: 'Access denied, No token'});

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err)
    {
        console.log(err);
        return res.status(401).json({message: 'Invalid Token'});
    }
};
