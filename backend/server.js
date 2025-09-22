const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 3000;
const upload = multer({ dest: 'uploads/' });

const IA_ACCESS_KEY = process.env.IA_ACCESS_KEY;
const IA_SECRET_KEY = process.env.IA_SECRET_KEY;

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const fileName = req.file.originalname;
  const itemName = `getlink-${Date.now()}`;

  const command = `ia upload ${itemName} ${filePath} --access-key ${IA_ACCESS_KEY} --secret-key ${IA_SECRET_KEY}`;

  exec(command, (err, stdout, stderr) => {
    fs.unlinkSync(filePath); // remove temp file

    if (err) return res.status(500).json({ error: 'Upload failed' });

    const publicLink = `https://archive.org/download/${itemName}/${fileName}`;
    res.json({ link: publicLink });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
