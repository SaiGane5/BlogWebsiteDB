import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Get all posts
router.get('/posts', async (req, res) => {
    try {
        const { rows } = await query('SELECT * FROM posts ORDER BY id');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching posts', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

// Get a specific post by id
router.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const { rows } = await query('SELECT * FROM posts WHERE id = $1', [postId]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching post', error);
        res.status(500).json({ message: 'Error fetching post' });
    }
});

// Create a new post
router.post('/posts', async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const { rows } = await query('INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *', [title, content, author]);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error creating post', error);
        res.status(500).json({ message: 'Error creating post' });
    }
});

// Update a post
router.patch('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    const { title, content, author } = req.body;
    try {
        const { rows } = await query('UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *', [title, content, author, postId]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error updating post', error);
        res.status(500).json({ message: 'Error updating post' });
    }
});

// Delete a post
router.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const { rowCount } = await query('DELETE FROM posts WHERE id = $1', [postId]);
        if (rowCount === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted' });
    } catch (error) {
        console.error('Error deleting post', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
});

export default router;
