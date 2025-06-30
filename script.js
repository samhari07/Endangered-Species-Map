// script.js

// Initialize the map
const map = L.map("map").setView([20.5937, 78.9629], 4); // India-centered

// Add base tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Marker layer groups
const landLayer = L.layerGroup();
const oceanLayer = L.layerGroup();
const birdLayer = L.layerGroup();
const reptileLayer = L.layerGroup();

// Function to add GeoJSON to a layer
function loadGeoJSON(url, layer, color) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        L.geoJSON(data, {
          pointToLayer: (feature, latlng) => {
            const marker = L.circleMarker(latlng, {
              radius: 6,
              fillColor: color,
              color: '#000',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            });
  
            const name = feature.properties.Species || "Unknown Species";
  
            // 👇 Show popup on click
            marker.bindPopup(`<b>${name}</b><br>${feature.properties.description || ''}`);
  
            // 👇 Show label always
            marker.bindTooltip(name, { permanent: true, direction: 'right', offset: [10, 0] });
  
            return marker;
          }
        }).addTo(layer);
      });
  }
  

// Load all categories
loadGeoJSON("endangered_species.geojson", landLayer, "green");
loadGeoJSON("ocean_giants.geojson", oceanLayer, "blue");
loadGeoJSON("endangered_birds.geojson", birdLayer, "orange");
loadGeoJSON("endangered_reptiles.geojson", reptileLayer, "purple");

// Add all to map
landLayer.addTo(map);
oceanLayer.addTo(map);
birdLayer.addTo(map);
reptileLayer.addTo(map);

// Layer control
L.control.layers(null, {
  "Land Species": landLayer,
  "Ocean Giants": oceanLayer,
  "Birds": birdLayer,
  "Reptiles": reptileLayer,
}).addTo(map);
