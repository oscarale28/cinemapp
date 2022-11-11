// Evento cuando carga la página, así se logran detectar los panel-trends impresos con JS
window.addEventListener('load', function () {
    // Animación en hover de paneles de la seccion de tendencias
    const panels = document.querySelectorAll(".panel-trends");
    // Setear active de inicio el primer panel
    panels[0].classList.add("active");

    panels.forEach((panel) => {
        // Cuando se haga hover, primero se ejecuta la función de remove y luego se vuelve a añadir la clase al panel correspondiente
        panel.addEventListener("mouseover", () => {
            removeActiveClass();
            panel.classList.add("active");
        })
    });

    // Función para eliminar la clase "active" de todos los paneles
    const removeActiveClass = () => {
        panels.forEach((panel) => {
            panel.classList.remove("active");
        });
    };

});

// Utilidades TMDB
const API_KEY = '4318cb1e5ee94083d129fcddc1687c49';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGES = `https://image.tmdb.org/t/p/w1280`
const TOP_MOVIES_URL = BASE_URL + `movie/top_rated?api_key=${API_KEY}&language=es-ES&sort_by=vote_average`;
const TRENDING_URL = BASE_URL + `movie/popular?api_key=${API_KEY}&language=es-ES`;

// Contenedores para mostrar películas
const TOP_MOVIES_CONTAINER = document.getElementById('top-movies-row');
const TRENDING_CONTAINER = document.getElementById('trending-container');

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Se obtienen los datos de las películas en tendencia
getTrendingMovies()
async function getTrendingMovies() {
    const resp = await fetch(TRENDING_URL);
    const respData = await resp.json()
    return respData.results
}

// Se imprimen los datos necesarios de las películas en el grid
printTrendingMovies()
async function printTrendingMovies() {

    const data = await getTrendingMovies();

    TRENDING_CONTAINER.innerHTML = data.slice(0, 5).map(movie => {
        return `
        <div class="panel-trends">
            <p class="fw-bold fs-2">${movie.original_title}</p>
            <a href="details.html?id=${movie.id}"><img src="${IMAGES + movie.poster_path}" alt="poster-pelicula"></a>
        </div>
        `
    }).join('')
}

// Se obtienen los datos de las películas mejor valoradas
getTopMovies()
async function getTopMovies() {
    const resp = await fetch(TOP_MOVIES_URL);
    const respData = await resp.json()
    return respData.results
}

// Se imprimen los datos necesarios de las películas en el grid
printTopMovies()
async function printTopMovies() {

    const data = await getTopMovies()

    TOP_MOVIES_CONTAINER.innerHTML = data.slice(0, 10).map(movie => {
        return `
        <div class="col-xxl-3 col-xl-4 col-md-6">
        <div class="movie-card" data-id="${movie.id}">
            <a href="details.html?id=${movie.id}"><img src="${IMAGES + movie.poster_path}" alt="poster-pelicula"></a>

            <div class="movie-info p-4">
                <h1 class="title m-0 p-2">${movie.title}</h1>
                <span
                    class="movie-rating-badge position-absolute top-0 end-0 translate-middle p-3 rounded-circle">
                    <span class="movie-rating">${movie.vote_average}</span>
                </span>
            </div>

        </div>
    </div>
        `
    }).join('')
}

// Función para obtener las pelícuals que coincidan con el término de búsqueda
async function getMoviesSearch(search_term) {
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search_term}&language=es-ES`)
    const respData = await resp.json()
    return respData.results
}

// Evento que se ejecuta cuando se presiona enter en el input de búsqueda. Valida si el input está vacío o no.
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = searchInput.value;
    searchTerm ? printSearchedMovies() : printTopMovies();
});

// Se imprimen las películas según la búsqueda
async function printSearchedMovies() {
    const data = await getMoviesSearch(searchInput.value)

    TOP_MOVIES_CONTAINER.innerHTML = data.slice(0, 10).map(movie => {
        return `
        <div class="col-xxl-3 col-xl-4 col-md-6">
        <div class="movie-card" data-id="${movie.id}">
            <a href="details.html?id=${movie.id}"><img src="${IMAGES + movie.poster_path}" alt="poster-pelicula"></a>

            <div class="movie-info p-4">
                <h1 class="title m-0 p-2">${movie.title}</h1>
                <span
                    class="movie-rating-badge position-absolute top-0 end-0 translate-middle p-3 rounded-circle">
                    <span class="movie-rating">${movie.vote_average}</span>
                </span>
            </div>

        </div>
    </div>
        `
    }).join('')
}

// Barra de búsqueda en menú de películas

const searchIcon = document.querySelector('.bi-search');
const search = document.querySelector('.search');

searchIcon.onclick = function () {
    search.classList.toggle('active');
}