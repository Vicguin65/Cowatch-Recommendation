require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const { google } = require("googleapis");
const youtube = google.youtube("v3");
const jwt = require("jsonwebtoken");

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
        roomCode INTEGER NOT NULL
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        roomCode TEXT NOT NULL UNIQUE,
        owner_id INTEGER NOT NULL UNIQUE, 
        FOREIGN KEY (owner_id)
          REFERENCES users (id)
    )`);
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  // Extract token from headers or query parameters
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  // Verify token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }

    // Save user information in request for use in other routes
    req.user = decoded;
    next();
  });
};

app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });
  const { data } = await oauth2.userinfo.get(); // get user info

  try {
    db.get(`SELECT * FROM users WHERE email = ?`, [data.email], (err, row) => {
      if (err) {
        res.status(201);
      }

      if (row) {
        // Update user tokens if already exists
        db.run(
          `UPDATE users SET accessToken = ?, refreshToken = ?, roomCode = -1, WHERE email = ?`,
          [tokens.access_token, tokens.refresh_token, data.email],
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
          `INSERT INTO users (name, email, googleId, accessToken, refreshToken, roomCode) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            data.name,
            data.email,
            data.id,
            tokens.access_token,
            tokens.refresh_token,
            -1,
          ],
          function (err) {
            if (err) {
              res.status(500);
            }

            res.status(201);
          }
        );
      }
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400);
  }

  const token = jwt.sign(data.id, process.env.TOKEN_SECRET, {
    expiresIn: "4h",
  });

  res.redirect(`http://localhost:3000/room?token=${token}&googleId=${data.id}`);
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

// Function to generate a random 5-digit alphanumeric ID
const generateCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Function to create a unique code
const createUniqueCode = () => {
  let code;
  let rowExists = true;
  do {
    code = generateCode();
    const sql = `SELECT 1 FROM rooms WHERE code = ? LIMIT 1`;
    db.get(sql, [code], (err, row) => {
      if (err) {
        return -1;
      }

      if (!row) {
        rowExists = false;
      } else {
        rowExists = true;
      }
    });
  } while (rowExists);

  // Update table with code
  const sql = `INSERT INTO rooms (code) VALUES (?)`;
  db.run(sql, [code], function (err) {
    if (err) {
      return -1;
    }
  });
  return code;
};

// Endpoint to create a new room
app.post("/create-room", verifyToken, (req, res) => {
  const { googleId } = req.query.googleId;

  let userId;
  const sql = `SELECT 1 FROM users WHERE googleId = ? LIMIT 1`;
  db.get(sql, [googleId], (err, row) => {
    if (err) {
      return res.status(501).json({ message: `ERROR: not found user` });
    }

    if (!row) {
      return res
        .status(404)
        .json({ message: `User with googleId ${googleId} not found` });
    } else {
      userId = row.id;
    }
  });

  const newRoomCode = createUniqueCode();
  if (newRoomCode === -1) {
    res.status(501).json({ message: "ERROR: could not make room" });
  }

  db.run(
    `UPDATE rooms SET owner_id = ? WHERE code = ?`,
    [userId, newRoomCode],
    function (err) {
      if (err) {
        res.status(201);
      }
    }
  );
  db.run(
    `UPDATE users SET roomCode = ? WHERE id = ?`,
    [newRoomCode, userId],
    function (err) {
      if (err) {
        res.status(201);
      }
    }
  );

  return res.status(200).json({ codeId: newRoomCode });
});

// Endpoint to join a room
app.post("/join-room", verifyToken, (req, res) => {
  const { googleId } = req.query.googleId;
  const { roomCode } = req.query.roomCode;

  let userId;
  let sql = `SELECT 1 FROM users WHERE googleId = ? LIMIT 1`;
  db.get(sql, [googleId], (err, row) => {
    if (err) {
      return res.status(501).json({ message: `ERROR: not found user` });
    }

    if (!row) {
      return res
        .status(404)
        .json({ message: `User with googleId ${googleId} not found` });
    } else {
      userId = row.id;
    }
  });

  sql = `SELECT 1 FROM rooms WHERE roomCode = ? LIMIT 1`;
  db.get(sql, [roomCode], (err, row) => {
    if (err) {
      return res.status(501).json({ message: `ERROR: not found room` });
    }

    if (!row) {
      return res
        .status(404)
        .json({ message: `room with roomCode ${roomCode} not found` });
    }
  });

  db.run(
    `UPDATE users SET roomCode = ? WHERE id = ?`,
    [roomCode, userId],
    function (err) {
      if (err) {
        return res.status(501).json({ message: `ERROR: could not join room` });
      }
    }
  );
  res.status(200).json({ message: "successfully joined room" });
});

// get channel list from one's oauth token
async function getSubscriptions(oauthToken) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: oauthToken });

  const response = await youtube.subscriptions.list({
    auth,
    part: "snippet",
    mine: true,
    maxResults: 50,
  });

  return response.data.items.map((item) => item.snippet.customUrl); // Or return other relevant data
}

// get channel lists
app.get("/channels", (req, res) => {
  const { roomCode } = req.query.roomCode;

  const sql = "SELECT * FROM users WHERE roomCode = ?";

  let allSubscriptions = [];
  // Execute the query
  db.all(sql, [roomCode], (err, rows) => {
    if (err) {
      throw err;
    }

    let token;
    // Iterate through the rows
    rows.forEach(async (row) => {
      token = row.accessToken;
      try {
        const subscriptions = await getSubscriptions(token);
        allSubscriptions = [...allSubscriptions, ...subscriptions];
      } catch (error) {
        console.error(
          `Error fetching subscriptions for token ${token}:`,
          error
        );
      }
    });
  });

  // Remove duplicates
  allSubscriptions = [...new Set(allSubscriptions)];

  res.json({ subscriptions: allSubscriptions });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
