var fs=require('fs');
var express=require('express');
var app = express();
var registro=new Array();

registro['bbbb']={'password': 'a', 'puntos':Math.random(), 'pos':0};
registro['a']={'password': 'a', 'puntos':Math.random(), 'pos':0};
registro['bb']={'password': 'a', 'puntos':Math.random(), 'pos':0};
registro['bbb']={'password': 'a', 'puntos':Math.random(), 'pos':0}

function leer(pagina){
	return fs.readFileSync(pagina,'utf-8');
}


function dar_posiciones(){
	var v_nombres=new Array();	// creamos un vector con los nombres de usuario
	var indice=0;
	for(i in registro){			//y lo rellenamos
		v_nombres[indice]=i;
		indice++;
	}
	tamano=v_nombres.length;	//almacenamos el tamaño del vector
	for (i=0;i<tamano;i++){		//vamos recorriendo el vector para ver quien tiene mas puntos, y le asignamos una posicion en el ranking
		for (j in v_nombres){
			if (j==0){
				mayor=j;
			}
			if(registro[v_nombres[j]].puntos>registro[v_nombres[mayor]].puntos){
				mayor=j;
			}
		}
		registro[v_nombres[mayor]].pos=i;
		v_nombres.splice(mayor,1);			//quitamos los usuarios que ya tienen una posicion asignada y repetimos el bucle
	}
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
	console.log(registro);
	res.send(leer('PaginaUsuario.html'));
});

app.put('/log/:id/:id2', function (req, res) { 
	usuario=req.params.id;
	pass=req.params.id2;
	if (registro[usuario]==undefined){	
		registro[usuario]={'password': pass, 'puntos':Math.random(), 'pos':0};
		console.log('Nuevo usuario añadido\n'+req.params.id);
		res.send('1');
	}
	else{
		res.send('0');
	}
});

app.post('/log/:id/:id2', function (req, res) { 
	usuario=req.params.id;
	pass=req.params.id2;
	if (registro[usuario]==undefined){
		res.send('0');
	}
	else if (registro[usuario].password==pass){	
		console.log('Nuevo acceso');
		res.send('1');
	}
	else{
		res.send('0');
	}
});

app.get('/ranking/:id', function (req, res) {
	res.send('{"puntos" : '+registro[req.params.id].puntos+' }\n');
});

var port=process.env.PORT || 5000;
app.listen(port);
console.log('Server running at http://127.0.0.1:'+port+'/');