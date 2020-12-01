//Variables to hold html elements for use with javascript
const account_form = document.querySelector('.account-form');
const login_form = document.querySelector('.login-form');
const logout = document.querySelector('.logout');
const create_account = document.querySelector('.create-account');
const loginWindow = document.querySelector('.login-window');
const route_form = document.querySelector('.route-form');


//URL for fetch requests intended for the database
const API_URL = 'http://localhost:5000/accounts';

//global map variable
var globalMap;
var direction;

login_form.style.display = 'none';

//Function to create an initial map and center it on Estero
function initMap() {

	//May need to swap with a personal key from mapquest.com
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

//Function to create a route with the user entered start and end
function createRoute(start, end) {

	try {
		direction = L.mapquest.directions();

		direction.route({

			start: start,
			end: end,
			options: {
				timeOverage: 25,
				maxRoutes: 3,
			}

		});

		var directionsLayer = L.mapquest.directionsLayer({
			directionsResponse: response
		}).addTo(globalMap);
	} catch (error) {
		console.log(error);
	}
}

//Function that executes everytime the window loads for any reasons
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

//Function to move the map when a new location is selected in the search bar
function panMap(lat, lon) {
	globalMap.panTo({
		lat: lat,
		lon: lon
	})
}

//Creates the search bar
var placeSearch = placeSearch({
	key: 'cqknkkaMme9j37I5pUmC1ypE9pLVfozR',
	container: document.querySelector('#place-search-input')
});

//Detects interaction with the search bar and returns 
placeSearch.on('change', (e) => {

	console.log(e);
	const lat = e.result.latlng.lat;
	const lon = e.result.latlng.lng;

	panMap(lat, lon);


});


//Event listeners for the basic buttons
logout.addEventListener('click', (event) => {
	localStorage.clear();
	console.log("Logged out and storage cleared!");
	login_form.style.display = 'none';
});

loginWindow.addEventListener('click', (event) => {
	account_form.style.display = 'none';
	login_form.style.display = '';
});

create_account.addEventListener('click', (event) => {
	login_form.style.display = 'none';
	account_form.style.display = '';
});

//Listener for the route generator to get the start and end point of the desired route
route_form.addEventListener('submit', (event) => {

	try {
		//getting the form elements
		event.preventDefault();
		const loginData = new FormData(route_form);
		const start = loginData.get('start');
		const end = loginData.get('end');

		if (start.toString().trim() === "" || end.toString().trim() === "") {
			alert("Enter valid address: (123 main street, Estero, Florida)")
		} else {
			createRoute(start, end);
		}

	} catch (error) {

		console.log(error);
	}


});

//Login form event listener to detect when a user wants to login
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
						alert(`${result[0].username} logged in`)
						currentUser = localStorage.getItem("currentUser");
						var userObject = JSON.parse(currentUser);

						userObject.email = result[0].email;
						userObject.username = result[0].username;
						userObject.password = result[0].password;
						localStorage.setItem("currentUser", JSON.stringify(userObject));

						login_form.reset();
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

//Listener to detect if the user entered valid account information and the sends the data to the server
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
			account_form.reset();
			setTimeout(() => {
				account_form.style.display = '';
			}, 3000);
		});
});