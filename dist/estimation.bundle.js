/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 968:
/***/ (() => {

const calcBudgetBtn = document.querySelector('.js-calc-budget');

calcBudgetBtn.addEventListener('click', handleCalcBudget);

function handleCalcBudget() {
    const selectedSpaces = document.querySelectorAll('.js-spaces-list li');
    const range = document.querySelector('.js-budget-value');
    const minVal = document.querySelector('.js-calc-min-value');
    const maxVal = document.querySelector('.js-calc-max-value');

    calculateBudgetRange(selectedSpaces, range, minVal, maxVal);
}

const spacesBudget = [
    {
        space: 'Room Reconstruction',
        services: ['Attic', 'Basement', 'Bedroom', 'Foyer', 'Laundry', 'Living Space', 'Garage', 'Kitchen'],
        budget: { minValue: 5000, maxValue: 10000 }
    },
    {
        space: 'Bathroom Reconstruction',
        services: ['Bathroom'],
        budget: { minValue: 7000, maxValue: 15000 }
    },
    {
        space: 'Room Additions',
        services: ['Room Additions'],
        budget: { minValue: 8000, maxValue: 20000 }
    },
    {
        space: 'Roof Reconstructions',
        services: ['Roofing'],
        budget: { minValue: 500, maxValue: 30000 }
    },
    {
        space: 'Stucco',
        services: ['Stucco', 'Yard', 'House Exterior'],
        budget: { minValue: 1000, maxValue: 3000 }
    },
    {
        space: 'Painting',
        services: ['Painting'],
        budget: { minValue: 2000, maxValue: 5000 }
    },
    {
        space: 'Whole House',
        services: ['Whole Home'],
        budget: { minValue: 20000, maxValue: 50000 }
    },
    {
        space: 'Something Else',
        services: ['Something Else'],
        budget: { minValue: 200, maxValue: 1000 }
    },
];

function calculateBudgetRange(selectedSpaces, range, minVal, maxVal) {
    const selectedSpacesLowerCase = Array.from(selectedSpaces).map(space => space.dataset.space.toLowerCase());

    const hasWholeHouseService = selectedSpacesLowerCase.some(space =>
        spacesBudget.find(entry => entry.space === 'Whole House').services
          .some(wholeHouseService => wholeHouseService.toLowerCase() === space)
      );    

    const calculateTotal = (key) => {
        if (hasWholeHouseService) {
            const wholeHouseBudget = spacesBudget.find(entry => entry.space === 'Whole House').budget[key];
            return wholeHouseBudget;
        }

        return selectedSpacesLowerCase.reduce((acc, currentVal) => {
            const spaceBudget = spacesBudget.find(entry => entry.services.some(service => service.toLowerCase() === currentVal));
            return acc + (spaceBudget ? spaceBudget.budget[key] : 0);
        }, 0);
    };

    const min = calculateTotal('minValue');
    const max = calculateTotal('maxValue');

    minVal.textContent = `$ ${min.toLocaleString()}`;
    maxVal.textContent = `$ ${max.toLocaleString()}`;
    range.textContent = `${minVal.textContent} - ${maxVal.textContent}`;
}


/***/ }),

