/* This map shows all places that a specific user have been. */
/* TODO: Move it to other page if needed */
(function(exports){
  let userMap;

  exports.createUserPostsMap = function(){
    userMap = new google.maps.Map(document.getElementById('user-map'), {
      center: {lat: 1.34, lng: 103.8},
      zoom: 11
    });

    const url = '/Location?user=' + parameterUsername;
    fetch(url).then((response) => {
            return response.json();
        }).then((locations) => {
            locations.forEach((location) =>{
              createMarker(location.lat,location.lng,location.name);
            });
        });
  };

  /* Add landmark to map */
  function createMarker(lat, lng, name) {
   const marker = new google.maps.Marker({
     position: {lat: lat, lng: lng},
     map: userMap,
   });
   const infoWindow = new google.maps.InfoWindow({
     content: name
   });
   marker.addListener('click', function() {
     infoWindow.open(userMap, marker);
   });
  };
})(window);
