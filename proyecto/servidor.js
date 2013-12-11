var fs=require('fs');
var express=require('express');
var app = express();
var registro=new Array();

function leer(pagina){
	return fs.readFileSync(pagina,'utf-8');
}

app.get('/', function (req, res) {   
	res.send(leer('index.html'));
});

app.get('/proc', function (req, res) {   
	res.send('No es la portada');
});

app.get('/new', function (req, res) {   
	res.send(leer('new.html'));
});

app.post('/log/:id/:id2', function (req, res) { 
	usuario=req.params.id;
	pass=req.params.id2;
	if (registro[usuario]==undefined){	
		registro[usuario]=pass;
		console.log('Nuevo usuario añadido\n'+req.params.id);
		res.send('1');
		console.log(registro);
	}
	else{
		res.send('0');
		console.log(registro);
	}
});

var port=process.env.PORT || 5000;
app.listen(port);
console.log('Server running at http://127.0.0.1:'+port+'/');