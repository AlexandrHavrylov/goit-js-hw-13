import './sass/main.scss';

import { fetchCountries } from './js/fetch-api';
import countryListTmp from './templates/country-list.hbs'
import countryTmp from './templates/country.hbs'
import Notiflix from "notiflix";
const debounce = require('lodash.debounce')

const DEBOUNCE_DELAY = 300;


const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput() {
    const countryToFind = refs.input.value.trim();
    if (!countryToFind) {
        refs.countryList.innerHTML = '';
    }
    countryToFind && countriesMarkup(countryToFind);
    }


function countriesMarkup(name) {
    fetchCountries(name).then(country => getMarkup(country))  
}

function getMarkup(country) {
      if (!country) {
           clearMarkup()
          Notiflix.Notify.failure('Oops, there is no country with that name')
       return
        }
     
        if (country.length === 1) {
            clearMarkup()
            const markup = countryTmp(country)
            refs.countryInfo.innerHTML = markup
        }
    
    if (country.length > 10) {
        clearMarkup()
         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
         
    }
    if (country.length > 1 && country.length <= 10) {
        clearMarkup()
        const markup = countryListTmp(country)
        refs.countryList.innerHTML = markup
    }

    
}


function clearMarkup() {
    refs.countryInfo.innerHTML = ''
    refs.countryList.innerHTML =''
}
