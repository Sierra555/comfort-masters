const containers = document.querySelectorAll('.js-input-container');
const addressList = document.querySelector('.js-address-list');

containers.forEach(container => {
    container.addEventListener('input', handleInput);
    container.querySelector('.js-text-input').addEventListener('blur', handleBlur);
    container.querySelectorAll('.js-clear-input-btn').forEach(btn => btn.addEventListener('click', handleClearButtonClick));
});

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

function toggleErrorMessage(input, isAdd) {
    const errorMessageElement = input.parentElement.nextElementSibling;
    errorMessageElement.classList.toggle('visually-hidden', !isAdd);
    input.classList.toggle('error-alert', isAdd);
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