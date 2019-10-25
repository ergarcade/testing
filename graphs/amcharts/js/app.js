let chart;
let timerId = 0;

let randomData = function() {
    chart.addData([
        {
            country: "XX" + Math.floor(Math.random() * 10000),
            litres: 5 + Math.floor(Math.random() * 10)
        }
    ], (Math.random() > 0.5) ? 1 : (chart.data.length > 20 ? 2 : 0));
};

document.addEventListener('DOMContentLoaded', function(e) {
    chart = am4core.createFromConfig({
        series: [{
            type: "PieSeries",
            dataFields: {
                value: "litres",
                category: "country"
            }
        }],

        data: [
            {
              country: "Lithuania",
              litres: 501.9
            }, {
              country: "Czech Republic",
              litres: 301.9
            }, {
              country: "Ireland",
              litres: 201.1
            }, {
              country: "Germany",
              litres: 165.8
            }, {
              country: "Australia",
              litres: 139.9
            }, {
              country: "Austria",
              litres: 128.3
            }, {
              country: "UK",
              litres: 99
            }, {
              country: "Belgium",
              litres: 60
            }, {
              country: "The Netherlands",
              litres: 50
            }
        ],

        legend: {}
    }, "chartdiv", am4charts.PieChart);

    document.querySelector('#start').addEventListener('click', function(e) {
        if (timerId != 0) {
            clearInterval(timerId);
        }
        timerId = setInterval(randomData, 1000);
    });

    document.querySelector('#stop').addEventListener('click', function(e) {
        if (timerId != 0) {
            clearInterval(timerId);
        }
    });
});
