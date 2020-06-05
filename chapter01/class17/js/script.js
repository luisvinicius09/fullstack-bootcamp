let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationCount = 0
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
    tabCountries = document.querySelector('#tabCountries');
    tabFavorites = document.querySelector('#tabFavorites')

    countCountries = document.querySelector('#countCountries');
    countFavorites = document.querySelector('#countFavorites');

    totalPopulationCount = document.querySelector('#totalPopulationCount');
    totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

    numberFormat = Intl.NumberFormat('pt-BR');

    fetchCountries();
})

async function fetchCountries() {
    const requisition = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await requisition.json();

    allCountries = json.map(country => {
        const { numericCode, translations, population, flag } = country;
    
        return {
            id: numericCode,
            name: translations.pt,
            population,
            population: population,
            flag
        };
    });
    render();
}

function render() {
    allCountries.sort((a, b) => {
        return a.name.localeCompare(b.name);
    })
    favCountries.sort((a, b) => {
        return a.name.localeCompare(b.name);
    })
    renderCountryList(allCountries, '+');
    renderFavorites(favCountries, '-');
    renderSummary();
    handleButtons();
};

function renderCountryList(allCountries, text) {
    tabCountries.textContent = '';
    allCountries.forEach(country => {
        const {name, flag, id, population } = country;

        const info = createInfo(name, population);
        const flagImg = createFlag(flag, name);
        const button = createButton(id, text);

        const countryDiv = document.createElement('div');
        countryDiv.classList = 'country shadow-lg';
        countryDiv.appendChild(info);
        countryDiv.appendChild(flagImg);
        countryDiv.appendChild(button);

        tabCountries.appendChild(countryDiv);
        
    })
};

function renderFavorites (favCountries, text) {
    tabFavorites.textContent = '';
    favCountries.forEach(country => {
        const {name, flag, id, population } = country;

        const info = createInfo(name, population);
        const flagImg = createFlag(flag, name);
        const button = createButton(id, text);

        const favoriteDiv = document.createElement('div');
        favoriteDiv.classList = 'country shadow-lg';
        favoriteDiv.appendChild(info);
        favoriteDiv.appendChild(flagImg);
        favoriteDiv.appendChild(button);  

        tabFavorites.appendChild(favoriteDiv);
        
    })
};

function renderSummary () {
    countCountries.textContent = allCountries.length
    countFavorites.textContent = favCountries.length

    const totalPopulation = allCountries.reduce((acummulator, current) => {
        return acummulator + current.population;
    }, 0);
    
    totalPopulationCount.textContent = formatNumber(totalPopulation);

    const totalFavorites = favCountries.reduce((acummulator, current) => {
        return acummulator + current.population;
    }, 0);
    
    totalPopulationFavorites.textContent = formatNumber(totalFavorites);
};


function createButton(id, text) {
    const buttonDiv = document.createElement('div');
    const buttonLink = document.createElement('a');
    const image = document.createElement('i');

    image.classList = 'tiny material-icons';

    buttonLink.id = id;
    if (text === '+') {
        buttonLink.classList = 'btn shadow-sm bg-success';
        image.textContent = 'add';
        buttonLink.appendChild(image);
    } else if (text === '-') {
        buttonLink.classList = 'btn shadow-sm';
        image.textContent = 'delete_forever';
        buttonLink.appendChild(image);
    }
    buttonDiv.appendChild(buttonLink);
    return buttonDiv;
};

function createInfo(name, population) {
    //create elements
    const infoDiv = document.createElement('div');
    const infoList = document.createElement('ul');
    const infoName = document.createElement('li');
    const infoPopulation = document.createElement('li');
    
    infoName.textContent = name;
    infoPopulation.textContent = population;
    
    //append to documents
    infoList.appendChild(infoName);
    infoList.appendChild(infoPopulation);
    infoDiv.appendChild(infoList);
    return infoDiv;
};

function createFlag(url, alt) {
    //create elements
    const flagDiv = document.createElement('div');
    const flagImg = document.createElement('img');

    flagImg.src = url;
    flagImg.alt = alt;

    //append to documents
    flagDiv.appendChild(flagImg);
    return flagDiv
};

function handleButtons() {
    const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
    const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));
    
    countryButtons.forEach(button => {
        button.addEventListener('click', () => addToFavorites(button.id))
    })

    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => removeFromFavorites(button.id))
    })

};

function addToFavorites(id) {
    const countryToAdd = allCountries.find(country => country.id === id);
    // console.log(id)
    favCountries = [ ...favCountries, countryToAdd];

    allCountries = allCountries.filter(country => country.id !== id); // i dont how this work
    // console.log(allCountries)
    render()
};

function removeFromFavorites(id) {
    const countryToRemove = favCountries.find(country => country.id === id);

    allCountries = [...allCountries, countryToRemove];

    favCountries = favCountries.filter(country => country.id !== id)
    // console.log(allCountries)
    render();
};


function formatNumber(number) {
    return numberFormat.format(number);
};