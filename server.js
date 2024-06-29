import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;
const API_URL = 'https://blogwebsitedb-api.onrender.com';

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

// Route to render the main page
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/api/posts`);
        res.render('index.ejs', { posts: response.data });
    } catch (error) {
        console.error('Error fetching posts:', error); // Log the error
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

// Route to render the new post page
app.get('/new', (req, res) => {
    res.render('modify.ejs', { heading: 'New Post', submit: 'Create Post', post: null });
});

// Route to render the edit post page
app.get('/edit/:id', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/api/posts/${req.params.id}`);
        res.render('modify.ejs', {
            heading: 'Edit Post',
            submit: 'Update Post',
            post: response.data,
        });
    } catch (error) {
        console.error('Error fetching post:', error); // Log the error
        res.status(500).json({ message: 'Error fetching post' });
    }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
    try {
        await axios.post(`${API_URL}/api/posts`, req.body);
        res.redirect('/');
    } catch (error) {
        console.error('Error creating post:', error); // Log the error
        res.status(500).json({ message: 'Error creating post' });
    }
});

// Update a post
app.post('/api/posts/:id', async (req, res) => {
    try {
        await axios.patch(`${API_URL}/api/posts/${req.params.id}`, req.body);
        res.redirect('/');
    } catch (error) {
        console.error('Error updating post:', error); // Log the error
        res.status(500).json({ message: 'Error updating post' });
    }
});

// Delete a post
app.get('/api/posts/delete/:id', async (req, res) => {
    try {
        await axios.delete(`${API_URL}/api/posts/${req.params.id}`);
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting post:', error); // Log the error
        res.status(500).json({ message: 'Error deleting post' });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
