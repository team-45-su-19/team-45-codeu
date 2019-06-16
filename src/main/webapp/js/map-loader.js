(function(exports){
  let map;
  let currentPos;
  let editMarkers = [];

  /* Initialize map with three fixed markers*/
  function createDefaultMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 1.34, lng: 103.8},
      zoom: 11
    });
  }

  exports.createMapForAboutUsPage = function(){
    createDefaultMap()
    createMarker(1.280547, 103.844502, 'Maxwell Food Centre', '1 Kadayanallur St 069184');
    createMarker(1.308398, 103.885808, 'Old Airport Road Food Centre', '51 Old Airport Rd, Singapore 390051');
    createMarker(1.331814, 103.938867, 'Bedok 85 Market', '85 Bedok North Street 4, Singapore 460085');
  }

  exports.createMapForUserPage = function(){
    createDefaultMap()
    map.setZoom(16);
    getCurrentLoc();
  }

  exports.searchLocationByText = function() {
    var request = {
        location: currentPos,
        query: document.getElementById("location_input").value,
        radius: "100"
      };
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, function(results, status) {

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        clearExistingMarkers();
        for (var i = 0; i < results.length; i++) {
          createMarkerWithSubmit(results[i]);
        }
      }
    });
    console.log(currentPos);
    map.setCenter(currentPos);
  }

  /* Clear exiting marker if there are markers left from previous search. */
  function clearExistingMarkers(){
    for(var i =0; i < editMarkers.length; i++){
      editMarkers[i].setMap(null);
    }
    editMarkers = new Array();
  }

  /** Creates a marker that shows a textbox the user can confirm the location and submit. */
  function createMarkerWithSubmit(place){
    const position = place.geometry.location;
    var editMarker = new google.maps.Marker({
      position: {lat: position.lat(), lng: position.lng()},
      map: map
    });
    editMarkers.push(editMarker);
    const infoWindow = new google.maps.InfoWindow({
      content: place.name
    });
    infoWindow.open(map, editMarker);

    editMarker.addListener('click', () => {
      infoWindow.setContent(buildInfoWindowWithSubmit(place));
      infoWindow.open(map, editMarker);
    });
  }

  /** Builds and returns HTML elements that show an editable textbox and a submit button. */
  function buildInfoWindowWithSubmit(place){
    const position = place.geometry.location;

    const para = document.createElement("P");
    const text = document.createTextNode(place.name);
    para.appendChild(text);
    const button = document.createElement('button');
    button.appendChild(document.createTextNode('Add this location'));
    button.onclick = () => {
      addLocationInfoToForm(position.lat(), position.lng(), place.name, place.place_id);
      document.getElementById("location_input").value = place.name;
      //To prevent auto submitting
      return false;
    };
    const containerDiv = document.createElement('div');
    containerDiv.appendChild(para);
    containerDiv.appendChild(document.createElement('br'));
    containerDiv.appendChild(button);
    return containerDiv;
  }

  function addLocationInfoToForm(lat, lng, name, id){
    var latInput = document.createElement("input");
    latInput.setAttribute("type", "hidden");
    latInput.setAttribute("name", "lat");
    latInput.setAttribute("value", lat);

    var lngInput = document.createElement("input");
    lngInput.setAttribute("type", "hidden");
    lngInput.setAttribute("name", "lng");
    lngInput.setAttribute("value", lng);

    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "hidden");
    nameInput.setAttribute("name", "location_name");
    nameInput.setAttribute("value", name);

    var idInput = document.createElement("input");
    idInput.setAttribute("type", "hidden");
    idInput.setAttribute("name", "location_id");
    idInput.setAttribute("value", id);

    document.getElementById("message-form").appendChild(latInput);
    document.getElementById("message-form").appendChild(lngInput);
    document.getElementById("message-form").appendChild(nameInput);
    document.getElementById("message-form").appendChild(idInput);
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

  function getCurrentLoc(){
    var infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Current Location Detected');
        infoWindow.open(map);
        map.setCenter(pos);
        currentPos = pos;
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
})(window)

function initializeAboutUsPageWithMap(){
  initiateUI();
  createMapForAboutUsPage();
}