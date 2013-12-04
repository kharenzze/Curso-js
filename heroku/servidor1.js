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
 // res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
  res.end(documento);
  contador++;
  console.log(contador);
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');