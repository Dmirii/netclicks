
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
searchFormInput = document.querySelector('.search__form-input'),
preloader = document.querySelector('.preloader'),
dropdown = document.querySelectorAll('.dropdown'),
tvShowsHead = document.querySelector('.tv-shows__head'),
posterWrapper = document.querySelector('.poster__wrapper'),
modalContent = document.querySelector('.modal__content'),
pagination = document.querySelector('.pagination');

const loading = document.createElement('div');
      loading.className = 'loading';

const DBServise = class {

    // use async/await
      getData = async(url) =>{
        tvShows.append(loading);
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

      getSearchResuit = query => { 
          this.tmp =`${SERVER}/search/tv?api_key=${API_KEY}&query=${query}&language=ru-RU`;
          return this.getData(this.tmp)};

      getNextPage = page => {
          return this.getData(this.tmp + '&page=' + page);
      }
      

      getTvShow = id =>this
      .getData(SERVER + '/tv/' + id +'?api_key='+ API_KEY+ '&language=ru-RU');

      getTopRated = () => this.getData(`${SERVER}/tv/top_rated?api_key=${API_KEY}&language=ru-RU`);
    
      getPopular = () => this.getData(`${SERVER}/tv/popular?api_key=${API_KEY}&language=ru-RU`);

      getToday = () => this.getData(`${SERVER}/tv/airing_today?api_key=${API_KEY}&language=ru-RU`);

      getWeek = () => this.getData(`${SERVER}/tv/on_the_air?api_key=${API_KEY}&language=ru-RU`);

    
      

}

const dbServise = new DBServise();

 // fill the TvCard from Server
 const renderCard = (response,target) => {
     tvShowsList.textContent ='';
     console.log(response);

     if(!response.total_results){
         loading.remove();
         tvShowsHead.textContent = "По вашему запросу ничего не найдено";
         tvShowsHead.style.cssText = 'color:red;';
         return;
     };
     tvShowsHead.textContent = target ? target.textContent : "Результат поиска";
     tvShowsHead.style.cssText = '';
   

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
     pagination.textContent='';
     if (!target && response.total_pages > 1){
        
         for (let i =1; i <= response.total_pages; i++ ){
            pagination.innerHTML += `<li> <a href="#" class= "pages" > ${i} </a> </li>` 
         }
     }
 }

 searchForm.addEventListener('submit', event => {
     event.preventDefault();
  
     const value = searchFormInput.value.trim();// del spaces in the query
     if(value){
 
    
     dbServise.getSearchResuit(value).then(renderCard);
  
     }
     searchFormInput.value = '';


 });

// {
//     tvShows.append(loading);    
//     dbServise.getTopRated().then(renderCard);
//     tvShowsHead.textContent = "Новинки DC";

// }



// hmenu open

const closeDropDown = () => {
    dropdown.forEach(item => {

        item.classList.remove('active');

    })
}

hamburger.addEventListener('click', () =>{
    leftmenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
    closeDropDown();
});


document.addEventListener('click', event => {

    const target = event.target;
    if (!target.closest('.left-menu')){
        leftmenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
        closeDropDown();
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

    if(target.closest('#top-rated')){

        dbServise.getTopRated().then((response)  => renderCard(response,target));
    }
    if(target.closest('#popular')){
       
        dbServise.getPopular().then((response)  => renderCard(response,target));        
    }
    if(target.closest('#week')){

        dbServise.getWeek().then((response)  => renderCard(response,target));  
    }
    if(target.closest('#today')){

        dbServise.getToday().then((response)  => renderCard(response,target));          
    }
    if(target.closest('#search')){
       tvShowsList.textContent = '';
       tvShowsHead.textContent ='';
       //tvShowsList.style.focuse
    }

});



// open modal window

tvShowsList.addEventListener('click', () =>{

   const target = event.target;
   const card = target.closest('.tv-card');

   if (card) {
    
    preloader.style.display = "block";

    dbServise.getTvShow(card.id)
        .then(response => {
            if(response.poster_path){
                tvCardImg.src = IMG_URL + response.poster_path;
                tvCardImg.alt = response.name;
                posterWrapper.style.display= '';
                modalContent.style.paddingLeft = '';
             } else{
                posterWrapper.style.display = 'none';
                modalContent.style.paddingLeft = '20px';
             }
            
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
        .finally( () => {
            preloader.style.display = "none";
            loading.remove();
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

// chg card Img
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
tvShowsList.addEventListener('mouseout', changeImg);

pagination.addEventListener('click', () => {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains('pages')){
        dbServise.getNextPage(target.textContent).then(renderCard)
    }

});


