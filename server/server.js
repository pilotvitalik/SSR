require('dotenv').config();
const http = require('http');
const axios = require('axios');
const mysql = require('mysql2');

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const connection = mysql.createConnection({
	host: process.env.HOST_DB,
	user: process.env.USER,
	database: process.env.DB,
	password: process.env.PASWD
});

const server = http.createServer((req, res) => {
	if (req.url === '/favicon.ico') return false;
	console.log(req.url);
	sendReq(res);
});

async function sendReq(res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
		connection.query(
			'describe `route`',
		function (err, results, fields) {
			res.end(JSON.stringify(results));
			if (err) {
				console.log('ERROR');
				console.log(results);
			}
		}

	)
		;
}


server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
})