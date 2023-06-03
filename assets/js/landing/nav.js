/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const miniNav = document.querySelector("nav");
const miniNav_list = miniNav.querySelectorAll("li.navlist");
const miniNav_point = miniNav.querySelector(".point-nav");
const header = document.querySelector("header");
const section_list = document.querySelectorAll("section");
const footer = document.querySelector("section");

const changeNavPoint = () => {
    for (let x = 0; x < section_list.length; x++) {
        const list = section_list[x].offsetTop;
        if((scrollY >= (list - 150))){
            clearClass(miniNav_list, "active");
            miniNav_point.setAttribute("style", `transform: translateX(${x * 60}px)`);
            miniNav_list[x].classList.add("active");
        }
    }
}
window.addEventListener("load", () => {
    changeNavPoint();
});
window.addEventListener("scroll", () => {
    changeNavPoint()
});

// Scrollreveal config

const defaultOption = {
    distance: '100px',
    duration: 1000,
    delay: 300,
    scale: 1.06,
    easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
}
const slideup = {
    distance: defaultOption.distance,
    origin: 'top',
    duration: defaultOption.duration,
    opacity: 0,
    delay: defaultOption.delay,
    easing: defaultOption.easing,
    scale: defaultOption.scale,
    reset: true
}
const slidedown = {
    distance : defaultOption.distance,
    origin : 'bottom',
    duration: defaultOption.duration,
    opacity: 0,
    delay: defaultOption.delay,
    easing: defaultOption.easing,
    scale: defaultOption.scale,
    reset: true
}
const slideleft = {
    distance: defaultOption.distance,
    origin: 'left',
    duration: defaultOption.duration,
    opacity: 0,
    delay: defaultOption.delay,
    easing: defaultOption.easing,
    scale: defaultOption.scale,
    reset: true
}
const slideright = {
    distance : defaultOption.distance,
    origin : 'right',
    duration: defaultOption.duration,
    opacity: 0,
    delay: defaultOption.delay,
    easing: defaultOption.easing,
    scale: defaultOption.scale,
    reset: true
}

ScrollReveal().reveal('.slideup', slideup );
ScrollReveal().reveal('.slidedown', slidedown );
ScrollReveal().reveal('.slideleft', slideleft );
ScrollReveal().reveal('.slideright', slideright );
