var globalMap;

function initMap() {
	L.mapquest.key = 'cqknkkaMme9j37I5pUmC1ypE9pLVfozR';

	globalMap = L.mapquest.map('map', {
		center: [26.471196, -81.810648],
		layers: L.mapquest.tileLayer('map'),
		zoom: 14
	});

	console.log(globalMap);

	globalMap.attributionControl._map

	globalMap.addControl(L.mapquest.control());
	//map.addLayer(L.mapquest.trafficLayer());
	//map.addLayer(L.mapquest.incidentsLayer());

}

window.onload = function () {
	initMap();

}

function displayDetails() {

}

function panMap(lat, lon) {
	globalMap.panTo({ lat: lat, lon: lon })
}


var placeSearch = placeSearch({
	key: 'cqknkkaMme9j37I5pUmC1ypE9pLVfozR',
	container: document.querySelector('#place-search-input')
});

placeSearch.on('change', (e) => {

	console.log(e);
	const lat = e.result.latlng.lat;
	const lon = e.result.latlng.lng;

	panMap(lat, lon);


});


