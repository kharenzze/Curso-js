//guardamos la pagina index.html en la variable documento
fs = require('fs');
var documento;
fs.readFile('index.html', 'utf8', 
	    function(err,datos) {
		if (err) {
		    return console.log(err);
		};
		documento=datos;
		});

var http=require('http');
var contador=0;
http.createServer(function (req, res) {

	if(req.url=='/'){   //si lo que se pide es el texto html, sumamos 1. Se hace porque cuando se pide la pagina web se piden varios recursos. 
		contador++;
	}

	res.writeHead(200);		//mandamos el codigo http 200--> OK
	res.write(documento+'\n<br><div>visitas '+contador+'</div>');
	res.end('\n</body>\n</html>');
}).listen(8080, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8080/');

/*********************************************************************************************************
al documento html se le quita la parte de cerrar el body y el documento, para asi poder añadir la linea 
del contador de visitas al documento http. Despues, se manda el cierre del documento.

*********************************************************************************************************/