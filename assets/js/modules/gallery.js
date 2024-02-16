document.querySelectorAll('.js-small-img').forEach(img => {
    img.addEventListener('click', (e) => {
        if (!e.target.closest('img').hasAttribute('srcset')) return;
        console.log(e.target);

        const smallImagePath = e.target.srcset;
        const smallImageSource = e.target.previousElementSibling.srcset;

        const largeImage = document.querySelector('.js-large-img');
        const largeImagePath = largeImage.querySelector('img').srcset;
        const largeImageSource = largeImage.querySelector('source').srcset;

        largeImage.querySelector('source').srcset = smallImageSource;
        largeImage.querySelector('img').srcset = smallImagePath;
        
        e.target.previousElementSibling.srcset = largeImageSource;
        e.target.srcset = largeImagePath;
    });
});