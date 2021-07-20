function refs() {
    return {
    searchForm: document.querySelector('#search-form'),
    searchBtn: document.querySelector('button[type="submit"] '),
    serchQuery: document.querySelector('[name="searchQuery"]'),
        gallery: document.querySelector('.gallery'),
    allImages: document.querySelectorAll('.photo-img')

}
}

export {refs}