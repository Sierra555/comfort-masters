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