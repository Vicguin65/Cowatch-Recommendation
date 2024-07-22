require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const { google } = require("googleapis");

const app = express();
const port = 5000;

// Fetch access and refresh tokens from Google
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/callback" // Replace with your callback URL
);

// Middleware
app.use(cors());

app.use(bodyParser.json());

// SQLite setup
const db = new sqlite3.Database("./room-tracker.db");

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

app.get("/auth/callback", async (req, res) => {
  const { code, state } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });
  const { data } = await oauth2.userinfo.get(); // get user info

  try {
    db.get(`SELECT * FROM users WHERE email = ?`, [data['email']], (err, row) => {
        if (err) {
        //   return res.status(500).json({ error: err.message });
        }
  
        if (row) {
          // Update user tokens if already exists
          db.run(
            `UPDATE users SET accessToken = ?, refreshToken = ? WHERE email = ?`,
            [tokens['access_token'], tokens['refresh_token'], data['email']],
            function (err) {
              if (err) {
                // return res.status(500).json({ error: err.message });
              }
  
              res.status(200)
            }
          );
        } else {
          // Insert new user
          db.run(
            `INSERT INTO users (name, email, googleId, accessToken, refreshToken) VALUES (?, ?, ?, ?, ?)`,
            [data['name'], data['email'], data['id'], tokens['access_token'], tokens['refresh_token']],
            function (err) {
              if (err) {
                // return res.status(500).json({ error: err.message });
              }
  
              res.status(201)
            //     .json({
            //       message: "User created",
            //       user: { id: this.lastID, name, email, googleId },
            //     });
            }
          );
        }
      });
    
  } catch (error) {
    console.error("Error verifying token:", error);
    // res.status(400).json({ error: "Invalid token", details: error.message });
  }

console.log(tokens['access_token']);
  res.redirect(`http://localhost:3000/room`);
});

app.get("/auth", async (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: req.query.user, // Pass user identifier in state
  });
  res.redirect(url);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
