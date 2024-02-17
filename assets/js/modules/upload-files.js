import {toggleErrorMessage} from './handle-input.js';

export const handleFilesUpload = () =>{
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
