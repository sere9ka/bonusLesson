'use strict'

const select = document.querySelector('#film')

let selectArr = [];

// получение options для фильтра
const getFilter = (list) => {
    for (let index = 0; index < list.length; index++) {
        const item = list[index];
        const newOption = document.createElement('option');
        newOption.textContent = item
        newOption.value = +index + 1

        select.append(newOption)
    }
}

// получение списка для фильтра
const getFilterList = (filmList) => {
    let filmsList = []

    filmList.forEach(li => {
        filmsList.push(li.textContent)
    })

    let list = [...new Set(filmsList)]

    getFilter(list)
}

// попытка отрисовать всё из фильтра
const renderCard = (selectArr, cards = []) => {
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        card.style.display = 'none'
    }
    for (let i = 0; i < selectArr.length; i++) {
        const card = selectArr[i];
        card.style.display = 'block'
    }
}

const renderChar = (item) => {
    const main = document.querySelector('.main');
    const card = document.createElement('div')
    const headerCard = document.createElement('div')
    const cardImgBlock = document.createElement('div')
    const realName = document.createElement('strong')
    const status = document.createElement('span')
    const imgCard = document.createElement('img')
    const nameCard = document.createElement('h2')
    const allFilm = document.createElement('ul')
    const titleFilm = document.createElement('h3')

    let moviesArray = item.movies
    
    if (moviesArray) {
        for (let index = 0; index < moviesArray.length; index++) {
            const item = moviesArray[index];
            const film = document.createElement('li')
            if (moviesArray.length > 0) {
                film.textContent = item
                allFilm.append(film)    
            }
        }
    }  else {
        const film = document.createElement('li')
        film.textContent = 'this character has no movies'
        allFilm.append(film)  
    }
    
    card.classList.add('card')
    headerCard.classList.add('card-header')
    imgCard.classList.add('card-img')
    nameCard.classList.add('card-name')
    cardImgBlock.classList.add('card-img-block')
    status.classList.add('status')

    imgCard.src = `./${item.photo}`
    nameCard.textContent = `Name: ${item.name}`
    if (item.realName) {
        realName.textContent = `Real Name: ${item.realName}`
    } else {
        realName.textContent = 'Real Name: No name'
    }

    status.textContent = `Status: ${item.status}`
    if (item.status == 'deceased') {
        status.style.color = 'red'
    } else status.style.color = 'green'
    titleFilm.textContent = 'Список фильмов персонажа:'

    main.append(card)
    
    cardImgBlock.append(imgCard)
    headerCard.append(nameCard)
    headerCard.append(realName)
    headerCard.append(status)
    card.append(headerCard)
    card.append(cardImgBlock)

    card.append(titleFilm)
    card.append(allFilm)

    const cards = document.querySelectorAll('.card')

    renderCard(cards)
}

const render = (data) => {
    let filmList;
    data.forEach((item) => {
                renderChar(item)  
            }          
    );

    filmList = document.querySelectorAll('li');

    getFilterList(filmList)
}

const getData = () => {
    return fetch('../dbHeroes.json')
        .then(response => response.json())
        .then(data => {
            render(data)
        })
        .catch(() => console.log('база не загрузилась'));
};

getData()

select.addEventListener('change', () => {
    // получаем все карточки
    const cards = document.querySelectorAll('.card')
    
    // получили тест в выбранном селекте
    let selectValue = select.options[select.selectedIndex].textContent

    //  получаем отдельно все карточки
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        card.style.display = 'block'
        // получаем в каждой карточке список фильмов
        const filmsLi = card.querySelectorAll('li')
        for (let i = 0; i < filmsLi.length; i++) {
            const film = filmsLi[i].textContent;
            if (film === selectValue) {
                selectArr.push(card)
            }
            
        }

    }
    renderCard(selectArr, cards)
})


