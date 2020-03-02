

// You can require libraries
const d3 = require('d3')


// Prevalence of mental health disorders by disorder type
const csvFile = require('../prevalence-by-mental-and-substance-use-disorder.csv');

// You can load JSON files directly via require.
// Note this does not add a network request, it adds
// the data directly to your JavaScript bundle.
// const exampleData = require('./example-data.json');


// Anything you put in the static folder will be available
// over the network, e.g.
// Load the csv file
var all_data = d3.csv(csvFile, function(data) {
  return {
      entity: data.Entity,
      code: data.Code,
      year: +data.Year,
      schizophrenia: data["Schizophrenia (%)"],
      bipolar: data["Bipolar disorder (%)"],
      eating: data["Eating disorders (%)"],
      anxiety: data["Anxiety disorders (%)"],
      drug: data["Drug use disorders (%)"],
      depression: data["Depression (%)"],
      alcohol: data["Alcohol use disorders (%)"]
  };
});

// returns a Promise of filtered csv array from all_data
function filter_data_country() {
  return all_data.then(function(d) {
      var d_filtered =  d.filter(function(row) {
          return row["code"] == window.countryCode;
      });
      return d_filtered;
  });
}

function filter_data_year(data, year) {
  return data.then(function(d) {
    var d_filtered =  d.filter(function(row) {
        return row["year"] == year;
    });
    return d_filtered;
  });
}

var counter = 1;

function showGraph() {
  console.log("ShowGraph");

  var data = filter_data_country();

  var chart = 0;

  filter_data_year(data, 1990).then(function(d) {
    d.map(function(row) {
      chart = new CanvasJS.Chart("chartContainer", {
        title: {
          text: "Disorders"
        },
        axisY: {
          title: "Population (%)",
          suffix: " %"
        },
        data: [{
          type: "bar",	
          yValueFormatString: "#.# %",
          indexLabel: "{y}",
          dataPoints: [
            { label: "Schizophrenia", y: row["schizophrenia"], color: '#800026' },
            { label: "Bipolar disorder", y: row["bipolar"], color: "#FF2500" },
            { label: "Eating disorders", y: row["eating"], color: "#FF2500" },
            { label: "Anxiety disorders", y: row["anxiety"], color: "#FF2500" },
            { label: "Drug use disorders", y: row["drug"], color: "#FF2500" },
            { label: "Depression", y: row["depression"], color: "#FF2500" },
            { label: "Alcohol use disorders", y: row["alcohol"], color: "#FF2500" }
          ]
        }]
      });
    });
  });

  function updateChart() {
    counter++;
    data = filter_data_country();

    filter_data_year(data, 1990 + counter).then(function(d) {
      d.map(function(row) {
        var dps = chart.options.data[0].dataPoints;

        dps[0] = { label: "Schizophrenia", y: row["schizophrenia"], color: "#FF2500" };
        dps[1] = { label: "Bipolar disorder", y: row["bipolar"], color: "#FF2500" };
        dps[2] = { label: "Eating disorders", y: row["eating"], color: "#FF2500" };
        dps[3] = { label: "Anxiety disorders", y: row["anxiety"], color: "#FF2500" };
        dps[4] = { label: "Drug use disorders", y: row["drug"], color: "#FF2500" };
        dps[5] = { label: "Depression", y: row["depression"], color: "#FF2500" };
        dps[6] = { label: "Alcohol use disorders", y: row["alcohol"], color: "#FF2500" };

        chart.options.data[0].dataPoints = dps; 
        chart.render();
      });
    });
  };

  updateChart();

  setInterval(function() {updateChart()}, 500);

}

window.showGraph = showGraph;




 
  