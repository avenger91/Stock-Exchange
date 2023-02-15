const stockHistoryURL =
  baseURL + `historical-price-full/${symbol}?serietype=line`;

async function getHistoricalData() {
  const response = await fetch(stockHistoryURL);
  const data = await response.json();
  length = data.historical.length;

  labels = [];
  values = [];
  for (i = 0; i < length; i += 700) {
    labels.push(data.historical[i].date);
    values.push(data.historical[i].close);
  }

  labels.sort((a, b) => new Date(a) - new Date(b));

  new Chart(document.getElementById("bar-chart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Close",
          data: values,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Stock Price Historical Data",
      },
    },
  });
}
getHistoricalData();
