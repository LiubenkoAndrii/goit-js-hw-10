import { clearCountryList } from './index.js';

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

function getLanguagesText(languages) {
  return languages.map(lang => lang.name).join(', ');
}

export { fetchCountries, getLanguagesText };