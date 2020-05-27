
// 
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const leftmenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowsList = document.querySelector('.tv-shows__list');
modal = document.querySelector('.modal');


const DBServise = class {

    // use async/await
      getData = async(url) =>{
          const res = await fetch(url);

          if(res.ok){// geting OK
              return res.json();
          } else {
            throw new Error(`Ошибка доступа ${url}`);
          }
          
      }

      getTestData =  () =>{
          return  this.getData('test.json');
      }

}
 const renderCard = response => {

     console.log(response);
     tvShowsList.textContent ='';

     // use cycle 
     response.results.forEach(element => {

        console.log(element);
         
        // destruct card item
         const {backdrop_path : backdrop,
                        name : title ,
                 poster_path : poster ,
                vote_average : vote
             } = element;

             const posterImg = poster ? IMG_URL + poster : './img/no-poster.jpg';
             const backdropImg = ';'
             const voteEl = ';'

         const card = document.createElement('li');
         card.classList.add('tv-shows__item');
         card.innerHTML = `<a href="#" class="tv-card">
         <span class="tv-card__vote">${vote}</span>
         <img class="tv-card__img"
              src="${posterImg}"
              data-backdrop="${IMG_URL + backdrop}"
              alt="${title}">
         <h4 class="tv-card__head">${title}</h4>
        </a>`;
        tvShowsList.append(card);


         console.log(card);

         
     });
 }

new DBServise().getTestData().then(renderCard);




// hmenu open

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

// chg card
const changeImg = event => {    
      
   
     const card = event.target.closest('.tv-shows__item');

    if (card) {

        const img = card.querySelector('.tv-card__img');
       
       if( img.dataset.backdrop){
          
           [img.src, img.dataset.backdrop] = [ img.dataset.backdrop, img.src];
           
       }
       img.dataset.max='123';
     

    }

};

tvShowsList.addEventListener('mouseover',changeImg);
tvShowsList.addEventListener('mouseout', changeImg)


