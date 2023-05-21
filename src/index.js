import './css/styles.css';
import { fetchCountries, getLanguagesText } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(() => {
  const name = searchBox.value.trim();
  fetchCountriesData(name);
}, DEBOUNCE_DELAY));

function clearCountryList() {
  countryList.innerHTML = '';
}

function fetchCountriesData(name) {
  if (name === '') {
    clearCountryList();
    clearCountryInfo();
    return;
  }

  fetchCountries(name)
    .then((countries) => {
      handleCountryResponse(countries);
    })
    .catch((error) => {
      handleCountryError(error);
    });
}

function clearCountryInfo() {
  countryInfo.innerHTML = '';
}

function handleCountryResponse(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    clearCountryList();
    clearCountryInfo();
  } else if (countries.length >= 2 && countries.length <= 10) {
    renderCountryList(countries);
    clearCountryInfo();
  } else if (countries.length === 1) {
    renderCountryInfo(countries[0]);
    clearCountryList();
  } else {
    handleCountryError('Not found');
  }
}

function handleCountryError(error) {
  if (error === 'Not found') {
    Notiflix.Notify.failure('Oops, there is no country with that name.');
  } else {
    Notiflix.Notify.failure('Oops, there is no country with that name.');
  }
  clearCountryList();
  clearCountryInfo();
}


function renderCountryList(countries) {
  clearCountryList();
  countries.forEach((country) => {
    const { name, flags: { svg } } = country;
    const listItem = document.createElement('li');
    const flagImg = document.createElement('img');
    const countryName = document.createElement('div');
    countryName.classList.add('country-name');

    flagImg.src = svg;
    countryName.textContent = name;

    listItem.appendChild(flagImg);
    listItem.appendChild(countryName);
    countryList.appendChild(listItem);
  });
}

function renderCountryInfo(country) {
  const { name, capital, population, flags: { svg }, languages } = country;

  const listItem = document.createElement('li');
  const flagImg = document.createElement('img');
  const countryName = document.createElement('h2');
  const capitalInfo = document.createElement('p');
  const populationInfo = document.createElement('p');
  const languagesInfo = document.createElement('p');

  flagImg.src = svg;
  flagImg.classList.add('country-flag');
  countryName.textContent = name;
  capitalInfo.textContent = `Capital: ${capital}`;
  populationInfo.textContent = `Population: ${population}`;
  languagesInfo.textContent = `Languages: ${getLanguagesText(languages)}`;

  listItem.appendChild(flagImg);
  listItem.appendChild(countryName);
  listItem.appendChild(capitalInfo);
  listItem.appendChild(populationInfo);
  listItem.appendChild(languagesInfo);

  countryInfo.innerHTML = '';
  countryInfo.appendChild(listItem);
}