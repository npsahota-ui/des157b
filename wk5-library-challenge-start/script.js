(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([38.02, -121.8], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.latlong.net/c/?lat=38.016911&long=-121.813766" target="_blank">(38.016911, -121.813766)</a>'
    }).addTo(map);

    var marker = L.marker([38.3, -122.1]).addTo(map);

    var circle = L.circle([37.02, -120.8], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    var polygon = L.polygon([
        [38.7, -121.9],
        [38.5, -121.6],
        [38.2, -121.1]
    ]).addTo(map);

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    var popup = L.popup()
    
    function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }

    map.on('click', onMapClick);
    
}());