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
      year: data.year,
      schizophrenia: data["Schizophrenia (%)"]
  };
});


var mymap = L.map('mapid', {
      minZoom: 1.4
}).setView([51.505, -0.09], 1.4);
var shipLayer = L.layerGroup();
mymap.addLayer(shipLayer);

var southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

mymap.setMaxBounds(bounds);
mymap.on('drag', function() {
  mymap.panInsideBounds(bounds, { animate: false });
});
  
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5naWVsZWV5eiIsImEiOiJjazY4c3MwOHAwOGc1M29xanNrOWdpcjgwIn0.kOc4Y88p-f10kvKPyKoKOA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: 'your.mapbox.access.token',
    noWrap: true,
    bounds: [
      [-90, -180],
      [90, 180]
    ],
    center: bounds.getCenter()
}).addTo(mymap);

L.geoJson(countriesData).addTo(map);

function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

 
  