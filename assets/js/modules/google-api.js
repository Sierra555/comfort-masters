//todo remove example.jpg from repo, its just for test
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = 'refresh token';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

const filePath = path.join(__dirname, 'example.jpg'); //todo refactor for form file reading

async function uploadFile(folderId, filePath) {
    console.log('Folder Id:', folderId);

    const fileMetadata = {
        name: 'example.jpg' , //give fileName from form or generate
        parents: [folderId],
    };
    const media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(filePath), //todo probably need refactor
    };

    try {
        const response= await drive.files.create({
            resource: fileMetadata,
            media: media
        });

        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

async function createFolder() {
    const fileMetadata = {
        name: 'Invoices1', //todo make client folder for each request (probably based on email and timestamp)
        mimeType: 'application/vnd.google-apps.folder',
    };

    try {
        const file = await drive.files.create({
            resource: fileMetadata,
            fields: 'id',
        });
        console.log('Folder Id:', file.data.id);
        return file.data.id;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

createFolder().then(function(folderId) {
    uploadFile(folderId, filePath)
}); //todo remove unnecessary logs