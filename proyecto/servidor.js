var fs=require('fs');
var express=require('express');
var app = express();
var registro=new Array();

function leer(pagina){
	return fs.readFileSync(pagina,'utf-8');
}

function dar_posiciones(){
	var copia_registro=registro;
	for (i=0;i<copia_registro.length;i++){
		contador=0;
		for j in copia_registro{
			if (contador=0){
				mayor=j;
			}
			if(copia_registro[j].puntos>copia_registro[mayor].puntos){
				mayor=j;
			}
			contador++;
		}
		registro[mayor].pos=i;
		copia_registro.splice(mayor);
	}
	console.log(registro);
	 
}

app.get('/', function (req, res) {   
	res.send(leer('index.html'));
});

app.get('/entrar', function (req, res) {   
	res.send(leer('entrar.html'));
});

app.get('/new', function (req, res) {   
	res.send(leer('new.html'));
});

app.get('/zona', function (req, res) {   
	res.send(leer('PaginaUsuario.html'));
});

app.get('/jugar/:id/:id2', function (req, res) {   
	res.send(leer('PaginaUsuario.html'));
});

app.get('/ranking', function (req, res) {   
	dar_posiciones();
	res.send(leer('PaginaUsuario.html'));
});

app.put('/log/:id/:id2', function (req, res) { 
	usuario=req.params.id;
	pass=req.params.id2;
	if (registro[usuario]==undefined){	
		registro[usuario]={'password': pass, 'puntos':Math.random(), 'pos':0};
		console.log('Nuevo usuario añadido\n'+req.params.id);
		res.send('1');
		console.log(registro);
	}
	else{
		res.send('0');
		console.log(registro);
	}
});

app.post('/log/:id/:id2', function (req, res) { 
	usuario=req.params.id;
	pass=req.params.id2;
	if (registro[usuario].password==pass){	
		console.log('Nuevo acceso');
		res.send('1');
	}
	else{
		res.send('0');
	}
});

app.get('/ranking/:id', function (req, res) {
	res.send('{"puntos" : '+registro[req.params.id].puntos+' }\n');
	console.log(registro[req.params.id].puntos);
});

var port=process.env.PORT || 5000;
app.listen(port);
console.log('Server running at http://127.0.0.1:'+port+'/');