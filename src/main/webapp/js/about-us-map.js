/* Initialize map with three fixed markers*/
function createDefaultMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.34, lng: 103.8},
    zoom: 11
  });
}

function createMapWithDefaultMarkers(){
  createDefaultMap();
  createMarker(1.280547, 103.844502, 'Maxwell Food Centre', '1 Kadayanallur St 069184');
  createMarker(1.308398, 103.885808, 'Old Airport Road Food Centre', '51 Old Airport Rd, Singapore 390051');
  createMarker(1.331814, 103.938867, 'Bedok 85 Market', '85 Bedok North Street 4, Singapore 460085');
}

/* Add landmark to map */
function createMarker(lat, lng, title, address) {
  const marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    title: title
  });
  const infoWindow = new google.maps.InfoWindow({
    content: address
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}

function buildUI(){
  initiateUI();
  createMapWithDefaultMarkers();
}