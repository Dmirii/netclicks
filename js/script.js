

const leftmenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () =>{
    leftmenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', event => {

    const target = event.target;
    if (!target.closest('.left-menu')){
        leftmenu.classList.remove('openMenu');
        hamburger.classList.remove('open');

    }

});

leftmenu.addEventListener('click', event => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if(dropdown){
        dropdown.classList.toggle('active');
        leftmenu.classList.add('openMenu');
        hamburger.classList.add('open')
    }

});

