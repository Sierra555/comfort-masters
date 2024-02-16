const stepBtns = document.querySelectorAll('.js-step-btn');
const getEstimBtn = document.querySelector('.js-get-estim-btn');
const lastStep = document.querySelector('.js-last-step');
const calcBudgetBtn = document.querySelector('.js-calc-budget');

stepBtns.forEach(button => {
    button.addEventListener('click', handleStepButtonClick);
});
getEstimBtn.addEventListener('click', handleStepButtonClick);
calcBudgetBtn.addEventListener('click', handleCalcBudget);

function handleStepButtonClick(event) {
    const currentBtn = event.currentTarget;
    const currentStepNum = parseInt(currentBtn.getAttribute('data-step'));
    const currentStep = document.querySelector(`.js-step-${currentStepNum}`);

    if (event.target.classList.contains('js-skip-btn')) {
        currentStep.style.display = 'none';
        document.querySelector('.js-last-step').style.display = 'block';
        return;
    } 
    
    let targetStepNum;

    if (currentBtn.classList.contains('js-next-step-btn')) {
        targetStepNum = currentStepNum + 1;
    } else if (currentBtn.classList.contains('js-prev-step-btn')) {
        targetStepNum = currentStepNum - 1;
    }

    const targetStep = document.querySelector(`.js-step-${targetStepNum}`);
    const progressBar = targetStep.querySelector('.js-progress-bar');
    const initialWidthMob = 45;
    const initialWidthDesk = 163;

    if (currentStep) {
        currentStep.style.display = 'none';
    }

    if (targetStep) {
        targetStep.style.display = 'block';
    }

    progressBar.style.width = `${initialWidthMob * targetStepNum}px`;

    if (window.innerWidth >= 768) {
        progressBar.style.width = `${initialWidthDesk * targetStepNum}px`;
    }
}

function handleCalcBudget() {
    const selectedSpaces = document.querySelectorAll('.js-spaces-list li');
    const range = document.querySelector('.js-budget-value');
    const minVal = document.querySelector('.js-calc-min-value');
    const maxVal = document.querySelector('.js-calc-max-value');

    calculateBudgetRandge(selectedSpaces, range, minVal, maxVal);
}