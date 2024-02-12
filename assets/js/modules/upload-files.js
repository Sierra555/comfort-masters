function handleFilesUpload() {
    const container = document.querySelector('.js-estimation-form');
    const maxFileSize = 1024 * 1024 * 5;

    container.addEventListener('change', (e) => {
        if (e.target.classList.contains('js-upload-files-input')) {
            uploadFiles(e);
        }
    });

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        e.target.files = e.dataTransfer.files;
        uploadFiles(e);
    });

    function uploadFiles(event) {
        const input = event.target;
        const container = input.closest('.js-renovation-form');
        const uploadedFiles = container.querySelector('.js-upload-files-list');
        const removeBtns = container.querySelectorAll('.js-remove-file-btn');

        const uploadFilesItem = Array.from(input.files).map(file => {
            return `<li>${file.name}<button class="clear-text-btn is-active js-remove-file-btn"></button></li>`;
        });

        uploadedFiles.insertAdjacentHTML('beforeend', uploadFilesItem.join(''));
        removeBtns.forEach(button => {
            button.addEventListener('click', (e) => {
                e.target.parentElement.remove();
            });
        });

        validateFile(maxFileSize, input);
    }

    function validateFile(maxFileSize, input) {
        if (input.files.length > 0) {
            const file = input.files[0];

            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/heic'];
            if (!allowedTypes.includes(file.type)) {
                alert('Invalid file type. Please select a valid file.');
                input.value = '';
                return;
            }

            if (file.size > maxFileSize) {
                alert('File size exceeds the allowed limit. Please select a smaller file.');
                input.value = '';
                return;
            }
        }
    }
}
