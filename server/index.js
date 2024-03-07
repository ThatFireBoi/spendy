require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { google } = require('googleapis');

const upload = multer({ dest: 'uploads/' }); // Temporarily store files in an 'uploads' directory
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Function to obtain Google OAuth2 client
const getGoogleAuthClient = () => {
  const auth = new google.auth.GoogleAuth({
    keyFilename: "./spendy-415019-320f965b8139.json", // Path to Google Service Account Key File
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  return auth.getClient();
};

app.post('/api/parse-receipt', upload.single('receipt'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  const fileContent = fs.readFileSync(filePath, 'base64');

  try {
    const client = await getGoogleAuthClient();
    const url = `https://documentai.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/YOUR_LOCATION/documents:process`;

    const response = await axios.post(
      url,
      {
        document: {
          content: fileContent,
          mimeType: 'application/pdf',
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${(await client.getAccessToken()).token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    fs.unlinkSync(filePath); // Clean up the temporary file

    // Parse the response from Document AI and send the relevant data back
    const parsedData = response.data;
    res.json(parsedData);
  } catch (error) {
    console.error('Error calling Document AI API:', error);
    res.status(500).send('Error processing receipt.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
