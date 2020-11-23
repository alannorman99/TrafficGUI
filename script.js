
L.mapquest.key = 'cqknkkaMme9j37I5pUmC1ypE9pLVfozR';

var map = L.mapquest.map('map', {
	center: [41.3423, -81.3423],
	layers: L.mapquest.tileLayer('map'),
	zoom: 14
});

map.addControl(L.mapquest.control());
//map.addLayer(L.mapquest.trafficLayer());
//map.addLayer(L.mapquest.incidentsLayer());


var placeSearch = placeSearch({
	key: 'cqknkkaMme9j37I5pUmC1ypE9pLVfozR',
	container: document.querySelector('#place-search-input')
});

placeSearch.on('change', (e) => {

	console.log(e);
	const lat = e.result.latlng.lat;
	const lon = e.result.latlng.lng;

	map.panTo({ lat: lat, lon: lon })


});


