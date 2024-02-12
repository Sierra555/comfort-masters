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