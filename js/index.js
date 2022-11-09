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