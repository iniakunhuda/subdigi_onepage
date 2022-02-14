/**
   * Easy selector helper function
   */
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
        if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
        selectEl.addEventListener(type, listener)
        }
    }
}

const loadNavbarToggle = () => {
    let navbarToggle = document.querySelectorAll('[data-collapse-toggle]');

    navbarToggle.forEach((el) => {
        el.addEventListener('click', function(){
            let target_name = el.getAttribute('data-collapse-toggle');
            let target = document.getElementById(target_name);
            console.log("TARGET", target, target_name);
            target.classList.toggle('hidden');
        });
    });
}

const navbarChangeColorWhenScroll = () => {
    let logo = document.getElementById('logo-website');
    let navbar = document.getElementById('navbar');
    
    document.addEventListener('scroll', function() {
        let scrollpos = window.scrollY;

        if (scrollpos > 10) {
            navbar.classList.add('navbar--scroll');
            // logo.getElementsByClassName('logo-white')[0].classList.add('hidden');
            // logo.getElementsByClassName('logo-default')[0].classList.remove('hidden');
        } else { 
            navbar.classList.remove('navbar--scroll');
            // logo.getElementsByClassName('logo-white')[0].classList.remove('hidden');
            // logo.getElementsByClassName('logo-default')[0].classList.add('hidden');
        }

    });
}

const loadSplide = () => {
    var splide = new Splide( '.splide', {
        type: 'loop',
        autoPlay: true,
        perPage: 1
    });
    splide.mount();
}

const loadPortofolioFilter = () => {
    let elem = document.querySelector('.portfolio-container');
    let filters = document.querySelectorAll('.portfolio-filter');
    let items = document.querySelector('.portfolio-item');

    // filter items when filter link is clicked
    filters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            // get filter value
            let filterValue = e.target.getAttribute('data-target');
            if(filterValue == '*') {
                resetFilterItems();
            } else {
                filterItems(filterValue);
            }

            // add active class to the clicked filter
            filters.forEach(filter => filter.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // filter items by filter value
    function resetFilterItems() {
        let items = elem.querySelectorAll('.portfolio-item');
        items.forEach((item) => {
            item.classList.remove('hidden');
        });
    }

    // filter items by filter value
    function filterItems(filterValue) {
        // get all items
        let items = elem.querySelectorAll('.portfolio-item');
        items.forEach((item) => {
            if(!item.getAttribute('data-filter').includes(filterValue)) {
                item.classList.add('hidden');
            } else {
                item.classList.remove('hidden');
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadSplide();
    loadPortofolioFilter();
    loadNavbarToggle();
    navbarChangeColorWhenScroll();
});
