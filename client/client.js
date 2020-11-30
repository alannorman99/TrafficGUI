
const account_form = document.querySelector('.account-form');
const login_form = document.querySelector('.login-form');
const logout = document.querySelector('.logout');
const create_account = document.querySelector('.create-account');
const loginWindow = document.querySelector('.login-window');

const API_URL = 'http://localhost:5000/accounts';

var globalMap;

login_form.style.display = 'none';

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

	console.log(localStorage.getItem("isUserLoggedIn"));
	if (localStorage.getItem("isUserLoggedIn") === null) {

		var currentUser = {
			email,
			username,
			password,
		};
		console.log(JSON.stringify(currentUser));
		localStorage.setItem("currentUser", JSON.stringify(currentUser));

		var loggedIn;
		localStorage.setItem("loggedIn", loggedIn);

	}

	console.log("Is user logged in: " + localStorage.getItem("loggedIn"));

	var user = localStorage.getItem("currentUser");
	console.log(("User: ", user));

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

logout.addEventListener('click', (event) => {
	localStorage.clear();
	console.log("Logged out and storage cleared!");
	login_form, style.display = '';
});

loginWindow.addEventListener('click', (event) => {
	account_form.style.display = 'none';
	login_form.style.display = '';
});

create_account.addEventListener('click', (event) => {
	login_form.style.display = 'none';
	account_form.style.display = '';
});


login_form.addEventListener('submit', (event) => {
	//getting the form elements
	event.preventDefault();
	const loginData = new FormData(login_form);
	const username = loginData.get('login-username');
	const password = loginData.get('login-password');

	let test = localStorage.getItem("loggedIn");
	console.log("Test Value: " + test);

	if (test === true) {
		//set window to that users page
		alert(`${username} is already logged in`);
	} else {
		//check if someone just logged in/ if not then load normal page
		fetch(API_URL)
			.then(res => res.json())
			.then(accounts => {
				const usernameFound = accounts.some(account => account.username === username);
				if (!usernameFound) {
					alert(`The username ${username} doesn't exist`);
					loggedIn = localStorage.getItem("loggedIn");
					loggedIn = false;
					localStorage.setItem("loggedIn", loggedIn);
					return;
				} else {

					var result = accounts.filter(account => {
						return account.username === username;
					});

					console.log(password);

					if (result[0].password === password) {
						loggedIn = localStorage.getItem("loggedIn");
						loggedIn = true;
						localStorage.setItem("loggedIn", loggedIn);
						localStorage.setItem("isUserLoggedIn", true);

						currentUser = localStorage.getItem("currentUser");
						var userObject = JSON.parse(currentUser);

						userObject.email = result[0].email;
						userObject.username = result[0].username;
						userObject.password = result[0].password;
						localStorage.setItem("currentUser", JSON.stringify(userObject));
						return;
					} else {
						alert("The password is incorrect!");
						loggedIn = localStorage.getItem("loggedIn");
						loggedIn = false;
						localStorage.setItem("loggedIn", loggedIn);
						return;
					}
				}

			});
	}

});


account_form.addEventListener('submit', (event) => {
	//getting the form elements
	event.preventDefault();
	const accountData = new FormData(account_form);
	const email = accountData.get('email');
	const username = accountData.get('username');
	const password = accountData.get('password');

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