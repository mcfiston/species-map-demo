let map;
let layers = {};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -1.2921, lng: 36.8219 },
    zoom: 6,
  });

  // Load default layers
  loadLayer("range", "data/species_range.geojson");
  loadLayer("samples", "data/samples.geojson"); // change if you have a threat layer
  loadLayer("survey", "data/surveys.geojson");

  // Hook up checkboxes
  document.getElementById("rangeLayer").addEventListener("change", toggleLayer);
  document.getElementById("samplesLayer").addEventListener("change", toggleLayer);
  document.getElementById("surveyLayer").addEventListener("change", toggleLayer);
}

function loadLayer(name, url) {
  const layer = new google.maps.Data();
  layer.loadGeoJson(url);
  layer.setMap(map);

  // Optional: show info window
  const infoWindow = new google.maps.InfoWindow();
  layer.addListener("click", (event) => {
    const name = event.feature.getProperty("name") || "No name";
    infoWindow.setContent(`<strong>${name}</strong>`);
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  layers[name] = layer;
}

function toggleLayer(event) {
  const checkbox = event.target;
  const layerName = checkbox.id.replace("Layer", "");
  const layer = layers[layerName];
  if (layer) {
    layer.setMap(checkbox.checked ? map : null);
  }
}

