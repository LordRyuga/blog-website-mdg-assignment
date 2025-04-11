import pool from "../config/db.js";

export const getProfile = async (req, res) => {
    try{
        const userId = req.user.id;
        console.log(userId);
        const result = await pool.query('SELECT username, email FROM users WHERE id = $1', [userId]);

        if(result.rows.length === 0)
        {
            return res.status(404).json({message: 'User not found'});
        }

        const user = result.rows[0];

        res.json({username: user.username, email: user.email});
    }catch (err)
    {
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
}

export const getUserBlogs = async (req, res) => {
    const userEmail = req.user.email;
    try{
        const result = await pool.query(
            'SELECT * FROM blogs WHERE username = $1 ORDER BY created_at DESC',
            [userEmail]
        );
        res.status(200).json(result.rows);
    }catch(err){
        console.log('error in getUserBlogs: ', err);
    }
}
