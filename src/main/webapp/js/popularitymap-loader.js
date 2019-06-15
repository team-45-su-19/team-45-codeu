(function(exports){
    var pos=[];
    var map;
    exports.createMap = function (){
        map = new google.maps.Map(document.getElementById('map'), {
            //the map is initially set to have a view of Singapore
            center: {lat: 1.34, lng: 103.8},
            zoom: 12
        });
        map.addListener('click', (event) => {
            createMarker(event.latLng.lat(), event.latLng.lng());
            postMarker(event.latLng.lat(), event.latLng.lng());
        });
        fetchMarkers();
        var heatmapbutton = document.getElementById("heatmap");
        heatmapbutton.onclick = showHeatMap;
    }

    function fetchMarkers(){
        fetch('/markers').then((response) => {
            return response.json();
        }).then((markers) => {
            markers.forEach((marker) => {
                pos.push([marker.lat, marker.lng]);
                createMarker(marker.lat, marker.lng);
            });
        });
    }

    function createMarker(lat, lng){
        const marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map
        });
    }

    function postMarker(lat, lng){
        pos.push([lat,lng]);
        const params = new URLSearchParams();
        params.append('lat', lat);
        params.append('lng', lng);
        fetch('/markers', {
            method: 'POST',
            body: params
        });
    }

    function showHeatMap() {
        var heatmapData = [];
        pos.forEach((marker)=>{
            heatmapData.push(new google.maps.LatLng(marker[0], marker[1]));
        })
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData
        });
        heatmap.setMap(map);
    }
})(window);
