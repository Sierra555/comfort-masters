import {filesArr} from './upload-files';

const estimationForm = document.querySelector('.js-estimation-form');
estimationForm.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const selectedSpaces = getSelectedSpaces();
    const formData = new FormData(estimationForm);
    formData.append('selectedSpaces', JSON.stringify(selectedSpaces));
    getSelectedSpacesDescription(formData);
    const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    
        // try {
        //     const folderResponse = await postDataToServer('https://www.web.com/api/create-folder', JSON.stringify({ folderName: `${formData.get('userEmail')}(${timestamp})` }), {
        //         'Content-Type': 'application/json',
        //     });

        //     const folderInfo = folderResponse.folderInfo;
        //     formData.append('folderWebLink', folderInfo.webViewLink);

        //     await postDataToSpreadsheet(formData);

        //     const filesData = new FormData();
        //     filesData.append('folderId', folderInfo.id);

        //     filesArr.map(async (file) => {
        //         filesData.append(`files`, file);
        //         await postDataToServer('https://www.web.com/api/upload-files', filesData);
        //     })

        // } catch (error) {
        //     console.error('Error during server connection:', error);
        // }
        
        if (filesArr && filesArr.length) {
            const fileReadPromises = filesArr.map(file => new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = (e) => resolve({
                    filename: file.name,
                    contentType: file.type,
                    data: e.target.result
                });
                reader.readAsDataURL(file);
            }));
        
            Promise.all(fileReadPromises).then(fileObjs => {
                formData.append('folderWebLink', JSON.stringify(fileObjs));
                postDataToSpreadsheet(formData);
            });
        } else {
            postDataToSpreadsheet(formData);
        }

}

function getSelectedSpaces() {
    const listItems = document.querySelectorAll('.js-spaces-list li');
    const selectedSpaces = Array.from(listItems).map(item => item.getAttribute('data-space')).join(',');
    return selectedSpaces;
}

function getSelectedSpacesDescription(formData) {
    const spaceNameInputs = document.querySelectorAll('.js-space-name-input');
    const spaceDescription = document.querySelectorAll('.js-space-desc-textarea');

    formData.append('spaceName', Array.from(spaceNameInputs).map((item, index) => `Name (${index + 1}): ${item.value}`));
    formData.append('spaceDescription', Array.from(spaceDescription).map((item, index) => `Description (${index + 1}): ${item.value}`));
}

async function postDataToSpreadsheet(formData) {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwUZsIr4ihmI835391VWudSBXtoNMi9QSVKhh2uc-_k-c-TKV4RM4tCbjltt6SScs_5XQ/exec', {
            method: 'POST',
            body: formData,
        });

        console.log(1);

    } catch (error) {
        console.error('Error during form submission:', error);
    }
}

async function postDataToServer(url, data, headers) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: data,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Failed to submit data. Status:', response.status, 'Error:', errorResponse.error);
            throw new Error('Failed to submit data');
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

