const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	res.json({
		message: "TRAFFIC IS COOL 🚦"
	});
});

app.post('/', (req, res) => {
	console.log(res.body);
});

app.listen(5000, () => {
	console.log("Listening on localhost:5000");
});