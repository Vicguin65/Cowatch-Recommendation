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
        refreshToken TEXT,
        roomId INTEGER
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL UNIQUE
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
    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [data["email"]],
      (err, row) => {
        if (err) {
          res.status(201);
        }

        if (row) {
          // Update user tokens if already exists
          db.run(
            `UPDATE users SET accessToken = ?, refreshToken = ? WHERE email = ?`,
            [tokens["access_token"], tokens["refresh_token"], data["email"]],
            function (err) {
              if (err) {
                res.status(201);
              }

              res.status(200);
            }
          );
        } else {
          // Insert new user
          db.run(
            `INSERT INTO users (name, email, googleId, accessToken, refreshToken) VALUES (?, ?, ?, ?, ?)`,
            [
              data["name"],
              data["email"],
              data["id"],
              tokens["access_token"],
              tokens["refresh_token"],
            ],
            function (err) {
              if (err) {
                res.status(500);
              }

              res.status(201);
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400);
  }

  console.log(tokens["access_token"]);
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

app.get("/recommendations", async (req, res) => {
  var roomId = req.query.roomId; // GET string query param "roomId"
  const sql = `SELECT *
           FROM rooms
           WHERE code  = ?`;

  db.get(sql, [roomId], (err, row) => { 
    if (err) {
      console.error(err.message);
      return res.status(404).send("Invalid ID");
    }

    if(!row){
      console.error("No ID Found");
      return res.status(404).send("Invalid ID");
    }

    row.

  });

});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
