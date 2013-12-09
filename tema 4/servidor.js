var express=require('express');
var app = express();

app.get('/', function (req, res) {   
	res.send('Portada');
});

app.get('/proc', function (req, res) {   
	res.send('No es la portada');
});

app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');