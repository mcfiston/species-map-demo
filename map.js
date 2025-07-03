function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -1.2921, lng: 36.8219 },
    zoom: 6,
  });

  // Load GeoJSON file with points
  map.data.loadGeoJson('data/points.geojson');

  // Optional: Add info window on click
  const infoWindow = new google.maps.InfoWindow();

  map.data.addListener('click', event => {
    const name = event.feature.getProperty('name');
    const position = event.latLng;

    infoWindow.setContent(`<strong>${name}</strong>`);
    infoWindow.setPosition(position);
    infoWindow.open(map);
  });
}

