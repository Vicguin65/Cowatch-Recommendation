require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(cors());

app.use(bodyParser.json());

// SQLite setup
const db = new sqlite3.Database('./room-tracker.db');

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        googleId TEXT NOT NULL UNIQUE,
        accessToken TEXT,
        refreshToken TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS user_rooms (
        user_id INTEGER,
        room_id INTEGER,
        PRIMARY KEY (user_id, room_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
    )`);
});

// Routes
app.post('/api/users/oauth', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            // DO NOT COMMIT THIS
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name } = payload;

        // Fetch access and refresh tokens from Google
        const oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            'http://localhost:5000/auth/callback' // Replace with your callback URL
        );

        console.log('here');
        console.log(process.env.GOOGLE_CLIENT_ID);

        
        const { tokens } = await oauth2Client.getToken(token);
        const { access_token, refresh_token } = tokens;

         // Check if user already exists
         db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (row) {
                // Update user tokens if already exists
                db.run(`UPDATE users SET accessToken = ?, refreshToken = ? WHERE email = ?`, [access_token, refresh_token, email], function(err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    res.status(200).json({ message: 'User updated', user: row });
                });
            } else {
                // Insert new user
                db.run(`INSERT INTO users (name, email, googleId, accessToken, refreshToken) VALUES (?, ?, ?, ?, ?)`, [name, email, googleId, access_token, refresh_token], function(err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    res.status(201).json({ message: 'User created', user: { id: this.lastID, name, email, googleId } });
                });
            }
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ error: 'Invalid token', details: error.message });
    }
});

app.get("/auth/callback", async (req, res) => {
    res.redirect(`http://localhost:3000/room`);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
