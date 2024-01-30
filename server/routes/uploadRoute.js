const express = require("express");
const router = express.Router();
const multer = require("multer");
const { google } = require("googleapis");
// const app = express();
const upload = multer({ dest: "uploads/" }); // Destination folder for uploaded files

// Configuration
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const scopes = ["https://www.googleapis.com/auth/drive"];

// Create an OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);

// Generate the authentication URL
const authUrl = oAuth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  /** Pass in the scopes array defined above.
   * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true,
});

// Get the authentication URL
router.get("/auth/google", (req, res) => {
  res.send(authUrl);
});

var drive = google.drive({
  version: "v3",
  auth: oAuth2Client,
});

// Handle the callback from the authentication flow
router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange the authorization code for access and refresh tokens
    const { tokens } = await oAuth2Client.getToken(code);
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
      access_token: accessToken,
    });

    // Save the tokens in a database or session for future use

    // Redirect the user to a success page or perform other actions
    res.send("Authentication successful!");
  } catch (error) {
    console.error("Error authenticating:", error);
    res.status(500).send("Authentication failed.");
  }
});

router.get("/files", async (req, res) => {
  try {
    const response = await drive.files.list({
      pageSize: 10, // Set the desired number of files to retrieve
      fields: "files(name, id)", // Specify the fields to include in the response
    });
    const files = response.data.files;
    res.json(files);
  } catch (err) {
    console.error("Error listing files:", err);
    res.status(500).json({ error: "Failed to list files" });
  }
});

module.exports = router;
