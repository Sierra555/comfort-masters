function initGoogleSignIn() {
    g_id_signin = g_id_signin || [];
    g_id_signin.push({
        'callback': handleGoogleSignIn,
        'client_id': '343870790834-cgpog94euautb7vt8q8e941pl0hodn7u.apps.googleusercontent.com',
        'auto_prompt': false
    });
}

function initDriveApi() {
    gapi.load('auth2', function () {
        gapi.auth2.init({
            client_id: '343870790834-cgpog94euautb7vt8q8e941pl0hodn7u.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/drive.file',
        });
    });
}
     
const estimationForm = document.querySelector('.js-estimation-form');

estimationForm.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();
    // initGoogleSignIn();
    // initDriveApi();
    const selectedSpaces = getSelectedSpaces();
    const formData = new FormData(estimationForm);
    formData.append('selectedSpaces', JSON.stringify(selectedSpaces));
    getSelectedSpacesDescription(formData);

    postData(formData);

    // uploadFilesToDrive(files)
    //     .then(fileUrls => {
    //         console.log('File URLs:', fileUrls);
    //         const filesArray = fileUrls.map(file => file.webContentLink);
    //         formData.append('uploadedFiles', JSON.stringify(filesArray));
    //         postData(formData);
    //     })
    //     .catch(error => {
    //         console.error('Error uploading files to Google Drive:', error);
    //     });
}

function getSelectedSpaces(formData) {
    const listItems = document.querySelectorAll('.js-spaces-list li');
    const selectedSpaces = Array.from(listItems).map(item => item.getAttribute('data-space')).join(',');
    return selectedSpaces;
}

function getSelectedSpacesDescription(formData) {
    const spaceNameInputs = document.querySelectorAll('.js-space-name-input');
    const spaceDescription = document.querySelectorAll('.js-space-desc-textarea');
    const fileInputs = document.querySelectorAll('.js-upload-files-inputt');

    formData.append('spaceName', Array.from(spaceNameInputs).map((item, index) => `Name (${index + 1}): ${item.value}`));
    formData.append('spaceDescription', Array.from(spaceDescription).map((item, index) => `Description (${index + 1}): ${item.value}`));
    formData.append('uploadedFiles', Array.from(fileInputs).map((item, index) => `Files (${index + 1}): ${item.files}`));
}

async function uploadFilesToDrive(files) {
    const fileUrls = [];

    try {
        for (const file of files) {
            const metadata = {
                name: file.name,
            };

            const form = new FormData();
            form.append('file', file);

            const driveResponse = await gapi.client.drive.files.create({
                resource: metadata,
                media: {
                    mimeType: file.type,
                    body: form,
                },
            });

            const fileData = driveResponse.result;
            fileUrls.push(fileData);
            console.log('File URLs:', fileUrls);
        }
    } catch (error) {
        console.error('Error uploading files to Google Drive:', error);
        throw error;
    }

    return fileUrls;
}

async function postData(formData) {
    try {
        const response = await fetch('https://api.apispreadsheets.com/data/cruEXgMCQGq0lppK/', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Data successfully submitted');
        } else {
            console.error('Failed to submit data to Google Sheets. Status:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function handleGoogleSignIn(googleUser) {
console.log('Google Sign-In Information:', googleUser);
}
