const express = require('express');
const app = express();
const SHA256 = require("crypto-js/sha256");
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;
const nonce_max = 10000;
const nonce_min = 15000;

app.use(express.static('./assets'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req,res) =>{
	res.sendFile(__dirname + '/index.html');
});

app.post('/hash', (req,res) => {
	let value = req.body.value;
	let hash = SHA256(value).toString();
	res.send({
		hash
	});
});

app.get('/genesis', (req,res) => {
	res.send({
		block: 0,
		nonce: 11316,
		data: '',
		prev: '0000000000000000000000000000000000000000000000000000000000000000',
		hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
	});
});

app.post('/addnewblock', (req,res) => {
	let block = req.body.block;
	
	var newBlock = ++block;
	var prev = req.body.prev;
	var nonce = Math.floor(Math.random()*(nonce_max-nonce_min+1)+nonce_min);
	var hash = req.body.hash;
	var data = req.body.data;

	res.send({
		block: newBlock,
		nonce,
		data: data,
		prev,
		hash
	})
});


app.listen(port,()=>{
	console.log('Block chain application has statred on port'+port);
});