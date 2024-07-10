let urlCountryName = new URLSearchParams(location.search).get("name");

const themeChangeEl = document.querySelector(".theme-change");
const themeIcon = document.querySelector(".theme-icon");
const themeText = document.querySelector(".theme-text");
const countryImgEl = document.querySelector(".countryImg");
const countryNameEl = document.querySelector("#countryName");
const nativeNameEl = document.querySelector("#nativeName");
const populationEl = document.querySelector("#population");
const regionEl = document.querySelector("#region");
const subRegionEl = document.querySelector("#subRegion");
const capitalEl = document.querySelector("#capital");
const domainEl = document.querySelector("#domain");
const currenciesEl = document.querySelector("#currencies");
const languagesEl = document.querySelector("#languages");
const bordersEl = document.querySelector(".countries");
let isDarkMode = getLocalStorage("isDarkMode") || false;

function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getLocalStorage(key) {
  return localStorage.getItem(key);
}

function createCountryCard(countryData) {
  countryImgEl.src = countryData.flags.svg;
  countryNameEl.innerText = countryData.name.common;
  populationEl.innerText = countryData.population.toLocaleString("en-in");
  regionEl.innerText = countryData.region;

  if (countryData.name.nativeName) {
    nativeNameEl.innerText = Object.values(
      countryData.name.nativeName
    )[0].common;
  }

  if (countryData.subregion) {
    subRegionEl.innerText = countryData.subregion;
  }

  if (countryData.capital) {
    capitalEl.innerText = countryData.capital[0];
  }

  if (countryData.tld) {
    domainEl.innerText = countryData.tld[0];
  }

  if (countryData.currencies) {
    currenciesEl.innerText = Object.values(countryData.currencies)[0].name;
  }

  if (countryData.languages) {
    languagesEl.innerText =
      Object.values(countryData.languages).join(", ") + ".";
  }

  if (countryData.borders) {
    for (let i = 0; i < 3; i++) {
      let border = countryData.borders[i];
      if (border) {
        createBorderCountries(border);
      }
    }
  } else {
    bordersEl.innerText = "N/A";
  }
}

async function createBorderCountries(border) {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${border}`
  );
  const availableBorder = await response.json();
  const newBorderEl = document.createElement("a");
  newBorderEl.href = `/country.html?name=${availableBorder[0].name.common}`;
  newBorderEl.innerText = availableBorder[0].name.common;

  bordersEl.appendChild(newBorderEl);
}

async function getCountry() {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${urlCountryName}`
  );
  const country = await response.json();
  createCountryCard(country[0]);
}

getCountry();

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
