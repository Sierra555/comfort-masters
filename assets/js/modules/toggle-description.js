const createRenovationButton = document.querySelector('.js-create-block-btn');
import { handleStepButtonClick } from './form-navigation.js';
import { handleFilesUpload } from './upload-files.js';

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
