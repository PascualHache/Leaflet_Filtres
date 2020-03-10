var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 16);
map.locate({setView: true, maxZoom: 17});

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

var layerGroup = L.layerGroup().addTo(map);


var popup = L.popup();
//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];
var kind_food_selector = [];
var db_parsed = {};

//generación de la base de datos
// $(document).ready(function () {
// 	$.ajax({
// 		type: "GET",
// 		dataType: "json",
// 		async: false,
//         cache: false,
// 		url: "api/apiRestaurants.php",
// 		success: function (data) {
// 			// alert('Get Success');
// 			console.log(data);
// 			db_parsed = data;
// 		}
// 	});
// });
function getDB(){
return $.ajax({
	type: "GET",
	dataType: "json",
	async: false,
	cache: false,
	url: "api/apiRestaurants.php",
	success: function (data) {
		// alert('Get Success');
		console.log(data);
		db_parsed = data;
	}
});
}


//obtención de array de tipos de restaurantes
function getKindRest() {
	$(db_parsed).each(function (index) {
		var res = db_parsed[index]["kind_food"].split(',');
		for (let n = 0; n < res.length; n++) {
			if (kind_food_selector.indexOf(res[n]) !== -1) {
			} else {
				kind_food_selector.push(res[n]);
			}
		};
	}); 
	return kind_food_selector
	// console.log(kind_food_selector)
}

//Obtención de objeto con los restautrantes filtrado por tipo (entrada) 
function getRestByKind(kind) {
	let result=[];
	if (kind == "all") {
		$(db_parsed).each(function (index) {
			result.push(db_parsed[index]);
		});
	} else {
		$(db_parsed).each(function (index) {
			var res = db_parsed[index]["kind_food"].split(',');
			if (res.includes(kind)) {
				
				result.push(db_parsed[index]);
			}
		});
	} //drawByObj(result);
	return result;
}

//Función que pinta markers en función de objeto pre filtrado(entrada)
function drawByObj(inputDb){
	// layerGroup.clearLayers();
	// loadSelectOptions();
	$(inputDb).each(function (index) {
		L.marker([inputDb[index].lat, inputDb[index].lng], { draggable: true }).addTo(layerGroup);
		// L.marker([41.400, 2.206], { draggable: true }).addTo(layerGroup);
        popup
            .setLatLng({"lat":parseInt(inputDb[index].lat), "lng":inputDb[index].lng})
            .setContent("<strong>" + inputDb[index].name+"<br>"+inputDb[index].kind_food)
			.openOn(map);
	}); 
	
	// map.setView(new L.LatLng(41.400, 2.206));
}

//Permite enfocar todos los marcadores en pantalla
function fitFocusScreen(inputDb){
	let position = [];
	for (let index = 0; index < inputDb.length; index++) {
		position.push(L.latLng(inputDb[index].lat, inputDb[index].lng));
	}

	bounds = L.latLngBounds(position);
	map.fitBounds(bounds);
}

//Pinta las opciones en el select
function loadSelectOptions(){
	let arr = getKindRest();
	select = document.getElementById('kind_food_selector');
	while (select.firstChild) {
		select.removeChild(select.lastChild);
	  }

	var opt = document.createElement('option');
	opt.innerHTML = "Todos";
	select.appendChild(opt);
	
	for (let index = 0; index < arr.length; index++) {
		opt = document.createElement('option');
		opt.value=arr[index];
		opt.innerHTML = arr[index];
		select.appendChild(opt);
	}
	
}

$.when(getDB()).done(function(data){
	console.log("Pausa!");
	loadSelectOptions();
	drawByObj(getRestByKind('all'));
	fitFocusScreen(db_parsed);
	

});

function onMapLoad() {

	console.log("Mapa cargado");
	

    /*
	FASE 3.1
		1) Relleno el data_markers con una petición a la api
		2) Añado de forma dinámica en el select los posibles tipos de restaurantes
		3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
	*/

}

$('#kind_food_selector').on('change', function () {
	// var optionSelected = $("option:selected", this);
    // var valueSelected = this.value;
	console.log(this.value);
	layerGroup.clearLayers();
	drawByObj(getRestByKind(this.value));
	// document.getElementById('#kind_food_selector').value = valueSelected;
	render_to_map(data_markers, this.value);
});



function render_to_map(data_markers, filter) {
	if (filter == "all"){
		console.log("all");
		getRestByKind("all");
	} else{
		console.log(filter);
		getRestByKind(filter);
	}
	/*
	FASE 3.2
		1) Limpio todos los marcadores
		2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa
	*/

}