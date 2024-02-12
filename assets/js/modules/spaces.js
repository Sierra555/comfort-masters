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
