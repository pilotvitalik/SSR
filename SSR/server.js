require('dotenv').config();
const http = require('http');
const axios = require('axios');

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
	if (req.url === '/favicon.ico') return false;
	sendReq(res);
});

async function sendReq(res){
	let obj = {};
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	try {
		const response = await axios.get(process.env.DATA_SHARE_SINGLE);
		obj.columns = response.data.boards.columns;
		obj.data = response.data.boards.data
		res.end(JSON.stringify(obj));
	} catch (err) {
		res.end(JSON.stringify(err));
	}
}


server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
})