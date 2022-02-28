//* =======================================================================
//*                          FLAG-APP
//* =======================================================================
const fetchSelect = async function () {
  let formSelect = document.querySelector(".form-select");
  let data = "https://restcountries.com/v3.1/all";
  const res = await fetch(data);
  let data1 = await res.json();
  console.log(data1);
  data1.forEach((e) => {
    const {
      name: { common },
    } = e;
    console.log(common);
    formSelect.innerHTML += `<option>${Object.values(common).join(
      ""
    )}</option>`;
  });
};
fetchSelect();

const name2 = document.querySelector(".form-select");
name2.addEventListener("click", () => {
  fetchCountry(name2.value);
});

const submitButton = document.querySelector("button");
submitButton.addEventListener("click", () => {
  const name = document.querySelector("#name");
  const code = document.querySelector("#code");

  if (name || code) {
    fetchCountry(name.value, code.value);
  }

  name.value = "";
  code.value = "";
});

const fetchCountry = async function (name, code) {
  let url;
  if (name) {
    url = `https://restcountries.com/v3.1/name/${name}`;
  } else if (code) {
    url = `https://restcountries.com/v3.1/alpha/${code}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    //! error handling
    renderError(`Something went wrong! :: ${res.status}`);
    throw new Error();
  }
  const data = await res.json();
  renderCountry(data[0]);
};

const renderCountry = (country) => {
  const {
    capital,
    name: { common: countryName },
    currencies,
    region,
    languages,
    flags: { svg: countryFlag },
  } = country;

  const countries = document.querySelector(".countries");
  countries.innerHTML = ` 
   <div class="card text-start w-50 shadow-lg bg-light">
      <img src=${countryFlag} class="card-img-top" alt="...">
      <div class="card-body">
         <h5 class="card-title">${countryName}</h5>
         <p class="card-text">${region}</p>
      </div>
      <ul class="list-group list-group-flush">
         <li class="list-group-item"><i class="fas fa-lg fa-landmark"></i>${capital}</li>
         <li class="list-group-item"><i class="fas fa-lg fa-comments"></i>${Object.values(
           languages
         )} </li>
         <li class="list-group-item"><i class="fas fa-lg fa-money-bill-wave"></i> ${
           Object.values(currencies)[0].name
         }</li>
      </ul>
   </div> `;
};

const renderError = (error) => {
  const countries = document.querySelector(".countries");
  countries.innerHTML = `<h2 class='text-danger'>${error}</h2>`;
};
