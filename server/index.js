import express from 'express';
import cors from 'cors';
import pool from './db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// Middleware for verifying JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(403);
    }
};

// User Registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id',
            [username, email, hashedPassword]
        );
        res.status(201).json({ user_id: result.rows[0].user_id });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'User already exists or invalid data' });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            console.log(`No user found with email: ${email}`);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (passwordMatch) {
            const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' });
            res.json({ token });
        } else {
            console.log(`Password mismatch for email: ${email}`);
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error logging in' });
    }
});


// Get all cards for a user
app.get('/cards', authenticateJWT, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cards WHERE user_id = $1', [req.user.user_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
});

// Add a card
app.post('/cards', authenticateJWT, async (req, res) => {
    const { question, answer } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO cards (user_id, question, answer) VALUES ($1, $2, $3) RETURNING *',
            [req.user.user_id, question, answer]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create card' });
    }
});


// Update a Card
app.put('/cards/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        const result = await pool.query(
            'UPDATE cards SET question = $1, answer = $2 WHERE card_id = $3 RETURNING *',
            [question, answer, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Card not found' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update card' });
    }
});

// Delete a Card
app.delete('/cards/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM cards WHERE card_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Card not found' });
        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete card' });
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
