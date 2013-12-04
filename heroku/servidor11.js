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

	console.log(req.headers.accept);
	console.log('\n\n\naaaaaaaa\n\n\n');

	if(req.headers.accept!='*/*'){
		contador++;
	}

	res.writeHead(200);
	res.write(documento+'\n<div>visitas '+contador+'</div>');
	res.end('\n</body>\n</html>');
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');