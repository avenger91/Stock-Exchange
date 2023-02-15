const companyData = document.querySelector(".company-data");
const baseURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const symbol = getUrlParameter("symbol");
const companyURL = baseURL + `company/profile/${symbol}`;

async function getCompanyData() {
  try {
    const response = await fetch(companyURL);
    const data = await response.json();
    const {
      companyName,
      image,
      website,
      price,
      description,
      changes,
      changesPercentage,
      currency,
    } = data.profile;

    const companyItem = document.createElement("div");
    companyItem.innerHTML = `
          <h2>${companyName}</h2>
          <p> $${price} ${currency}</p>
          <p> ${changes} (${changesPercentage} %)</p>
          <img src="${image}" alt="${companyName}" />
          <p>Website: <a href="${website}">${website}</a></p>
             <p>Description: ${description}</p>
        `;

    companyData.appendChild(companyItem);
  } catch (error) {
    console.log(error);
  }
}

getCompanyData();
