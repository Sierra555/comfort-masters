const { google } = require('googleapis');
const fs = require('fs');
const CLIENT_ID = '443850662638-tgh2ngetukorte20ha5q6j5473d13d3o.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04bd33e-Feug1CgYIARAAGAQSNwF-L9IrO9qug7jbpitM1zRIRG00yrBuSzswCppvUdhS0K8rPoTPjU-fw04gYAfOlGnHkh7tO8s';

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

async function uploadFiles(folderId, files) {
    try {
        for (const file of files) {
            const fileMetadata = {
                name: file.originalname,
                parents: [folderId],
            };

            const media = {
                mimeType: file.mimetype,
                body: fs.createReadStream(file.path),
            };

            const response = await drive.files.create({
                resource: fileMetadata,
                media: media
            });

            console.log(response.data);
        } 
    } catch (error) {
            console.log(error);
    }
}

async function createFolder(folderName) {
    const fileMetadata = {
        name: `${folderName}`, 
        mimeType: 'application/vnd.google-apps.folder',
    };

    try {
        const file = await drive.files.create({
            resource: fileMetadata,
            fields: 'webViewLink, id',
        });
        return { id: file.data.id, webViewLink: file.data.webViewLink };
        } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { createFolder, uploadFiles };