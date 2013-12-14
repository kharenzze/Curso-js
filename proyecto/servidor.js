//************************************************************************************************************************/
// Servidor de la aplicacion Trivial. Creado por Pablo Ráez Sánchez  

//************************************************************************************************************************/

//	REQUIRES

var fs=require('fs');
var express=require('express');

//	FUNCIONES

//funcion creada para hacer mas comoda la lectura. Utiliza una lectura sincrona
function leer(pagina){
	return fs.readFileSync(pagina,'utf-8');
}

//esta funcion se encarga de asignar una posicion en el ranking a cada usuario, y ademas
//crea una tabla en formato html con el ranking ordenado
function dar_posiciones(){
	var v_nombres=new Array();	// creamos un vector con los nombres de usuario
	var indice=0;
	tabla_html="<tr><th>Posicion</th><th>Usuario</th><th>Puntos</th></tr>";
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
		tabla_html=tabla_html+"<tr><th>"+parseInt(i+1)+"</th><th>"+v_nombres[mayor]+"</th><th>"+registro[v_nombres[mayor]].puntos+"</th></tr>"
		v_nombres.splice(mayor,1);			//quitamos los usuarios que ya tienen una posicion asignada y repetimos el bucle
	}
}

//	INICIALIZACION DE VARIABLES GLOBALES

var app = express();
var registro=new Array();
var tabla_html;
eval("var trivial="+leer('trivial.json'));

//	GESTION HTTP


//*****************************************************************************/
// Inicio
//*****************************************************************************/

app.put('/log/:id/:id2', function (req, res) { //creacion de un nuevo usuario
	usuario=req.params.id;
	pass=req.params.id2;
	if (registro[usuario]==undefined){	//si el usuario no existe, se crea	
		registro[usuario]={'password': pass, 'puntos':0, 'pos':0};
		console.log('Nuevo usuario añadido\n'+req.params.id);
		res.send('1');//OK
	}
	else{	//de lo contrario, se manda un error.
		res.send('0');
	}
});

app.get('/', function (req, res) {   
	res.send(leer('index.html'));
});

app.get('/entrar', function (req, res) {   
	res.send(leer('entrar.html'));
});

app.get('/new', function (req, res) {   
	res.send(leer('new.html'));
});

app.post('/log/:id/:id2', function (req, res) { //acceso de un usuario
	usuario=req.params.id;
	pass=req.params.id2;
	if (registro[usuario]==undefined){//si no existe
		res.send('0');
	}
	else if (registro[usuario].password==pass){	//si existe y es correcto
		console.log('Nuevo acceso');
		res.send('1');
	}
	else{//si la combinacion user-pass no es correcta
		res.send('0');
	}
});

//*****************************************************************************/
// Zona de usuario
//*****************************************************************************/

app.get('/zona', function (req, res) {   
	res.send(leer('PaginaUsuario.html'));
});

app.get('/ranking', function (req, res) {   //ranking completo
	dar_posiciones();
	res.send(leer('ranking1.html')+tabla_html+leer('ranking2.html'));//el archivo esta dividido en dos, y en medio incrustamos la tabla generada. 
});

app.get('/ranking/:id', function (req, res) {//puntos de un usuario
	res.send('{"puntos" : '+registro[req.params.id].puntos+' }\n');
});

//*****************************************************************************/
// Juego
//*****************************************************************************/

app.get('/jugar', function (req, res) {   
	res.send(leer('jugar.html'));
});

app.get('/pregunta', function (req, res) {  //peticion de una pregunta para jugar 
	indice=Math.floor(Math.random()*(trivial.length-1));
	res.send("{texto:"+"'"+trivial[indice].texto+"'"+",id_pregunta:"+indice+"}");
});

app.post('/comprobacion/:user/:id_pregunta/:respuesta',function (req,res){//comprobacion de la respuesta del usuario
	if(req.params.respuesta=='timeout'){
		res.send(leer('error.html'));
		registro[req.params.user].puntos-=5;
	}
	else if(req.params.respuesta==trivial[req.params.id_pregunta].sol){
		res.send(leer('correcto.html'));
		registro[req.params.user].puntos+=10;
	}
	else{
		res.send(leer('error.html'));
		registro[req.params.user].puntos-=11;
	}
});


//	PARAMETROS DEL SERVIDOR

var port=process.env.PORT || 5000;
app.listen(port);
console.log('Server running at http://127.0.0.1:'+port+'/');