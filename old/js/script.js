var mapid = L.map('mapid').setView([41.386956, 2.170003], 16);
var layerGroup = L.layerGroup().addTo(mapid);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(mapid);

L.control.scale().addTo(mapid);

function onMapClick(e) {
    // console.log(e.latlng);  
    layerGroup.clearLayers();
    mapid.setView(e.latlng, 42);
    L.marker([e.latlng["lat"], e.latlng["lng"]], { draggable: true }).addTo(layerGroup);
        popup
            .setLatLng({"lat":e.latlng["lat"]+0.0001, "lng":e.latlng["lng"]})
            .setContent("Mis coordenadas son:<br><strong>Lat:" + e.latlng["lat"]+"  Len:"+e.latlng["lng"])
            .openOn(mapid);
            
}
var popup = L.popup();
mapid.on('click', onMapClick);
