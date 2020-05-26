

const leftmenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowsList = document.querySelector('.tv-shows__list');
modal = document.querySelector('.modal');

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

// open modal window

tvShowsList.addEventListener('click', () =>{

   const target = event.target;
   const card = target.closest('.tv-card');

   if (card) {
       document.body.style.overflow = 'hiden';
       modal.classList.remove('hide');
   }

});

// close modal 

modal.addEventListener('click', event =>{
    if(event.target.closest('.cross') || event.target.classList.contains('modal')){
        document.body.style.overflow ='';
        modal.classList.add('hide');
    }

});
