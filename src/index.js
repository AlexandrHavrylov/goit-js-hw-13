import './sass/main.scss';
import galleryImagesTmp from './templates/gallaryImages.hbs'
import { fetchImg } from './js/fetch-api';
import { refs } from './js/get-refs';
import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";
import '../node_modules/simplelightbox/src/simple-lightbox.scss'


let page
let imagesToFind;



// Запрос данных + создание разметки

refs().searchBtn.addEventListener('click', onSearchBtnClick)

function onSearchBtnClick(e) {
    page = 1
    e.preventDefault()
    refs().gallery.innerHTML = ''
    imagesToFind && renderMarkup()
     
}

// Получаем значение для поиска
refs().searchForm.addEventListener('input', onSearchFormInput)

function onSearchFormInput() {
     imagesToFind = refs().serchQuery.value.trim()
    return imagesToFind
}

// Получаем разметку галлереи

function getGalleryMarkup(img) {
    const markup = galleryImagesTmp(img)
    refs().gallery.insertAdjacentHTML('beforeend', markup)
}

async function renderMarkup() {

    try {
        const images = await fetchImg(imagesToFind, page)

        if (images.hits.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            return
        }
   
        //Каким-то другим образом можно органичить нотификашку, что бы показывала только при 1м запросе?
        if (page === 1) {
             Notify.info(`Hooray! We found ${images.totalHits} images.`)      
        }
        if (refs().allImages.length >= images.totalHits) {
            Notify.failure(`We're sorry, but you've reached the end of search results.`)
            return
        }
       
        getGalleryMarkup(images)
        
    } catch (error) {
    console.log(error)
    }

}

// бесконечный скролл
window.addEventListener('scroll', onScroll)

function onScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight > scrollHeight - 30) {
        page += 1;
        renderMarkup()
        

    }
}


//галерея

refs().gallery.addEventListener('click', (e) => {
    e.preventDefault()
    let modal = new SimpleLightbox('.gallery a')
    modal.open()
}
)

