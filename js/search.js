const search = document.querySelector('.search-bar');
const navList = document.querySelector('.nav-list');
const more = document.querySelector('.more');
const input = document.querySelector('.header input');

search.addEventListener('click', () => {
    // Toggle the active class on the search bar and the nav list
    // and hide the more button and input field
    search.classList.toggle('active');
    navList.classList.toggle('hidden');
    more.classList.toggle('hidden');
    input.classList.toggle('hidden');
    input.focus();
})

