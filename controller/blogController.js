import pool from "../config/db.js";

export const createBlog = async (req, res) => {
    const {title, body, footer} = req.body;
    const useremail = req.user.email;
    // console.log(head);
    console.log(req.body);
    try{
        const result = await pool.query(
            'INSERT INTO blogs (username, title, body, footer) VALUES ($1, $2, $3, $4) RETURNING *', [useremail, title, body, footer]
        );

        res.status(201).json(result.rows[0]);
    }catch(err) {
        console.log(err);
        res.status(500).json({message: 'Server error while creating blog'});
    }
}

export const getBlogById = async (req, res) => {
    const {id} = req.params;
    try{
        const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);

        if(result.rows.length === 0) return res.status(404).send('blog not found');

        const blog = result.rows[0];
        // console.log(blog);
        res.send(blog);
    }catch(err){
        console.log(err);
    }
}

export const getAllBlogs = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM blogs ORDER BY created_at LIMIT 10');
        // console.log(result);

        res.send(result.rows);
    }catch(err)
    {
        console.log('error at server retrieveing blogs: ', err);
    }
}