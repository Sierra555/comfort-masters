document.querySelector('.js-gallery').addEventListener('click', (e) => {
    if (!e.target.closest('img').hasAttribute('srcset')) return;
    e.preventDefault();

    const smallImagePath = e.target.srcset;
    document.querySelector('.js-large-img').srcset = smallImagePath;
    });