/***/ 855:
/***/ (() => {

const authToken = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzA1OTg3ODIxLCJqdGkiOiI2NGEyYzEzZS0xN2IwLTQ5YTUtYWY4NC1iZWIyY2IxNGM4YjUiLCJ1c2VyX3V1aWQiOiJiZDI2ODYyZC00ZmZlLTRhODQtYjZmOS1kNGJhOTJkMWFkMWIifQ.t3FmEIUwd8PMqCrn-K4oAHJfisanCVwgSo1FYlT4a7dBXwfCacZNb191smbYt2mHniKKqNz4gNZ63td84L9Xxg';

function openCalendlyPopup() {
    fetch('https://api.calendly.com/users/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    })

    .then(response => {
        if(!response.ok) {
            throw new Error(`Network response failed: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        const scheduleLink = data.resource.scheduling_url;

        Calendly.initPopupWidget({url: scheduleLink});
    })
    .catch(error => console.log('Error:', error));
}

document.querySelectorAll('.js-calendly-popup').forEach(popup => popup.addEventListener('click', openCalendlyPopup));

/***/ }),

/***/ 763:
/***/ (() => {

const autocompleteInput = document.querySelector('.js-address-input');
const autocompleteList = document.querySelector('.js-address-list');

async function getAutocompleteOptions(query) {
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=us&accept-language=en`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const suggestions = data.map(result => result.display_name);

        displayAutocompleteOptions(suggestions);
    } catch (error) {
        console.error('Error fetching autocomplete options:', error);
    }
}

function displayAutocompleteOptions(options) {

    autocompleteList.textContent = '';

    options.forEach(option => {
        const listItem = document.createElement('li');
        listItem.textContent = option;
        autocompleteList.appendChild(listItem);

        listItem.addEventListener('click', () => {
            autocompleteInput.value = option;
            autocompleteList.textContent = '';
        });
    });
}

autocompleteInput.addEventListener('input', () => {
    getAutocompleteOptions(autocompleteInput.value);
});

/***/ }),

/***/ 396:
/***/ (() => {

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

function getSelectedSpaces() {
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

        if (!response.ok) {
            console.error('Failed to submit data. Status:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function handleGoogleSignIn(googleUser) {
console.log('Google Sign-In Information:', googleUser);
}


/***/ }),

/***/ 18:
/***/ (() => {

const spacesContainer = document.querySelector('.js-spaces-container');
const spacesList = spacesContainer.querySelector('ul');
const spacesOptions = document.querySelector('.js-spaces-options-container');

function createListItem(value) {
    const listItem = document.createElement('li');
    listItem.textContent = value;
    listItem.dataset.space = value;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.ariaLabel = 'Remove item button';
    removeButton.classList.add('clear-text-btn', 'is-active', 'js-clear-input-btn');

    listItem.append(removeButton);
    spacesList.append(listItem);

    removeButton.addEventListener('click', () => {
        const matchingButton = Array.from(spacesOptions.querySelectorAll('.spaces__item')).find(option => option.textContent == listItem.dataset.space);

        if(matchingButton) {
            matchingButton.classList.remove('is-disabled');
            matchingButton.removeAttribute('disabled');
        }

        listItem.remove();

        if (spacesList.querySelectorAll('li').length === 0) {
            spacesContainer.classList.remove('is-active');
            spacesContainer.dataset.isValid = 'false';
        }
    });
}

function handleSpacesItemClick(button) {
    createListItem(button.textContent);
    button.classList.add('is-disabled');
    button.setAttribute('disabled', 'true');
    spacesContainer.dataset.isValid = 'true';

    if (!spacesContainer.classList.contains('is-active')) {
        spacesContainer.classList.add('is-active');
    }
}

spacesOptions.addEventListener('click', (event) => {
    const clickedButton = event.target;
    if (clickedButton.classList.contains('spaces__item')) {
        handleSpacesItemClick(clickedButton);
    }
});


/***/ }),

/***/ 348:
/***/ (() => {

const surveyContainer = document.querySelector('.js-survey-container');

  surveyContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('js-survey-option')) {
        e.target.dataset.isValid = e.target.checked;
    };
  });

  const targetNode = document.documentElement;

  const observer = new MutationObserver(function(mutationsList) {
      for (const mutation of mutationsList) {
          if (mutation.type === 'attributes') {
              if (mutation.attributeName === 'data-is-valid') {
                  const closestValidateData = mutation.target.closest('.js-validate-data');
                  const closestNextBtn = closestValidateData.querySelector('.js-next-step-btn');

                  if (closestNextBtn) {
                      closestNextBtn.disabled = mutation.target.dataset.isValid !== 'true';
                  }
              }
          }
      }
  });

  const config = { attributes: true, subtree: true };
  observer.observe(targetNode, config);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./assets/js/modules/post-data.js
var post_data = __webpack_require__(396);
// EXTERNAL MODULE: ./assets/js/modules/budget-range.js
var budget_range = __webpack_require__(968);
;// CONCATENATED MODULE: ./assets/js/modules/form-navigation.js
const stepBtns = document.querySelectorAll('.js-step-btn');
const getEstimBtn = document.querySelector('.js-get-estim-btn');

const handleStepButtonClick = (event) => {
    const currentBtn = event.currentTarget;
    const currentStepNum = parseInt(currentBtn.getAttribute('data-step'));
    const currentStep = document.querySelector(`.js-step-${currentStepNum}`);

    if (event.target.classList.contains('js-skip-btn')) {
        currentStep.style.display = 'none';
        document.querySelector('.js-last-step').style.display = 'block';
        return;
    } 
    
    let targetStepNum;

    if (currentBtn.classList.contains('js-next-step-btn')) {
        targetStepNum = currentStepNum + 1;
    } else if (currentBtn.classList.contains('js-prev-step-btn')) {
        targetStepNum = currentStepNum - 1;
    }

    const targetStep = document.querySelector(`.js-step-${targetStepNum}`);
    const progressBar = targetStep.querySelector('.js-progress-bar');
    const initialWidthMob = 45;
    const initialWidthDesk = 163;

    if (currentStep) {
        currentStep.style.display = 'none';
    }

    if (targetStep) {
        targetStep.style.display = 'block';
    }

    progressBar.style.width = `${initialWidthMob * targetStepNum}px`;

    if (window.innerWidth >= 768) {
        progressBar.style.width = `${initialWidthDesk * targetStepNum}px`;
    }
}


stepBtns.forEach(button => {
    button.addEventListener('click', handleStepButtonClick);
});

getEstimBtn.addEventListener('click', handleStepButtonClick);
;// CONCATENATED MODULE: ./assets/js/modules/handle-input.js
const containers = document.querySelectorAll('.js-input-container');
const addressList = document.querySelector('.js-address-list');

containers.forEach(container => {
    container.addEventListener('input', handleInput);
    container.querySelector('.js-text-input').addEventListener('blur', handleBlur);
    container.querySelectorAll('.js-clear-input-btn').forEach(btn => btn.addEventListener('click', handleClearButtonClick));
});

const toggleErrorMessage = (input, isAdd) => {
    const errorMessageElement = input.parentElement.nextElementSibling;
    errorMessageElement.classList.toggle('visually-hidden', !isAdd);
    input.classList.toggle('error-alert', isAdd);
}

function handleInput(e) {
    const input = e.target;
    const closestClearBtn = input.parentElement.querySelector('.js-clear-input-btn');

    closestClearBtn?.classList.toggle('is-active', Boolean(input.value));
    toggleErrorMessage(input, false);
    validateInput(input);
    input.classList.contains('js-address-input') ? '' : handleValidation(input);
    input.classList.contains('js-budget-input') ? input.parentElement.classList.add('is-focused') : '';
}

function handleBlur(e) { 
    const input = e.target;

    if (!input.value) {
        toggleErrorMessage(input, true);
        addressList.innerHTML = '';
    }

    input.classList.contains('js-address-input') ? handleValidation(input) : '';
}

function handleClearButtonClick(e) {
    const clearBtn = e.target;
    const closestTextInput = clearBtn.parentElement.querySelector('.js-text-input');

    if (closestTextInput) {
        closestTextInput.value = '';
        closestTextInput.dataset.isInputValid = false;
        
        handleValidation(closestTextInput);
        toggleErrorMessage(closestTextInput, true);
        clearBtn.classList.remove('is-active');
        addressList.innerHTML = '';
    }
}

function validateInput(input) {
    const inputValue = input.value.trim();
    const inputType = input.classList.contains('js-name-input') ? 'name' : input.classList.contains('js-email-input') ? 'email' : input.classList.contains('js-budget-input') ? 'budget' : 'other';

    switch (inputType) {
        case 'name':
            const isNameValid = inputValue.length >= 3 && inputValue.length <= 40;
            input.dataset.isInputValid = isNameValid;
            !isNameValid ? toggleErrorMessage(input, true) : '';

            return isNameValid;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmailValid = emailRegex.test(inputValue) && checkEmailService(inputValue);
            input.dataset.isInputValid = isEmailValid;
            !isEmailValid ? toggleErrorMessage(input, true) : '';

            return isEmailValid;

        case 'budget':
            const budgetPattern = /^\d{3,7}$/;
            const isBudgetValid = budgetPattern.test(inputValue);
            input.dataset.isInputValid = isBudgetValid;
            !isBudgetValid ? toggleErrorMessage(input, true) : '';

            return isBudgetValid;

        default:
            input.dataset.isInputValid = inputValue !== '';
            return inputValue !== '';
    }
}

function handleValidation(input) {
    const container = input.closest('.js-input-container');

    const allInputsValid = Array.from(container.querySelectorAll('.js-text-input')).every(textInput => {
        return textInput.dataset.isInputValid === 'true';
        });

    container.dataset.isValid = allInputsValid;
}

function checkEmailService(email) {
    const validEmailServices = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'outlook.com',
        'aol.com',
        'icloud.com',
        'mail.com',
        'zoho.com',
        'protonmail.com',
        'yandex.com',
        'live.com',
        'gmx.com',
        'inbox.com',
        'me.com',
        'rocketmail.com',
        'fastmail.com',
        'disroot.org',
        'tutanota.com',
        'riseup.net',
        'mail.ru',
        'naver.com',
        'daum.net',
        'rediff.com',
      ];    
    const domain = email.split('@')[1];
    return validEmailServices.includes(domain);
}
;// CONCATENATED MODULE: ./assets/js/modules/upload-files.js


const handleFilesUpload = () =>{
    const container = document.querySelector('.js-estimation-form');
    const maxFileSize = 1024 * 1024 * 5;
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/heic'];

    container.addEventListener('change', handleEvent);
    container.addEventListener('dragover', handleEvent);
    container.addEventListener('drop', handleEvent);

    function handleEvent(e) {
        e.preventDefault();

        switch (e.type) {
            case 'change':
                if (e.target.classList.contains('js-upload-files-input')) {
                    uploadFiles(e.target, maxFileSize, allowedTypes);
                }
                break;

            case 'drop':
                if (e.target.classList.contains('js-upload-files-label')) {
                    e.target.files = e.dataTransfer.files;
                    uploadFiles(e.target, maxFileSize, allowedTypes);
                }
                break;
        }
    }

    function uploadFiles(input, maxFileSize, allowedTypes) {
        const inputContainer = input.closest('.js-renovation-form');
        const uploadedFiles = inputContainer.querySelector('.js-upload-files-list');
        toggleErrorMessage(input, false);
    
        const validFiles = Array.from(input.files).filter(file => isValidFile(file, input, maxFileSize, allowedTypes));
    
        const uploadFilesItems = validFiles.map(file => `
            <li>${file.name}<button class="clear-text-btn is-active js-remove-file-btn"></button></li>
        `);
    
        uploadedFiles.insertAdjacentHTML('beforeend', uploadFilesItems.join(''));
    
        const removeBtns = inputContainer.querySelectorAll('.js-remove-file-btn');
        removeBtns.forEach(button => {
            button.addEventListener('click', () => {
                button.parentElement.remove();
            });
        });
    }

    function isValidFile(file, input, maxFileSize, allowedTypes) {
        if (!allowedTypes.includes(file.type) || file.size > maxFileSize) {
            toggleErrorMessage(input, true);
            input.value = '';
            return false;
        }
    
        return true;
    }
    
}

;// CONCATENATED MODULE: ./assets/js/modules/toggle-description.js
const createRenovationButton = document.querySelector('.js-create-block-btn');



createRenovationButton.addEventListener('click', createRenovationBlock);

function createRenovationBlock() {
    const selectedSpaces = document.querySelectorAll('.js-spaces-list li');
    const container = document.querySelector('.js-estimation-form');
    const lastStep = document.querySelector('.js-last-step');

    const template = (index, spaceContent) => `<div class="estimation__wrapper js-step-${7 + index}" style="display: none;">
                    <div class="estimation__heading">
                            <button type="button" class="previous-page-button js-prev-step-btn js-step-btn" aria-label="Go back to the previous step" data-step="${7 + index}"></button>
                            <a class="estimation__close-btn" href="/">Exit</a>
                    </div>
                    <div class="estimation__inner">
                        <div class="progress-bar js-progress-bar"></div>
                        <div class="estimation__content">
                            <div class="estimation__col">
                                <h2 class="estimation__title">Tell us more about basement</h2>
                                <p class="estimation__subtitle">Details about each space help us match you to the right contractors.</p>
                            </div>
                            <div class="estimation__col js-renovation-form-container">
                            <div class="renovation js-renovation-form">
                                <div class="input-container">
                                    <input class="input input_bordered js-text-input js-space-name-input" type="text id="name" aria-label="Space name" placeholder="${spaceContent}" maxlength="50">
                                    <button type="button" class="clear-text-btn js-clear-input-btn"></button>
                                </div>
                                <p>Describe this space and what you want to do with it</p>
                                <div class="textarea-container">
                                    <textarea class="input input_bordered textarea js-text-input js-space-desc-textarea" id="description" placeholder="Where is it? What's it like now? What's your idea outcome?" aria-label="Describe your space" maxlength="200"></textarea>
                                    <button type="button" class="clear-text-btn js-clear-input-btn"></button>
                                </div>
                                    <p>Upload photos</p>
                                <div class="drag-n-drop" tabindex="0">
                                    <label for="photo-upload-input" class="js-upload-files-label">Drag and drop photo or <u>choose files</u></label>
                                    <input accept="application/pdf,image/jpeg,image/png,image/heic" class="js-upload-files-input" hidden id="photo-upload-input" multiple type="file">
                                </div>
                                <p class="error-message visually-hidden">We accept: .pdf, .jpeg, .png, .heic</p>
                                <ul class="upload-files-list js-upload-files-list"></ul>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="estimation__footer"> 
                        <div class="estimation__next-btn-wrap">
                            <button type="submit" class="estimation__next-btn button button_secondary-lightest js-skip-btn js-next-step-btn js-step-btn" data-step="${7 + index}">Skip</button>
                            <button type="${index === selectedSpaces.length - 1 ? 'submit' : 'button'}" class="estimation__next-btn button js-toggle-description js-next-step-btn js-step-btn" data-step="${7 + index}">Next</button>
                        </div>
                    </div>
                 </div> `;

    Array.from(selectedSpaces).forEach((space, index) => {
        container.insertAdjacentHTML('beforeend', template(index, space.textContent));
    });

    const stepBtns = document.querySelectorAll('.js-step-btn');

    lastStep.setAttribute('class', `estimation__wrapper estimation_last-step js-last-step js-step-${7 + selectedSpaces.length}`);
    lastStep.querySelector('.js-last-step-prev-btn').setAttribute('data-step', 7 + selectedSpaces.length);
    stepBtns.forEach(button => {
        button.addEventListener('click', handleStepButtonClick);
    });

    handleFilesUpload();
}

// EXTERNAL MODULE: ./assets/js/modules/validate-data.js
var validate_data = __webpack_require__(348);
// EXTERNAL MODULE: ./assets/js/modules/nominatim.js
var nominatim = __webpack_require__(763);
// EXTERNAL MODULE: ./assets/js/modules/calendly.js
var calendly = __webpack_require__(855);
// EXTERNAL MODULE: ./assets/js/modules/spaces.js
var spaces = __webpack_require__(18);
;// CONCATENATED MODULE: ./assets/js/estimation/script.js










})();

/******/ })()
;
//# sourceMappingURL=estimation.bundle.js.map