const express = require("express");
const cors = require('cors');
const { google } = require("googleapis");
const fs = require('fs');
const path = require('path');
const OAuth2 = google.auth.OAuth2;
const app = express();

app.use(cors());

const oauth2Client = new OAuth2(
  "496286067266-ncmva0hoafsa4m2f6omj2kpeo109c40r.apps.googleusercontent.com",
  "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",
  "http://localhost:5000/oauth2callback" // e.g., http://localhost:5000/oauth2callback
);

// Utility function to read tokens from JSON file
const readTokens = (user) => {
  const filePath = path.join(__dirname, `tokens_user_${user}.json`);
  if (fs.existsSync(filePath)) {
    const tokens = fs.readFileSync(filePath);
    return JSON.parse(tokens);
  }
  return null;
};

// Utility function to save tokens to JSON file
const saveTokens = (user, tokens) => {
  const filePath = path.join(__dirname, `tokens_user_${user}.json`);
  fs.writeFileSync(filePath, JSON.stringify(tokens));
};

const scopes = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

// Redirect to Google's OAuth 2.0 server
app.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: req.query.user, // Pass user identifier in state
  });
  res.redirect(url);
});

// Handle OAuth 2.0 callback
app.get("/oauth2callback", async (req, res) => {
    const { code, state } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
  
    // Save tokens to JSON file
    // TODO: IMPLEMENT DATABASE instead of just a local file
    saveTokens(state, tokens);
  
    res.redirect(`http://localhost:3000/demo?user=${state}&status=success`);
});

// Function to get subscriptions
const getSubscriptions = async (oauth2Client) => {
  const youtube = google.youtube("v3");
  const response = await youtube.subscriptions.list({
    part: "snippet",
    mine: true,
    auth: oauth2Client,
  });
  return response.data.items;
};

app.get('/get-subscriptions-1', async (req, res) => {
  const tokensUser1 = readTokens(1);
  oauth2Client.setCredentials(tokensUser1);
  const subscriptionsUser1 = await getSubscriptions(oauth2Client);

  res.status(200).send(subscriptionsUser1);
});

app.get('/get-subscriptions-2', async (req, res) => {
  const tokensUser1 = readTokens(2);
  oauth2Client.setCredentials(tokensUser1);
  const subscriptionsUser1 = await getSubscriptions(oauth2Client);

  res.status(200).send(subscriptionsUser1);
});

// Endpoint to get common subscriptions between two users
app.get('/common-subscriptions', async (req, res) => {
  // Retrieve tokens for both users from session or database
  const tokensUser1 = readTokens(1);
  const tokensUser2 = readTokens(2);

  oauth2Client.setCredentials(tokensUser1);
  const subscriptionsUser1 = await getSubscriptions(oauth2Client);

  oauth2Client.setCredentials(tokensUser2);
  const subscriptionsUser2 = await getSubscriptions(oauth2Client);

  // Find common channels
  const channelsUser1 = subscriptionsUser1.map(sub => sub.snippet.resourceId.channelId);
  const channelsUser2 = subscriptionsUser2.map(sub => sub.snippet.resourceId.channelId);

  const commonChannels = channelsUser1.filter(channelId => channelsUser2.includes(channelId));

  res.send({ commonChannels });
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
