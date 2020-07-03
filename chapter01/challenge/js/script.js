let allUsers = [];

let summary = null;

let foundUsers = null;
let foundStats = null;

let input = null;

let button = null;

searches = []

window.addEventListener('load', () => {    

    // prevent form submit
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
    });
    
    input = document.querySelector('#search-field');
    input.focus()

    summary = document.querySelector('#results-summary');

    foundUsers = document.querySelector('#found-list');
    foundStats = document.querySelector('#found-stats');

    button = document.querySelector('#search-button');
    clean = document.querySelector('#clean-button');


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
    const div = document.createElement("div");
    // foundUsers.appendChild(div);

    searches.forEach(user => {
        const { name, gender, age, picture } = user;
        
        const info = createInfo(name, gender[0].toUpperCase(), age);

        foundUsers.appendChild(info)

    })
}

function createInfo(name, gender, age) {
    const infoList = document.createElement('ul');
    const infoName = document.createElement('li');
    const infoGender = document.createElement('li');
    const infoAge = document.createElement('li');

    infoName.textContent = name;
    infoGender.textContent = gender;
    infoAge.textContent = age;

    infoList.appendChild(infoName);
    infoList.appendChild(infoGender);
    infoList.appendChild(infoAge);

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
    })
}

function handleStats() {
    
}