let map, rangeLayer, threatLayer, surveyLayer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -1.2, lng: 34.7 },
    zoom: 8,
  });

  // Species range
  rangeLayer = new google.maps.Data();
  rangeLayer.loadGeoJson('data/species_range.geojson');
  rangeLayer.setStyle({ fillColor: '#008000', strokeWeight: 1, fillOpacity: 0.4 });
  rangeLayer.setMap(map);

  // Threats
  threatLayer = new google.maps.Data();
  threatLayer.loadGeoJson('data/threats.geojson');
  threatLayer.setStyle({ icon: 'icons/threat.png' });
  threatLayer.setMap(map);

  // Surveys
  surveyLayer = new google.maps.Data();
  surveyLayer.loadGeoJson('data/surveys.geojson');
  surveyLayer.setStyle({ icon: 'icons/survey.png' });
  surveyLayer.setMap(map);

  // Popups
  [rangeLayer, threatLayer, surveyLayer].forEach(layer => {
    layer.addListener('click', function(event) {
      const info = event.feature.getProperty('description') || 'No info';
      const infowindow = new google.maps.InfoWindow({
        content: `<div style="max-width:200px">${info}</div>`,
        position: event.latLng
      });
      infowindow.open(map);
    });
  });

  // Layer toggles
  document.getElementById('rangeLayer').addEventListener('change', e => {
    rangeLayer.setMap(e.target.checked ? map : null);
  });
  document.getElementById('threatLayer').addEventListener('change', e => {
    threatLayer.setMap(e.target.checked ? map : null);
  });
  document.getElementById('surveyLayer').addEventListener('change', e => {
    surveyLayer.setMap(e.target.checked ? map : null);
  });
}

