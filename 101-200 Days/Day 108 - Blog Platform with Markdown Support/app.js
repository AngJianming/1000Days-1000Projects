const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const POSTS_DIR = path.join(__dirname, 'posts');

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)){
    fs.mkdirSync(POSTS_DIR);
}

// Home Page - List all posts
app.get('/', (req, res) => {
    fs.readdir(POSTS_DIR, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading posts');
        }
        const posts = files.map(file => {
            const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
            const post = JSON.parse(content);
            return post;
        });
        res.render('index', { posts });
    });
});

// New Post Form
app.get('/new', (req, res) => {
    res.render('new');
});

// Create New Post
app.post('/new', (req, res) => {
    const { title, content } = req.body;
    const id = Date.now().toString();
    const post = { id, title, content };
    fs.writeFile(path.join(POSTS_DIR, `${id}.json`), JSON.stringify(post), (err) => {
        if (err) {
            return res.status(500).send('Error saving post');
        }
        res.redirect('/');
    });
});

// View Post
app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(path.join(POSTS_DIR, `${id}.json`), 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('Post not found');
        }
        const post = JSON.parse(data);
        post.htmlContent = marked(post.content);
        res.render('post', { post });
    });
});

// Edit Post Form
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(path.join(POSTS_DIR, `${id}.json`), 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('Post not found');
        }
        const post = JSON.parse(data);
        res.render('edit', { post });
    });
});

// Update Post
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const post = { id, title, content };
    fs.writeFile(path.join(POSTS_DIR, `${id}.json`), JSON.stringify(post), (err) => {
        if (err) {
            return res.status(500).send('Error updating post');
        }
        res.redirect(`/post/${id}`);
    });
});

// Delete Post
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    fs.unlink(path.join(POSTS_DIR, `${id}.json`), (err) => {
        if (err) {
            return res.status(500).send('Error deleting post');
        }
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
