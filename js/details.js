/*$(".owl-carousel ").load(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1280: {
                items: 3
            },
            1920: {
                items: 5
            }
        }
    })
});*/

// Se busca y guarda el ID de la película seleccionada a través de la URL
let params = new URLSearchParams(location.search);
const movieID = params.get('id');

// Utilidades TMDB
const API_KEY = '4318cb1e5ee94083d129fcddc1687c49';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGES = `https://image.tmdb.org/t/p/w1280`
const MOVIE_DETAILS = BASE_URL + `movie/${movieID}?api_key=${API_KEY}&language=es-ES`;
const MOVIE_CAST = BASE_URL + `movie/${movieID}/credits?api_key=${API_KEY}&language=es-ES`;
console.log(MOVIE_CAST);

const DETAILS_CONTAINER = document.getElementById('movie-details');
const CAST_CONTAINER = document.getElementById('cast-container');

// Se obtienen los detalles de la película
async function getMovieDetails() {
    const resp = await fetch(MOVIE_DETAILS);
    const respData = await resp.json();
    return respData;
}

printMovieDetails();
// Se imprimen los datos necesarios de nuestra película
async function printMovieDetails() {

    const movie = await getMovieDetails();
    let date = new Date(movie.release_date);
    let year = date.getFullYear();

    DETAILS_CONTAINER.innerHTML = `
            <div class="col-xxl-3 col-xl-4">
                <div class="movie-card">
                    <img src="${IMAGES + movie.poster_path}" alt="poster-pelicula">
                </div>
            </div>

            <div class="col-xxl-9 col-xl-8">
                <article class="movie-info">
                    <h1 class="movie-year mb-5">${movie.title} <span class="movie-year fw-normal"> (${year})</span></h1>
                    <ul class="movie-genres mb-5">
                        ${movie.genres.map(e => `<li>${e.name}</li>`).join('')}
                    </ul>
                    <h2 class="mb-3 fw-bold">Sinopsis</h2>
                    <p class="movie-overview">${movie.overview}</p>
                </article>
            </div>
         `
}

/*
// Se obtiene el reparto de la película
async function getMovieCast() {
    const resp = await fetch(MOVIE_CAST);
    const respData = await resp.json();
    return respData;
}


printMovieCast();
// Se imprime el reparto de la película
async function printMovieCast() {

    const data = await getMovieCast();
    const cast = data.cast;
    CAST_CONTAINER.innerHTML = cast.slice(0, 10).map(movie => {
        return `
        <div class="item bs-100 b-norepeat" style="background: url(${IMAGES + movie.profile_path})">
            <h4 class="fw-semibold">${movie.name}</h4>
        </div>
        `
    }).join('')
}*/

