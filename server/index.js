const express = require('express');
const cors = require('cors');
const monk = require('monk');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();

const db = monk('localhost/TrafficDB');

const accounts = db.get('accounts');

const middlewares = require('./middlewares');

app.use(morgan('common'));
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
	res.json({
		message: "TRAFFIC IS COOL 🚦"
	});
});

app.get('/accounts', (req, res) => {
	accounts
		.find()
		.then(accounts => {
			res.json(accounts)
		});
});

function isValidAccount(account) {
	return account.email && account.email.toString().trim() != '' &&
		account.username && account.username.toString().trim() != '' &&
		account.password && account.password.toString().trim() != '';
}

function isValidEmail(email) {
	if (email.includes('@') && email.includes('.')) {
		return true;
	} else {

		return false;
	}
}

function isValidUsername(username) {
	return true;
}

const limiter = rateLimit({
	windowMs: 30 * 1000,
	max: 1
});

app.post('/accounts', (req, res) => {
	console.log(req.body);
	if (isValidAccount(req.body)) {


		if (isValidEmail(req.body.email) && isValidUsername(req.body.username)) {
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
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(5000, () => {
	console.log("Listening on localhost:5000");
});