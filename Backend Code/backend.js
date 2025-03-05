const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const SECRET_KEY = 'your_secret_key';

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Database
const db = new sqlite3.Database('./snippets.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to SQLite database.');
});

// Create tables if not exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS snippets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
)`);

// Register user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User registered successfully' });
    });
});

// Login user
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Middleware to authenticate user
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Access denied' });
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.userId = decoded.userId;
        next();
    });
};

// Save a new snippet
app.post('/snippets', authenticate, (req, res) => {
    const { title, content } = req.body;
    db.run('INSERT INTO snippets (user_id, title, content) VALUES (?, ?, ?)', [req.userId, title, content], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, content });
    });
});

// Get all snippets for logged-in user
app.get('/snippets', authenticate, (req, res) => {
    db.all('SELECT * FROM snippets WHERE user_id = ?', [req.userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get a single snippet by ID
app.get('/snippets/:id', authenticate, (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM snippets WHERE id = ? AND user_id = ?', [id, req.userId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Snippet not found' });
        res.json(row);
    });
});

// Delete a snippet
app.delete('/snippets/:id', authenticate, (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM snippets WHERE id = ? AND user_id = ?', [id, req.userId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Snippet not found' });
        res.json({ message: 'Snippet deleted successfully' });
    });
});

// Start Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
