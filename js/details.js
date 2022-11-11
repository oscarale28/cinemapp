// Se busca y guarda el ID de la película seleccionada a través de la URL
let params = new URLSearchParams(location.search);
const movieID = parseInt(params.get('id'));

// Utilidades TMDB
const API_KEY = '4318cb1e5ee94083d129fcddc1687c49';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGES = `https://image.tmdb.org/t/p/w1280`
const MOVIE_DETAILS = BASE_URL + `movie/${movieID}?api_key=${API_KEY}`;
const TRENDING_URL = BASE_URL + `movie/popular?api_key=${API_KEY}&language=es-ES`;
console.log(MOVIE_DETAILS);

const DETAILS_CONTAINER = document.getElementById('movie-details');

// Se obtienen los detalles de la película
async function getMovieDetails() {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/436270?api_key=${API_KEY}`);
    const respData = await resp.json();
    return respData.results;
}

// Se imprimen los datos necesarios de nuestra película
async function printMovieDetails() {

    const movie = await getMovieDetails();
    console.log(movie);

    DETAILS_CONTAINER.innerHTML =  `
            <div class="col-xxl-3 col-xl-4">
                <div class="movie-card">
                    <img src="${IMAGES + movie.poster_path}" alt="poster-pelicula">
                </div>
            </div>

            <div class="col-xxl-9 col-xl-8">
                <article class="movie-info">
                    <h1 class="movie-year mb-5">Black Adam <span class="movie-year fw-normal">(2022)</span></h1>
                    <ul class="movie-genres mb-5">
                        <li>Acción</li>
                        <li>Fantasía</li>
                        <li>Ciencia Ficción</li>
                    </ul>
                    <h2 class="mb-3 fw-bold">Sinopsis</h2>
                    <p class="movie-overview">Casi 5000 años después de que los dioses egipcios le otorgaran los poderes
                        todopoderosos y lo encarcelaran con la misma rapidez, Black Adam es liberado de su tumba
                        terrenal, listo para desatar su forma única de justicia en el mundo moderno.</p>
                </article>
            </div>
         `
}

printMovieDetails()


// Funcionamiento de carrusel de reparto
var owl = $('.owl-carousel');

owl.owlCarousel({
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
});