
// 
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
       SERVER = 'https://api.themoviedb.org/3',
      API_KEY ='4265b75a9b2f0401612ea7be4cdfd747',


     leftmenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
  tvShowsList = document.querySelector('.tv-shows__list'),
        modal = document.querySelector('.modal'),
      tvShows = document.querySelector('.tv-shows'),
    tvCardImg = document.querySelector('.tv-card__img'),
   modalTitle = document.querySelector('.modal__title'),   
   genersList = document.querySelector('.genres-list'),
       rating = document.querySelector('.rating'),
  description = document.querySelector('.description'), 
  modalLink = document.querySelector('.modal__link'),
  searchForm = document.querySelector('.search__form'),
searchFormInput = document.querySelector('.search__form-input');

const loading = document.createElement('div');
      loading.className = 'loading';

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

      getTestCard = () => {
        return  this.getData('card.json');
      }

      getSearchResuit = query => this // serch func
      .getData(`${SERVER}/search/tv?api_key=${API_KEY}&query=${query}&language=ru-RU`);
      

      getTvShow = id =>this
      .getData(SERVER + '/tv/' + id +'?api_key='+ API_KEY+ '&language=ru-RU');
      

}

  console.log(new DBServise().getSearchResuit('няня'));
 
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
                 id,
                vote_average : vote
             } = element;

            // create the img way
             const posterImg = poster ? IMG_URL + poster : './img/no-poster.jpg';
             const backdropImg = backdrop ? IMG_URL + backdrop : '';
             const voteEl = vote ?  `<span class="tv-card__vote">${vote}</span>` : '';

         const card = document.createElement('li');
         card.idTv = id;// create new property
         card.classList.add('tv-shows__item');
         card.innerHTML = `<a href="#" id="${id}" class="tv-card">
         ${voteEl}
         <img class="tv-card__img"
              src="${posterImg}"
              data-backdrop="${backdropImg}"
              alt="${title}">
         <h4 class="tv-card__head">${title}</h4>
        </a>`;
        
    


        loading.remove();
        tvShowsList.append(card);

         console.log(card);

         
     });
 }

 searchForm.addEventListener('submit', event => {
     event.preventDefault();
     const value = searchFormInput.value.trim();// del space in the query
     if(value){
     tvShows.append(loading);
     new DBServise().getSearchResuit(value).then(renderCard);
     }
     searchFormInput.value = '';


 });
{
    tvShows.append(loading);
    new DBServise().getTestData().then(renderCard);
}



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
    event.preventDefault;
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

    new DBServise().getTvShow(card.id)
        .then(response => {
            tvCardImg.src = IMG_URL + response.poster_path;
            tvCardImg.alt = response.name;
            modalTitle.textContent = response.name;

            genersList.textContent = ``;
            for(const item of response.genres){
                genersList.innerHTML +=  `<li>${item.name}</li>` ;

            }
            rating.textContent = response.vote_average;
            description.textContent = response.overview;
            modalLink.href =  response.homepage;           
        })
        .then( () => {
            document.body.style.overflow = 'hiden';
            modal.classList.remove('hide');
        })

      
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


