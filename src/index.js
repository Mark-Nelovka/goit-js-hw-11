import axios from 'axios';
import Notiflix from 'notiflix';
import './sass/main.scss';

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input[name=searchQuery]'),
    button: document.querySelector('button'),
    divCard: document.querySelector('.gallery'),
  // loadMore: document.querySelector('.load-more'),
}




const KEY = '25039854-a3db15db04ef67fa10500b312'
const BASE_URL = 'https://pixabay.com/api/'
const PARAMS_SEARCH = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40'
refs.form.addEventListener('submit', fetchSubmit)
// refs.loadMore.addEventListener('click', clickLoadMore)
let gallerySet = new SimpleLightbox('.gallery a');
let counter = 1;
window.addEventListener('scroll', renderScroll)

function renderScroll(e) {
  e.preventDefault();
    let contentHeight = refs.divCard.offsetHeight;
      let yOffset = window.pageYOffset;
      let window_height = window.innerHeight;
      let y = yOffset + window_height;
      if (y >= contentHeight) {
        gallerySet.refresh();
        counter += 1;
        // console.log('WindowSubmit', counter)
       createRenderScroll(counter);
      }
}


async function fetchSubmit(e) {
  e.preventDefault();
  counter = 1;
    // disabledBtn();
  console.log('submit', counter)
  refs.divCard.innerHTML = '';
  
  createRender(counter);
  // console.log('downSubmit', counter)  
}




async function createRender(counter) {
  
  // console.log('reset', counter)
  await axios.get(`${BASE_URL}?key=${KEY}&q=${refs.input.value}&${PARAMS_SEARCH}&page=${counter}`)
    .then(result => {
      if (result.data.hits.length < 1) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        return;
      }
      //  enambeBtn();
      const Obj = result.data.hits;
      Notiflix.Notify.success(`Hooray! We found ${result.data.totalHits} images.`)
      reqListener(Obj);
    });
}

async function createRenderScroll(counter) {
// console.log('createScroll', counter)
  await axios.get(`${BASE_URL}?key=${KEY}&q=${refs.input.value}&${PARAMS_SEARCH}&page=${counter}`)
    .then(result => {
      if (result.data.hits.length < 1) {
        Notiflix.Notify.warning('Were sorry, but you have reached the end of search results.')
        return;
      }
      //  enambeBtn();
      const Obj = result.data.hits;
      reqListener(Obj);
            
    });
}
 function reqListener(Obj) {

  const addCards = Obj.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
      return `<div class="photo-card">
     <a class="gallery__item" href='${largeImageURL}'>
    <img class="gallery__image" width=500 height=300 src="${webformatURL}" alt="${tags}" loading="${downloads}"/>
    </a>
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
   
  gallerySet.refresh();
// enambeBtn();
    
}



// function clickLoadMore() {

//     axios.get(`${BASE_URL}?key=${KEY}&q=${refs.input.value}&${PARAMS_SEARCH}&page=${counter}`)
//         .then(result => {
//             if (result.data.hits.length < 1) {
//                 refs.loadMore.classList.add('invisible')
//                 Notiflix.Notify.warning('Were sorry, but you have reached the end of search results.')
//                 return;
//             }
//           disabledBtn();
//           setTimeout(() => {
//             reqListener(result.data.hits)
//           }, 250);
            
//         })
// }

// function disabledBtn() {
//     refs.loadMore.classList.remove('invisible')
//     refs.loadMore.textContent = 'Загружаем'
//     refs.loadMore.disabled = true;
// }
    
// function enambeBtn() {
//     refs.loadMore.textContent = 'Load more'
//     refs.loadMore.disabled = false;
// }

