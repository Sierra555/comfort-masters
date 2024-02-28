const express = require('express');
const multer = require('multer');
const upload = multer();
const { createFolder, uploadFiles } = require('./google-api.js');
const cors = require('cors');

const { json } = require('body-parser'); 

const app = express();
const port = process.env.PORT || 80 || 443;

app.use(cors({ origin: 'http://comfortmasters.org' }));
app.use(json());

app.post('/api/create-folder', async (req, res) => {
    try {
        const folderInfo = await createFolder(req.body.folderName);
        res.json({ success: true, folderInfo });
    } catch (error) {
        console.error('Error in create-folder route:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/upload-files', upload.array('files'), async (req, res) => {
    try {
        const folderId = req.body.folderId;
        const files = req.files;
        const fileObjs = await uploadFiles(folderId, files);

        res.json({ success: true, files: fileObjs });
    } catch (error) {
        console.error('Error in create-file route:',error);
        res.status(500).json({ success: false, error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
