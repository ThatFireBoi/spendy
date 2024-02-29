require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.post('/api/parse-receipt', upload.single('receipt'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Replace YOUR_PROJECT_ID and YOUR_LOCATION with your Google Cloud project ID and location
    const url = `https://us-documentai.googleapis.com/v1/projects/527901588680/locations/us/processors/ee3b1231d40bd7c1:process`;
    const response = await axios.post(url, {
      // Configure the request payload according to Google Document AI API documentation
      // This includes setting the correct content type and the base64-encoded file content
    }, {
      headers: {
        'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // Securely obtain the access token
        'Content-Type': 'application/json',
      },
    });

    // Parse the response from Document AI and send the relevant data back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Document AI API:', error);
    res.status(500).send('Error processing receipt.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
