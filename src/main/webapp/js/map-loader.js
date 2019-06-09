/* Initialize map with three fixed markers*/
function createMap(){
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.34, lng: 103.8},
    zoom: 12
  });
  addLandmark(map, 1.280547, 103.844502, 'Maxwell Food Centre', '1 Kadayanallur St 069184');
  addLandmark(map, 1.308398, 103.885808, 'Old Airport Road Food Centre', '51 Old Airport Rd, Singapore 390051');
  addLandmark(map, 1.331814, 103.938867, 'Bedok 85 Market', '85 Bedok North Street 4, Singapore 460085')
}

/* Add landmark to map */
function addLandmark(map, lat, lng, title, address) {
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


function initializeUIWithMap(){
  initiateUI();
  createMap();
}