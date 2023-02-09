document.addEventListener('DOMContentLoaded', fetchDogs)

function fetchDogs() {
    fetch('http://localhost:3000/pups')
    .then((resp) => resp.json())
    .then((dogs) => {
        renderName(dogs)
    })
}

function renderName(dogs) {
    dogs.forEach(dog => {
    const dogBar = document.querySelector('#dog-bar')
    const span = document.createElement('span')
    // const dogID = dog.id
    span.textContent = `${dog.name}`
    dogBar.appendChild(span)
    span.addEventListener('click', (event) => {
        renderInfo(event.target.textContent, dog)
        })
    })
    // renderInfo(dogs)
}

function renderInfo(dogName, dog) {
    const dogInfo = document.querySelector('#dog-info')
    const dogStatus = dog.isGoodDog === true ? 'Good Dog!' : 'Bad Dog!'
    dogInfo.innerHTML = `
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button id='btn'>${dogStatus}</button>`
    dogQuality(dog)
}

function dogQuality(dog) {
    const btn = document.querySelector('#btn')
    btn.addEventListener('click', () => {
        btn.textContent = btn.textContent === 'Good Dog!' ? 'Bad Dog!' : 'Good Dog!'
        const dogStatus = btn.textContent === 'Good Dog!' ? true : false
        dog.isGoodDog = dogStatus
        console.log(dogStatus)
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                isGoodDog: dogStatus
            }),
        }) 
        .then((resp) => resp.json())
        .then((data) => console.log('hi'))
        .catch((error) => alert(error.message)) 
    })
}
