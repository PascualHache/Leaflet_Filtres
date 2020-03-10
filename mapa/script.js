var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 16);
map.locate({ setView: true, maxZoom: 17 });

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
var layerGroup = L.layerGroup().addTo(map);
var popup = L.popup();

//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];
var kind_food_selector = [];
var db_parsed = {};

function getDB() {
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
}

//Obtención de objeto con los restaurantes filtrado por tipo (entrada) 
function getRestByKind(kind) {
	let result = [];
	if (kind == "Todos") {
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
	}
	return result;
}

//Función que pinta markers en función de objeto pre filtrado(entrada)
function drawByObj(inputDb) {
	$(inputDb).each(function (index) {
		data_markers.push(L.marker([inputDb[index].lat, inputDb[index].lng], {
			draggable: false,
		}).bindPopup("<strong>" + inputDb[index].name + "</strong><br>" + inputDb[index].address + "<br>" + inputDb[index].kind_food).addTo(layerGroup));
	});
}

//Permite enfocar todos los marcadores en pantalla
function fitFocusScreen(inputDb) {
	let position = [];
	for (let index = 0; index < inputDb.length; index++) {
		position.push(L.latLng(inputDb[index].lat, inputDb[index].lng));
	}
	bounds = L.latLngBounds(position);
	map.fitBounds(bounds);
}

//Pinta las opciones en el select
function loadSelectOptions() {
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
		opt.value = arr[index];
		opt.innerHTML = arr[index];
		select.appendChild(opt);
	}
}

$.when(getDB()).done(function (data) {
	loadSelectOptions();
	drawByObj(getRestByKind('Todos'));
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
	data_markers = [];
	console.log(this.value);
	layerGroup.clearLayers();
	drawByObj(getRestByKind(this.value));
	fitFocusScreen(db_parsed);
	render_to_map(data_markers, this.value);
	updateHTMLList(getRestByKind(this.value));
});

function render_to_map(data_markers, filter) {
	if (filter == "Todos") {
		console.log("Todos");
		getRestByKind("Todos");
	} else {
		console.log(filter);
		getRestByKind(filter);
	}
	/*
	FASE 3.2
		1) Limpio todos los marcadores
		2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa
	*/
}

function updateHTMLList(db_parsed) {
	select = document.getElementById('theList');
	while (select.firstChild) {
		select.removeChild(select.lastChild);
	}
	for (let index = 0; index < db_parsed.length; index++) {
		document.getElementById('theList').innerHTML += ('<li>' + db_parsed[index].name + " / " + db_parsed[index].address + " / " + db_parsed[index].kind_food + '</li>');
	}
}