document.addEventListener('DOMContentLoaded', function () {
    const slider = tns({
        container: '.js-feedbacks-slider',
        items: 3,
        slideBy: 1,
        mouseDrag: true,
        loop: true,
        controlsContainer: '.js-feedbacks-slider-controls',
        nav: false,
        responsive: {
            1064: {
                items: 3
            },
            780: {
                items: 2
            },
            320: {
                items: 1,
            }
        }
    });
  });