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


let counter = 1;
function fetchSubmit(e) {
  e.preventDefault();
    refs.divCard.innerHTML = '';
    // disabledBtn();
  const searchName = e.target.elements.searchQuery.value
  renderQwe(searchName);
  window.addEventListener('scroll', () => {
    let contentHeight = refs.divCard.offsetHeight; 
let Offset = window.pageYOffset;
let window_height = window.innerHeight;
let y = Offset + window_height;
      if (y >= contentHeight) {
        counter += 1;
        createRender(searchName, counter);
  }
  })
}




async function renderQwe(searchName) {
  console.log(counter);
   await axios.get(`${BASE_URL}?key=${KEY}&q=${searchName}&${PARAMS_SEARCH}&page=1`)
     .then(result => {
        if (result.data.hits.length < 1) {
        Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
        return;
        }
        //  enambeBtn();
       const Obj = result.data.hits;
        Notiflix.Notify.success(`Hooray! We found ${result.data.totalHits} images.`)
         reqListener(Obj);
            
        });
}

async function createRender(searchName, counter) {
  console.log(counter);
   await axios.get(`${BASE_URL}?key=${KEY}&q=${searchName}&${PARAMS_SEARCH}&page=${counter}`)
     .then(result => {
        if (result.data.hits.length < 1) {
        Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
        return;
        }
        //  enambeBtn();
            const Obj = result.data.hits;
         reqListener(Obj);
            
        });
}
async function reqListener(Obj) {
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
  // enambeBtn();
  let gallerySet = new SimpleLightbox('.gallery a');
    gallerySet.refresh();
}



// function clickLoadMore(e) {

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

