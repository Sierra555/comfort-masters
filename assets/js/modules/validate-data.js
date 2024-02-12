const surveyContainer = document.querySelector('.js-survey-container');

  surveyContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('js-survey-option')) {
        e.target.dataset.isValid = e.target.checked;
    };
  });

  const targetNode = document.documentElement;

  const observer = new MutationObserver(function(mutationsList) {
      for (const mutation of mutationsList) {
          if (mutation.type === 'attributes') {
              if (mutation.attributeName === 'data-is-valid') {
                  const closestValidateData = mutation.target.closest('.js-validate-data');
                  const closestNextBtn = closestValidateData.querySelector('.js-next-step-btn');

                  if (closestNextBtn) {
                      closestNextBtn.disabled = mutation.target.dataset.isValid !== 'true';
                  }
              }
          }
      }
  });

  const config = { attributes: true, subtree: true };
  observer.observe(targetNode, config);