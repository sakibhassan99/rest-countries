let urlCountryName = new URLSearchParams(location.search).get("name");
const countryDetailsEl = document.querySelector(".country-details");

function createCountryCard(countryData) {
  countryDetailsEl.innerHTML = `<div class="image-container">
                <img src="${countryData.flags.png}">
            </div>
            <div class="country-info">
                <h2 id="countryName">${countryData.name.common}</h2>
                <div class="details_container">
                    <div class="left-details">
                        <p>Native Name: <span id="nativeName">${countryData.name.nativeName[0].common}</span></p>
                        <p>Population: <span id="population">${countryData.population}</span></p>
                        <p>Region: <span id="region">${countryData.region}</span></p>
                        <p>Sub Region: <span id="subRegion">${countryData.subregion}</span></p>
                        <p>Capital: <span id="capital">${countryData.capital[0]}</span></p>
                    </div>
                    <div class="right-details">
                        <p>Top Level Domain: <span id="domain">${countryData.tld[0]}</span></p>
                        <p>Currencies: <span id="currencies">${countryData.currencies[0].name}</span></p>
                        <p>Languages: <span id="languages">${countryData.languages}</span></p>
                    </div>
                </div>
                <div class="border-countries">
                    <p>Border Countries: </p>
                    <div class="countries">
                        <p>France</p>
                        <p>Germany</p>
                        <p>Netherlands</p>
                    </div>
                </div>
            </div>`;
}
async function getCountry() {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${urlCountryName}`
  );
  const country = await response.json();
  createCountryCard(country[0]);
  console.log(country[0]);
}

getCountry();
