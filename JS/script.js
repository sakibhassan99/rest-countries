const countriesContainer = document.querySelector(".countries-container");
const filerEl = document.querySelector(".filer");
const filterAngleIcon = document.querySelector(".filter-angle-icon");
const optionsEl = filerEl.nextElementSibling.firstElementChild;
const searchCountriesEl = document.querySelector("#search_input");
const themeChangeEl = document.querySelector(".theme-change");
const themeIcon = document.querySelector(".theme-icon");
const themeText = document.querySelector(".theme-text");

let isDarkMode = getLocalStorage("isDarkMode") || false;

function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getLocalStorage(key) {
  return localStorage.getItem(key);
}

function createCountryCards(countriesData) {
  for (const country of countriesData) {
    const countryCard = document.createElement("a");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.classList.add("country-card");
    countryCard.innerHTML = `
    <div class="image-container">
    <img src="${country.flags.png}">
    </div>
    <div class="country-info">
        <h2 id="countryName">${country.name.common}</h2>
        <p>Population: <span id="population">${country.population}</span></p>
        <p>Region: <span id="region">${country.region}</span></p>
        <p>Capital: <span id="capital">${
          country.capital ? country.capital[0] : "N/A"
        }</span></p>
    </div>
    `;
    countriesContainer.appendChild(countryCard);
  }
}

async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
  createCountryCards(countries);
}

getCountries();

filerEl.addEventListener("click", (e) => {
  const showFilterEl = filerEl.nextElementSibling;
  showFilterEl.classList.toggle("show-filter");
  if (showFilterEl.classList.contains("show-filter")) {
    filterAngleIcon.classList.replace("fa-angle-down", "fa-angle-up");

    optionsEl.addEventListener("click", async (e) => {
      if (e.target.tagName === "LI") {
        const clickedRegion = e.target.innerText;
        const response = await fetch(
          `https://restcountries.com/v3.1/region/${clickedRegion}`
        );
        const regionCountries = await response.json();
        countriesContainer.innerHTML = "";
        createCountryCards(regionCountries);
        showFilterEl.classList.remove("show-filter");
      }
    });
  } else {
    filterAngleIcon.classList.replace("fa-angle-up", "fa-angle-down");
  }
});

searchCountriesEl.addEventListener("input", async (e) => {
  try {
    if (e.target.value) {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${e.target.value}`
      );
      const searchedCountries = await response.json();
      countriesContainer.innerHTML = "";
      createCountryCards(searchedCountries);
    } else {
      countriesContainer.innerHTML = "";
      getCountries();
    }
  } catch (err) {
    countriesContainer.innerHTML = `
    <img src="./assets/Images/404 Error.png" style="width:100%">
    `;
  }
});

themeChangeEl.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeText.innerText = "Light Mode";
    themeIcon.classList.replace("fa-moon", "fa-sun");
    isDarkMode = true;
    setLocalStorage("isDarkMode", isDarkMode);
  } else {
    themeText.innerText = "Dark Mode";
    themeIcon.classList.replace("fa-sun", "fa-moon");
    isDarkMode = false;
    setLocalStorage("isDarkMode", isDarkMode);
  }
});

if (isDarkMode === "true") {
  document.body.classList.add("dark-mode");
  themeText.innerText = "Light Mode";
  themeIcon.classList.replace("fa-moon", "fa-sun");
} else {
  document.body.classList.remove("dark-mode");
  themeText.innerText = "Dark Mode";
  themeIcon.classList.replace("fa-sun", "fa-moon");
}
