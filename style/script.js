const KEY = 'd564c001-4ae1-43db-9d4e-92d713c3c305'
const API = 'https://kinopoiskapiunofficial.tech/'
const ALL_FILMS = API + 'api/v2.2/films/'
const FILTER_BY_NAME = API + 'api/v2.1/films/search-by-keyword?keyword='
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"
const DETAIL_FILM = API + 'api/v2.2/films/'

const form = document.querySelector('form')
const input = document.getElementById('inp')
const output = document.querySelector('#output')
const pop = document.querySelector('#pop')

const getFilms = async () => {
    const request = await fetch(ALL_FILMS, {
        method: 'GET',
        headers: {
            'X-API-KEY': KEY,
            'Content-Type': 'application/json',
        },
    })
    const response = await request.json()
    renderFilms(response.items);
    // console.log(response.items);
}

const getByName = async () => {
    const request = await fetch(FILTER_BY_NAME + input.value, {
        method: 'GET',
        headers: {
            'X-API-KEY': KEY,
            'Content-Type': 'application/json',
        },
    })
    const response = await request.json()
    renderFilms(response.films);
    // console.log(response.films);

}
const getById = async (id) => {
    const request = await fetch(DETAIL_FILM + id, {
        method: 'GET',
        headers: {
            'X-API-KEY': KEY,
            'Content-Type': 'application/json',
        },
    })
    const response = await request.json()
    renderDetail(response);

  
    // renderFilms(response.items);
}

const getPopular = async()=>{
    const request = await fetch(API_URL_POPULAR , {
        method: 'GET',
        headers: {
            'X-API-KEY': KEY,
            'Content-Type': 'application/json',
        },
    })
    const response = await request.json()
    console.log();(response);
}
getPopular()


const renderDetail = (film) => {
    output.innerHTML = ''
    console.log(film);
    const card = document.createElement('div')
    const poster = document.createElement('img')
    const title = document.createElement('h2')
    const description = document.createElement('p')
    poster.src = film.posterUrl
    title.textContent = film.nameOriginal || film.nameRu
    description.textContent = film.description

    card.append(poster, title, description)
    output.append(card)
}


// btn.addEvenListene('click',()=>{

// })
const renderFilms = (movies) => {
    output.innerHTML = ''
    movies.map(el => {
        // console.log(el);
        const card = document.createElement('div')
        const poster = document.createElement('img')
        const title = document.createElement('h2')
        poster.src = el.posterUrl
        poster.style.width = '80%'

        poster.style.height = '300px'


        title.textContent = el.nameOriginal || el.nameRu
        title.style.width = '200px'

        card.addEventListener('click', () => {
            // console.log(el.kinopoiskId);
            getById(el.kinopoiskId || el.filmId)
        })
        
        // pop.addEventListener('click',()=>{
        //     console.log(el.pagesCount.films);
        // })



        card.append(poster, title)
        output.append(card)
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    getByName()
})

getFilms()



    // .then(res => res.json())
    // .then(json => console.log(json))
    // .catch(err => console.log(err))