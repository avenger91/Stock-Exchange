class List {
  constructor(countriesContainer, totalContainer) {
    this.container = countriesContainer;
    this.totalContainer = totalContainer;
    this.relevantInfo = [];
    this.getCountriesData();
  }
  async getCountriesData() {
    try {
      const data = await sendRequest("https://api.covid19api.com/summary");
      this.relevantInfo = data.Countries.map((country) => ({
        name: country.Country,
        totalDeath: country.TotalDeaths,
      }));
      this.changeCountriesInTheDom();
    } catch (err) {
      console.log(err);
      //Implement Dom manipulation for showing an error
    }
  }
  changeCountriesInTheDom() {
    //To Updated the view of the user with the list of countries

    //Reset before we start to create new list
    this.container.innerHTML = ``;
    const temporaryContainer = document.createDocumentFragment();
    let flag = false;
    this.relevantInfo.forEach((country) => {
      const { name, totalDeath } = country;
      const countryLine = document.createElement("div");
      countryLine.innerHTML = `
                <div class="line data-line ${flag ? "greyedColor" : ""}">
                    <div class="cell">${name}</div>
                    <div class="cell">${totalDeath}</div>
                </div>
            `;
      temporaryContainer.appendChild(countryLine);
      flag = !flag;
    });
    this.container.appendChild(temporaryContainer);

    //Handle Total Death:
    //Sum the total amount of death from the countries
    //relveantInfo = [{name:'israel',totalDeath:32434}{name:'israel',totalDeath:32434}{name:'israel',totalDeath:32434}{name:'israel',totalDeath:32434}]
    const totalDeath = pageCountries.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.totalDeath;
    }, 0);
    //Add it to the DOM
    this.totalContainer.innerHTML = `
                    <div class="line data-line">
                        <div class="cell">Total</div>
                        <div class="cell">${totalDeath}</div>
                    </div>`;
  }
}

/*
class Element {
  constructor(tag) {
    this.tag = tag;
    this.elem = this.createElement(tag);
  }

  createElement(tag) {
    const elem = document.createElement(tag);
    return elem;
  }

  appendTo(selector) {
    const wrap = document.querySelector(selector);
    wrap.append(this.elem);
  }

  write(text) {
    this.elem.innerHTML = text;
  }

  addClass(name) {
    this.elem.classList.add(name);
  }
}

for (let i = 0; i < 10; i++) {
  const div = new Element("div");
  div.appendTo(".canvas");
  div.write("value");
  div.addClass("box");
}

const div = new Element("div");
div.appendTo(".canvas");
div.write("value");
div.addClass("box");

console.log(div);
//div.write("value");

class Box extends Element {
  constructor(selector) {
    super("div");

    this.appendTo(selector);
    this.write("value");
    this.addClass("box");
  }
}

new Box(".canvas");

new Box(".canvas2");

*/
