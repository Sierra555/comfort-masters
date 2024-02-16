const spacesBudget = [
    {
        space: 'Room Reconstruction',
        services: ['Attic', 'Basement', 'Bedroom', 'Foyer', 'Laundry', 'Living Space', 'Garage', 'Kitchen'],
        budget: { minValue: 5000, maxValue: 10000 }
    },
    {
        space: 'Bathroom Reconstruction',
        services: ['Bathroom'],
        budget: { minValue: 7000, maxValue: 15000 }
    },
    {
        space: 'Room Additions',
        services: ['Room Additions'],
        budget: { minValue: 8000, maxValue: 20000 }
    },
    {
        space: 'Roof Reconstructions',
        services: ['Roofing'],
        budget: { minValue: 500, maxValue: 30000 }
    },
    {
        space: 'Stucco',
        services: ['Stucco', 'Yard', 'House Exterior'],
        budget: { minValue: 1000, maxValue: 3000 }
    },
    {
        space: 'Painting',
        services: ['Painting'],
        budget: { minValue: 2000, maxValue: 5000 }
    },
    {
        space: 'Whole House',
        services: ['Whole Home'],
        budget: { minValue: 20000, maxValue: 50000 }
    },
    {
        space: 'Something Else',
        services: ['Something Else'],
        budget: { minValue: 200, maxValue: 1000 }
    },
];

function calculateBudgetRange(selectedSpaces, range, minVal, maxVal) {
    const selectedSpacesLowerCase = Array.from(selectedSpaces).map(space => space.dataset.space.toLowerCase());

    const hasWholeHouseService = selectedSpacesLowerCase.some(space => spacesBudget.find(entry => entry.space === 'Whole House').services.includes(space));

    const calculateTotal = (key) => {
        if (hasWholeHouseService) {
            const wholeHouseBudget = spacesBudget.find(entry => entry.space === 'Whole House').budget[key];
            return wholeHouseBudget;
        }

        return selectedSpacesLowerCase.reduce((acc, currentVal) => {
            const spaceBudget = spacesBudget.find(entry => entry.services.some(service => service.toLowerCase() === currentVal));
            return acc + (spaceBudget ? spaceBudget.budget[key] : 0);
        }, 0);
    };

    const min = calculateTotal('minValue');
    const max = calculateTotal('maxValue');

    minVal.textContent = `$ ${min}`;
    maxVal.textContent = `$ ${max}`;
    range.textContent = `${minVal.textContent} - ${maxVal.textContent}`;
}
