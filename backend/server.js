const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Multer config: store uploads temporarily in "uploads/" folder
const upload = multer({ dest: 'uploads/' });

// Internet Archive credentials from .env
const IA_ACCESS_KEY = process.env.IA_ACCESS_KEY;
const IA_SECRET_KEY = process.env.IA_SECRET_KEY;

// Enable JSON body parsing
app.use(express.json());

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = req.file.path;
  const fileName = req.file.originalname;
  const itemName = `getlink-${Date.now()}`;

  // Command to upload file to Internet Archive
  const command = `ia upload ${itemName} ${filePath} --access-key ${IA_ACCESS_KEY} --secret-key ${IA_SECRET_KEY}`;

  exec(command, (err, stdout, stderr) => {
    // Remove temp file from Termux after upload
    fs.unlinkSync(filePath);

    if (err) {
      console.error(err, stderr);
      return res.status(500).json({ error: 'Upload failed' });
    }

    // Return real public link
    const publicLink = `https://archive.org/download/${itemName}/${fileName}`;
    res.json({ link: publicLink });
  });
});

// Start server on all interfaces so your phone IP can access it
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);
