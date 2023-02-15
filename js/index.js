const input = document.querySelector("input");
const button = document.querySelector("button");
const magnify = document.querySelector(".fa-magnifying-glass");
const loadingSpinner = document.querySelector(".fa-spinner");
const searchList = document.querySelector(".search-results");

searchList.innerHTML = "";
loadingSpinner.style.display = "none";

const baseURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

function updateURL(input) {
  const URLlimit = `search?query=${input.value}&limit=10&exchange=NASDAQ`;
  return baseURL + URLlimit;
}

button.addEventListener("click", function (event) {
  event.preventDefault();
  searchList.innerHTML = "";

  magnify.style.display = "none";
  loadingSpinner.style.display = "block";

  setTimeout(() => {
    magnify.style.display = "block";
    loadingSpinner.style.display = "none";
  }, 2000);

  getSearchData();
});

async function getSearchData() {
  try {
    const response = await fetch(updateURL(input));
    const data = await response.json();
    //console.log(data);

    for (const company of data) {
      const { symbol } = company;
      getMoreSearchData(symbol);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getMoreSearchData(symbol) {
  try {
    const response = await fetch(baseURL + `company/profile/${symbol}`);
    const data = await response.json();
    // console.log(data);

    listSearchData(data);
  } catch (error) {
    console.log(error);
  }
}

function listSearchData(data) {
  const { companyName, image, changesPercentage } = data.profile;
  const symbol = data.symbol;
  const temporaryContainer = document.createDocumentFragment();

  const listElement = document.createElement("div");
  const imageElement = document.createElement("img");
  const linkElement = document.createElement("a");
  const textElement = document.createElement("p");
  const changesElement = document.createElement("p");

  linkElement.setAttribute("href", `company.html?symbol=${symbol}`);
  imageElement.setAttribute("src", `${image}`);

  if (changesPercentage < 0) {
    changesElement.textContent = `${changesPercentage}%`;
    changesElement.classList.add("red");
  } else {
    changesElement.textContent = `+${changesPercentage}%`;
    changesElement.classList.add("green");
  }

  textElement.textContent = ` ${companyName} (${symbol}) `;
  listElement.append(imageElement, linkElement, textElement, changesElement);
  temporaryContainer.appendChild(listElement);
  searchList.appendChild(temporaryContainer);

  listElement.addEventListener("click", function () {
    window.location.href = linkElement.getAttribute("href");
  });
}
