const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = 5000;

// Enable CORS to allow frontend (React) to communicate with backend
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Endpoint to handle the GitHub OAuth callback
app.post('/api/github/login', async (req, res) => {
  const { code } = req.body; // GitHub code received during OAuth

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    // Step 1: Exchange the code for an access token
    const response = await axios.post('https://github.com/login/oauth/access_token', null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    const { access_token } = response.data;

    if (!access_token) {
      return res.status(400).json({ error: 'Failed to get access token' });
    }

    // Step 2: Fetch user data from GitHub using the access token
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Return the access token and user data
    res.json({
      accessToken: access_token,
      user: userResponse.data,
    });
  } catch (error) {
    console.error('Error during GitHub login:', error);
    res.status(500).json({ error: 'An error occurred during GitHub login' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
