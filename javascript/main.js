const showMenu = (toggleId,navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

var rellax = new Rellax('.parallax');

gsap.from('.nav__logo', {opacity:0, duration: 3, delay: .5, y: 30, ease:'expo.out'});
gsap.from('.nav__toggle', {opacity:0, duration: 3, delay: .7, y: 30, ease:'expo.out'});
gsap.from('.nav__item', {opacity: 0, duration: 3, delay: .7, y: 35, ease:'expo.out', stagger: .2})
gsap.from('.home__title', {opacity:0, duration: 3, delay: 1.3, y: 35, ease:'expo.out'});
gsap.from('.home__scroll', {opacity:0, duration: 3, delay: 1.5, y: 25, ease:'expo.out'});

const sr = ScrollReveal({
    duration: 2500,
    reset: true
});

sr.reveal('.section',{origin: 'left',distance: '70px'}); 
sr.reveal('.section_skill',{origin: 'left',distance: '70px'}); 
sr.reveal('.video-container',{origin: 'bottom',distance: '70px'}); 
sr.reveal('.favourite-places',{origin: 'left',distance: '70px'}); 
sr.reveal('.section__img',{origin: 'left',distance: '90px',delay: 200}); 

document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#auto-type', {
        strings: ['Full Stack Web Developer', 'Computer Technician', 'Tech Enthusiast', 'System Administrator'],
        typeSpeed: 80,
        loop: true,
        backSpeed: 80,
    });
});