import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

inputEl.addEventListener('input', () => {
  fetchCountries()
    .then(users => renderCountryList(users))
    .catch(error => console.log(error));
});

function fetchCountries() {
  return fetch(`https://restcountries.com/v3.1/name/${inputEl.value}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
