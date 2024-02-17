document.addEventListener('DOMContentLoaded', () => {
    (function() {
        const hamburger = document.querySelector('.js-menu-hamburger');
        const menu = document.querySelector('.js-menu');
        const header = document.querySelector('.js-header');
        
        hamburger.addEventListener('click', (e) => {
            hamburger.classList.toggle('active');
            menu.classList.toggle('menu_active');
        });
        
        const menuLinks = document.querySelectorAll('.js-menu .link');
        menuLinks.forEach(link => {
          link.addEventListener('click', () => {
            menu.classList.remove('menu_active');
            hamburger.classList.toggle('active');
          });
        });
    
        window.addEventListener('scroll', () => {
            header.classList.toggle('sticky', window.scrollY > 0);
        });
    })();
});