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