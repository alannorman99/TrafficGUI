window.onload = function () {
	L.mapquest.key = 'cqknkkaMme9j37I5pUmC1ypE9pLVfozR';

	var map = L.mapquest.map('map', {
		center: [26.471196, -81.810648],
		layers: L.mapquest.tileLayer('map'),
		zoom: 14
	});

	//map.addControl(L.mapquest.control());
	map.addLayer(L.mapquest.trafficLayer());
	//map.addLayer(L.mapquest.incidentsLayer());
}