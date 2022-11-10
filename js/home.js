// Animación en hover de paneles de la seccion de tendencias
const panels = document.querySelectorAll(".panel-trends");

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

// Funcionamiento de carrusel de géneros
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

// Barra de búsqueda en menú de películas

const searchIcon = document.querySelector('.bi-search');
const search = document.querySelector('.search');

searchIcon.onclick = function() {
    search.classList.toggle('active');
}