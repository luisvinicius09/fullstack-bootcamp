let allUsers = [];

let summary = null;

let foundUsers = null;
let foundStats = null;

let input = null;

let button = null;

searches = []

const placeholder = 'Nothing to show here !'

window.addEventListener('load', () => {    

    // prevent form submit
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
    });
    
    input = document.querySelector('#searchField');
    input.focus()

    summary = document.querySelector('#results-summary');

    foundUsers = document.querySelector('#found-list');
    foundStats = document.querySelector('#foundStats');

    button = document.querySelector('#searchButton');
    clean = document.querySelector('#cleanButton');


    fetchUsers();
    captureInput();
    cleanInput();
})

async function fetchUsers() {
    const requisition = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await requisition.json();
    
    allUsers = json.results.map(user => {
        const { name, gender, dob, picture } = user;
        const fullName = `${name.first} ${name.last}`

        return {
            name: fullName,
            nameToLowerCase: fullName.toLowerCase(),
            gender,
            photo: picture.thumbnail,
            age: dob.age
        }
    });

    // Put all names in alphabetical order
    allUsers.sort((a, b) => {
        return a.name.localeCompare(b.name)
    });
    // render();
}

function render() {

    // foundUsers.appendChild(div);

    searches.forEach(user => {
        const { name, gender, age, photo } = user;
        
        const info = createInfo(name, photo, age);

        foundUsers.appendChild(info)

    })
    handleStats(searches);
}

function createInfo(name, photo, age) {
    const infoList = document.createElement('ul');

    const div = document.createElement("div");

    const infoName = document.createElement('li');
    const infoAge = document.createElement('li');
    const infoPhoto = document.createElement('img');

    infoName.textContent = name;
    infoAge.textContent = age;
    infoPhoto.setAttribute("src", photo);
    div.setAttribute("id", "info")

    infoList.appendChild(infoPhoto);
    div.appendChild(infoName);
    div.appendChild(infoAge);
    infoList.appendChild(div);

    return infoList;
}

// function handleTyping() {
//     input.addEventListener('keyup', (event) => {
//         const currentKey = event.key;

//         if (currentKey === 'Backspace') {
//             foundUsers.textContent = '';
//         }
//         if (currentKey !== 'Enter') {
//             return;
//         }
//         const filteredText = event.target.value;
        
//         if (filteredText.trim() !== '') {
//             foundUsers.textContent = '';
//             filterUsers(filteredText)
//         }
//         render();
//     })
// }

// function handleButton() {
//     button.addEventListener('click', () => {
//         console.log(currentKey);
//     })
// };

function filterUsers(filteredText) {
    const filteredUsers = allUsers.filter(user => {
        return user.nameToLowerCase.includes(filteredText);
    })
    searches = filteredUsers
}

function captureInput() {
    input.addEventListener('keyup', (event) => {
        let currentKey = event.key;
        let filteredText = event.target.value;

        handleTyping(currentKey, filteredText);
        handleButton(filteredText);
    })

}

function handleTyping(currentKey, filteredText) {
        if (currentKey === 'Backspace') {
            foundUsers.textContent = '';
        }
        if (currentKey !== 'Enter') {
            return;
        }
        
        if (filteredText.trim() !== '') {
            foundUsers.textContent = '';
            filterUsers(filteredText)
        }
        render();
    }


function handleButton(filteredText) {
    button.addEventListener('click', () => {
        foundUsers.textContent = '';
        filterUsers(filteredText);
        render();
    })
}

function cleanInput() {
    clean.addEventListener('click', () => {
        input.value = '';
        foundUsers.textContent= '';
        foundStats.textContent = ''
    })
}

function handleStats(searches) {
    const countMale = searches.filter(user => user.gender === 'male').length;
    const countFemale = searches.filter(user => user.gender === 'female').length;

    const sumAges = searches.reduce((accumulator, current) => {
        return accumulator + current.age
    }, 0);
    const averageAges = sumAges / searches.length || 0;

    foundStats.textContent = ''

    const info1 = document.createElement('p');
    const info2 = document.createElement('p');
    const info3 = document.createElement('p');
    const info4 = document.createElement('p');
    
    info1.textContent = `Male count: ${countMale}`;
    info2.textContent = `Female count: ${countFemale}`;
    info3.textContent = `Sum of ages: ${sumAges}`;
    info4.textContent = `Average ages: ${averageAges.toFixed()}`;

    foundStats.appendChild(info1);
    foundStats.appendChild(info2);
    foundStats.appendChild(info3);
    foundStats.appendChild(info4);

}