/* eslint-disable */
const lineChart = document.getElementById("line-chart");
const dataLine = [65, 59, 80, 81, 56, 55, 40, 55, 60, 62, 75, 60];

const createDatasetLineViews = () => {
  return [{
    label: 'Impression',
    data: dataLine,
    fill: {
      target: 'origin',
      above: 'rgba(253, 119, 255, .05)',   // Area will be red above the origin
      below: 'rgb(0, 0, 255)'    // And blue below the origin
    },
    borderColor: 'rgb(253, 119, 255)',
    tension: 0.4,
    order: 1000,
    pointRadius: 5,
    pointHoverBackgroundColor: "rgb(253, 119, 255)",
    pointHoverRadius: 8,
  }]
}

const dataLineViews = {
  type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: createDatasetLineViews(),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animations: {
        y: {
          easing: 'easeInOutElastic',
          from: (ctx) => {
            if (ctx.type === 'data') {
              if (ctx.mode === 'default' && !ctx.dropped) {
                ctx.dropped = true;
                return 0;
              }
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
            // min: 0,
            // max: Math.max(...dataLine) * 2,
        }
      },
      layout: {
        padding: 20
      },
      plugins: {
        tooltip: {
          backgroundColor: "rgba(51, 51, 51, 0.5)",
          padding: 6,
          cornerRadius: 4,
          borderColor: "rgba(255, 255, 255, 0.3)",
          borderWidth: "1",
          titleFont: {
              weight: 400,
              size: 12,
              family: "Orbitron",
          }
        }
      },
      
    }
}

const lineViews = new Chart(lineChart, dataLineViews);

const updateChartLineViews = () => {
  dataLineViews.data.datasets = createDatasetLineViews();
  lineViews.update();
}