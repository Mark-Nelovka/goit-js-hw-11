import axios from 'axios';
import Notiflix from 'notiflix';
import './sass/main.scss';
const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input[name=searchQuery]'),
    button: document.querySelector('button'),
    divCard: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more')
}

// let gallerySet = new SimpleLightbox('.gallery a', { captionPosition: "bottom", captionDelay: 250 });
// gallerySet.refresh();
const KEY = '25039854-a3db15db04ef67fa10500b312'
const BASE_URL = 'https://pixabay.com/api/'
const PARAMS_SEARCH = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40'
refs.form.addEventListener('submit', fetchSubmit)
refs.loadMore.addEventListener('click', clickLoadMore)



function fetchSubmit(e) {
    e.preventDefault();
    refs.divCard.innerHTML = '';
    disabledBtn();
  const searchName = e.target.elements.searchQuery.value
  // gallerySet.refresh();
  createRender(searchName);
    
}

async function createRender(searchName) {
   await axios.get(`${BASE_URL}?key=${KEY}&q=${searchName}&${PARAMS_SEARCH}&page=1`)
       .then(result => {
        if (result.data.hits.length < 1) {
        Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
        return;
        }
         enambeBtn();
            const Obj = result.data.hits;
            Notiflix.Notify.success(`Hooray! We found ${result.data.totalHits} images.`)
         reqListener(Obj);
            
        });
}
// `<a class="gallery__item" href='${webformatURL}'></a>
async function reqListener (Obj) {
    const addCards = Obj.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
      return `<div class="photo-card">
       
  <img width=500 height=300 src="${webformatURL}" title='${tags}' alt="${tags}" loading="${largeImageURL}"/>
  
  <div class="info">
    <p class="info-item">
      <b>Likes<br>
      ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views<br>
      ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments<br>
      ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads<br>
      ${downloads}</b>
    </p>
  </div>
</div>`
     })
    refs.divCard.insertAdjacentHTML('beforeend', addCards.join(''));
    enambeBtn();
}


let counter = 1;
function clickLoadMore(e) {
    counter += 1;
    axios.get(`${BASE_URL}?key=${KEY}&q=${refs.input.value}&${PARAMS_SEARCH}&page=${counter}`)
        .then(result => {
            if (result.data.hits.length < 1) {
                refs.loadMore.classList.add('invisible')
                Notiflix.Notify.warning('Were sorry, but you have reached the end of search results.')
                return;
            }
          // gallerySet.refresh();
          disabledBtn();
          setTimeout(() => {
            reqListener(result.data.hits)
          }, 1000);
            
        })
}

function disabledBtn() {
    refs.loadMore.classList.remove('invisible')
    refs.loadMore.textContent = 'Загружаем'
    refs.loadMore.disabled = true;
}
    
function enambeBtn() {
    refs.loadMore.textContent = 'Load more'
    refs.loadMore.disabled = false;
}



// gallerySet.on( 'show.simplelightbox', function () {
    
//   return;
// } );

