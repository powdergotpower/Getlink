const express = require('express');
const multer = require('multer');
const { upload } = require('internetarchive');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Temp folder to store uploaded files
const uploadMiddleware = multer({ dest: 'uploads/' });

// Internet Archive credentials (store them in GitHub Secrets or .env)
const IA_ACCESS_KEY = 'YOUR_IA_ACCESS_KEY';
const IA_SECRET_KEY = 'YOUR_IA_SECRET_KEY';

app.post('/upload', uploadMiddleware.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path; // temp file
    const fileName = req.file.originalname;

    // Generate a unique identifier for Internet Archive item
    const itemName = `getlink-${Date.now()}`;

    // Upload to Internet Archive
    await upload(itemName, [filePath], {
      accessKey: IA_ACCESS_KEY,
      secretKey: IA_SECRET_KEY,
    });

    // Remove temp file
    fs.unlinkSync(filePath);

    // Create public link
    const publicLink = `https://archive.org/download/${itemName}/${fileName}`;
    res.json({ link: publicLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.listen(PORT, () => {
  console.log(`GetLink backend running at http://localhost:${PORT}`);
});
