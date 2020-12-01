//Dependencies
const express = require('express');
const cors = require('cors');
const monk = require('monk');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

//app/database connections
const app = express();
const db = monk('localhost/TrafficDB');
const accounts = db.get('accounts');

//file connections
const middlewares = require('./middlewares');

//Functionality of dependencies
app.use(morgan('common'));
app.use(cors());
app.use(express.json())

//Simple get request for the '/' route
app.get('/', (req, res) => {
	res.json({
		message: "TRAFFIC IS COOL 🚦"
	});
});

//Get request to return all objects in database as array of json objects
app.get('/accounts', (req, res) => {
	accounts
		.find()
		.then(accounts => {
			res.json(accounts)
		});
});

//Confirms the form has some information and isn't blank on submit
function isValidAccount(account) {
	return account.email && account.email.toString().trim() != '' &&
		account.username && account.username.toString().trim() != '' &&
		account.password && account.password.toString().trim() != '';
}

//Checks if the user's input is valid
function isValidEmail(email) {
	if (email.includes('@') && email.includes('.')) {
		return true;
	} else {

		return false;
	}
}

//Tests if the user's input is valid
function isValidUsername(username, password) {
	if (username.includes(password)) {
		return false;
	} else {
		return true;
	}
}

//A basic limiter so users can't spam the server with requests
const limiter = rateLimit({
	windowMs: 30 * 1000,
	max: 1
});
app.use(limiter);

//Searches the database collection for any accounts with matching information
function findAccount(email, username, password) {

	let found;

	accounts.findOne({ username: username }, { email: email }, { password: password })
		.then((res) => {
			if (res != null) {
				console.log("yes");
				found = true;
				return found;
			} else {
				console.log("no");
				found = false;
				return found;
			}
		});

}

//post route for adding new accounts to the database
app.post('/accounts', (req, res) => {

	if (findAccount(req.body.email, req.body.username, req.body.password)) {
		alert("Account already exists!")
	} else {

		if (isValidAccount(req.body)) {
			if (isValidEmail(req.body.email) && isValidUsername(req.body.username, req.body.password)) {
				console.log("Email is " + req.body.email);

				const account = {
					email: req.body.email.toString(),
					username: req.body.username.toString(),
					password: req.body.password.toString(),
					created: new Date(),
				};

				accounts
					.insert(account)
					.then(createdAccount => {
						res.json(createdAccount);
					});
			} else {
				res.status(422);
				res.json({
					message: "Enter valid content into the form..."
				});
				alert("Invalid Input");
			}
		}
	}
});

//basic middleware functions to handle errors on route requests
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

//Set up server to listen on local host post 5000
app.listen(5000, () => {
	console.log("Listening on localhost:5000");
});