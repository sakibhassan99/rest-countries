let urlCountryName = new URLSearchParams(location.search).get("name");

const countryDetails = document.querySelector(".country-details");
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

function createSkeleton() {
  countryDetails.innerHTML = `
  <div class="image-container skeleton skeleton-img">
    <img class="countryImg">
  </div>
  <div class="country-info load-skeleton">
    <div class="skeleton skeleton-heading"></div>
    <div class="details_container">
      <div class="left-details">
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </div>
      <div class="right-details">
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </div>
    </div>
    <div class="border-countries">
      <p>Border Countries: </p>
      <div class="countries">
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </div>
    </div>
  </div>
  `;
}

function createCountryCard(countryData) {
  countryDetails.innerHTML = `
  <div class="image-container">
    <img class="countryImg" src="${countryData.flags.svg}">
  </div>
  <div class="country-info">
    <h2 id="countryName">${countryData.name.common}</h2>
    <div class="details_container">
      <div class="left-details">
        <p>Native Name: <span id="nativeName">${
          countryData.name.nativeName
            ? Object.values(countryData.name.nativeName)[0].common
            : "N/A"
        }</span></p>
        <p>Population: <span id="population">${countryData.population.toLocaleString(
          "en-in"
        )}</span></p>
        <p>Region: <span id="region">${countryData.region}</span></p>
        <p>Sub Region: <span id="subRegion">${
          countryData.subregion ? countryData.subregion : "N/A"
        }</span></p>
        <p>Capital: <span id="capital">${
          countryData.capital ? countryData.capital[0] : "N/A"
        }</span></p>
      </div>
      <div class="right-details">
        <p>Top Level Domain: <span id="domain">${
          countryData.tld ? countryData.tld[0] : "N/A"
        }</span></p>
        <p>Currencies: <span id="currencies">${
          countryData.currencies
            ? Object.values(countryData.currencies)
                .map((currency) => currency.name)
                .join(", ") + "."
            : "N/A"
        }</span></p>
        <p>Languages: <span id="languages">${
          countryData.languages
            ? Object.values(countryData.languages).join(", ") + "."
            : "N/A"
        }</span></p>
      </div>
    </div>
    <div class="border-countries">
      <p>Border Countries: </p>
      <div class="countries">
      </div>
    </div>
  </div>
  `;

  if (countryData.borders) {
    for (let i = 0; i < countryData.borders.length; i++) {
      let border = countryData.borders[i];
      if (border) {
        createBorderCountries(border);
      }
    }
  }
}

async function createBorderCountries(border) {
  const bordersEl = document.querySelector(".countries");
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${border}`
  );
  const availableBorder = await response.json();
  const newBorderEl = document.createElement("a");
  newBorderEl.href = `/country.html?name=${availableBorder[0].name.common}?fullText=true`;
  newBorderEl.innerText = availableBorder[0].name.common;

  bordersEl.appendChild(newBorderEl);
}

async function getCountry() {
  countryDetails.innerHTML = "";
  createSkeleton();
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${urlCountryName}`
    );
    const country = await response.json();
    createCountryCard(country[0]);
  } catch (err) {
    countryDetails.innerHTML = `<img src="/assets/Images/404 Error.svg" style="width: 100%;">`;
  }
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
