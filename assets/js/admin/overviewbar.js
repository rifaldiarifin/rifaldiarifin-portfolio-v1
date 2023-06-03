/* eslint-disable */
const overviewData = {
    barLabel: ["Hero", "About Me", "My Skills", "My Projects", "Contact Me"],
    barValue: document.getElementById("overview").dataset.chart1.split(", "),
    backgroundColor: [
        'rgba(242, 99, 234, .6)',
        'rgba(199, 104, 252, .6)',
        'rgba(136, 105, 229, .6)',
        'rgba(104, 124, 252, .6)',
        'rgba(95, 172, 245, .6)'
    ],
};
const ctx = document.getElementById('polar-chart');
const labelBar = ctx.parentElement.nextElementSibling.querySelectorAll(".bar-label");

labelBar.forEach((label, i) => {
    label.innerHTML = `<div class="box dsp-flex align-itms-center gap-10">
    <span style="background-color:${overviewData.backgroundColor[i]}"></span>${overviewData.barLabel[i]}
</div>
<div class="box dsp-flex align-itms-center">
    ${overviewData.barValue[i]}<span>x</span>
</div`;
})

const createDatasetOverview = () => {
    return [{
        label: 'Views',
        data: overviewData.barValue,
        backgroundColor: overviewData.backgroundColor,
        hoverBackgroundColor: [
            'rgba(242, 99, 234, 1)',
            'rgba(199, 104, 252, 1)',
            'rgba(136, 105, 229, 1)',
            'rgba(104, 124, 252, 1)',
            'rgba(95, 172, 245, 1)'
        ],
        offset: 6
    }]
}
const dataOverview = {
    type: 'doughnut',
    data: {
        // labels: [
        //     'Section1',
        //     'Section2',
        //     'Section3',
        //     'Section4',
        //     'Section5'
        // ],
        datasets: createDatasetOverview(),
    },
    options: {
        // cutout: 50,
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        plugins: {
            legend: {
                font: {
                    family: "'Orbitron'"
                }
            },
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
        }
    },
}

const overViewBar = new Chart(ctx, dataOverview);

const updateChartOverview = () => {
    dataOverview.data.datasets = createDatasetOverview();
    overViewBar.update();
}