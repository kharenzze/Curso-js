//definicion del objeto vuelta
function vuelta(sector1,sector2,sector3){
    this.sectores= new Array(sector1,sector2,sector3);
    this.vuelta=sector3+sector1+sector2;
}

//funcion que calcula el tiempo medio de vuelta dado un corredor
function tiempo_medio(corredor){
    var media=0, i;
    for (i in corredor){
        media=media+corredor[i].vuelta;
    }
    media=media/i;      //dividimos entre i, que tras pasar el bucle tiene el valor del total de vueltas

    return media;
}

//funcion que devuelve el mejor tiempo y el nombre del piloto que ha hecho una vuelta rapida
function calcula_vuelta_rapida(Pilotos){
    for (i in Pilotos)
        for(j in Pilotos[i]){
            if(vuelta_rapida==undefined)
                vuelta_rapida={piloto : i, tiempo : Pilotos[i][j].vuelta};
            if(Pilotos[i][j].vuelta<vuelta_rapida.tiempo){
                vuelta_rapida.tiempo=Pilotos[i][j].vuelta;
                vuelta_rapida.piloto=i;
            }
        }
    return vuelta_rapida;
}


//cargamos los datos del fichero
var FileReader = java.io.FileReader;
var BufferedReader =java.io.BufferedReader;

var file_name = arguments[0];

var f = new FileReader(file_name);
var br = new BufferedReader( f );
var resultados= new Array;
var line = new String;
var Pilotos=new Array;          //vector de pilotos
while ((line = br.readLine()) != null){
    eval('var entrada='+line);  //cada linea del fichero de datos contiene un objeto, que almacenaremos en la variable entrada.
    if(Pilotos[entrada.piloto]==undefined)
        Pilotos[entrada.piloto]=new Array();        //cada piloto tendra un vector de vueltas
    Pilotos[entrada.piloto][entrada.vuelta]=new vuelta(entrada.sector1,entrada.sector2,entrada.sector3);
}

//ahora mostramos los resultados

print('Tiempos medios\n');
for (i in Pilotos){
    time=tiempo_medio(Pilotos[i]);
    if(time%60>=10)
        print(i + '  '+Math.floor(time/60) + ':'+ time%60);     
    else
        print(i + '  '+Math.floor(time/60) + ':0'+ time%60);        //si los segundos son menores que 10, mostraria algo como 2:3.660000000. Lo arrglamos añadiendo el 0
}                                                                   //asi, mostrará 2:03.66000000

var vuelta_rapida=calcula_vuelta_rapida(Pilotos);
if(vuelta_rapida.tiempo%60>=10)
    print('\nVuelta rapida: ' + vuelta_rapida.piloto + '  '+ Math.floor(vuelta_rapida.tiempo/60)+ ':' +vuelta_rapida.tiempo%60);
else
    print('\nVuelta rapida: ' + vuelta_rapida.piloto + '  '+ Math.floor(vuelta_rapida.tiempo/60)+ ':0' +vuelta_rapida.tiempo%60);