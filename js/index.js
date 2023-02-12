const input = document.getElementById("user-input");
const button = document.getElementById("search-button");
const searchList = document.getElementById("search-list");

const baseURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

function updateURL(input) {
  const URLlimit = `search?query=${input.value}&limit=10&exchange=NASDAQ`;
  return baseURL + URLlimit;
}

button.addEventListener("click", function (event) {
  event.preventDefault();
  searchList.innerHTML = "";

  getSearchData();
});

async function getSearchData() {
  try {
    const response = await fetch(updateURL(input));
    const data = await response.json();
    console.log(data);

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
    console.log(data);

    listSearchData(data);
  } catch (error) {
    console.log(error);
  }
}

function listSearchData(data) {
  const { companyName, image, changesPercentage } = data.profile;
  const symbol = data.symbol;

  const listElement = document.createElement("li");
  const imageElement = document.createElement("img");
  const linkElement = document.createElement("a");
  const textElement = document.createElement("p");

  linkElement.textContent = companyName;
  linkElement.setAttribute("href", `company.html?symbol=${symbol}`);
  imageElement.setAttribute("src", `${image}`);
  textElement.textContent = `${symbol} (${changesPercentage} %)`;

  listElement.append(imageElement, linkElement, textElement);
  searchList.appendChild(listElement);
}
