const account_form = document.querySelector('.account-form');
const login_form = document.querySelector('.login-form');

const API_URL = 'http://localhost:5000/accounts';

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
	addRoute();
}

function addRoute() {

}

function panMap(lat, lon) {
	globalMap.panTo({
		lat: lat,
		lon: lon
	})
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

form.addEventListener('submit', (event) => {
	//getting the form elements
	event.preventDefault();
	const formData = new FormData(account_form);
	const email = formData.get('email');
	const username = formData.get('username');
	const password = formData.get('password');

	const account = {
		email,
		username,
		password,
	};

	console.log(JSON.stringify(account));

	fetch(API_URL, {
		method: 'POST',
		body: JSON.stringify(account),
		headers: {
			'content-type': 'application/json'
		}
	}).then(res => res.json())
		.then(createAccount => {
			form.reset();
			setTimeout(() => {
				account_form.style.display = '';
			}, 3000);
		});

});