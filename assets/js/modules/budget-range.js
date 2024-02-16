const spacesBudget = [
    roomReconstruction = {
        services: ['Attic', 'Basement', 'Bedroom', 'Foyer', 'Laundry', 'Living Space', 'Garage', 'Kitchen'],
        budget: {
            minValue: 5000,
            maxValue: 10000
        }
    },
    bathroomReconstruction = {
        services: ['Bathroom'],
        budget: {
            minValue: 7000,
            maxValue: 15000
        }
    },
    roomAdditions = {
        services: ['Room Additions'],
        budget: {
            minValue: 8000,
            maxValue: 20000
        }
    },
    roofReconstructions = {
        services: ['Roofing'],
        budget: {
            minValue: 500,
            maxValue: 30000
        }
    },
    stucco = {
        services: ['Stucco', 'Yard', 'House Exterior'],
        budget: {
            minValue: 1000,
            maxValue: 3000
        }
    },
    painting = {
        services: ['Painting'],
        budget: {
            minValue: 2000,
            maxValue: 5000
        }
    },
    wholeHouse = {
        services: ['Whole Home'],
        budget: {
            minValue: 20000,
            maxValue: 50000
        }
    },
    somethingElse = {
        services: ['Something Else'],
        budget: {
            minValue: 0,
            maxValue: 0
        }
    },
]

function calculateBudgetRandge(selectedSpaces, range, minVal, maxVal) {
   const min = Array.from(selectedSpaces).reduce((acc, currentVal) => {
    for(let i=0; i < spacesBudget.length; i++) {
        const servicesLowerCase = spacesBudget[i].services.map(service => service.toLowerCase());

        if (servicesLowerCase.includes(currentVal.dataset.space.toLowerCase())){
           return acc + spacesBudget[i].budget.minValue;
        } 
    }
        return acc;
    }, 0);

    const max = Array.from(selectedSpaces).reduce((acc, currentVal) => {
        for(let i=0; i < spacesBudget.length; i++) {
            const servicesLowerCase = spacesBudget[i].services.map(service => service.toLowerCase());

            if (servicesLowerCase.includes(currentVal.dataset.space.toLowerCase())){
                return acc + spacesBudget[i].budget.maxValue;
            } 
        }

        return acc;
    }, 0);

    minVal.textContent = `$ ${min}`;
    maxVal.textContent = `$ ${max}`;
    range.textContent = `${minVal.textContent} - ${maxVal.textContent}`;
}