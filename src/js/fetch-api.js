import axios from 'axios'

async function fetchImg(img, page) {
    const API_KEY = '22578709-fa6dea9b1a45e33c6082cdf73'
    const URL = 'https://pixabay.com/api/'
    const params = `image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    const response = await axios.get(`${URL}?key=${API_KEY}&q=${img}&${params}`)
    const images = response.data
    return images
}

export {fetchImg}
