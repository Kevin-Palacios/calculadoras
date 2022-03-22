//q:)->-</:
var multiplicacion=1;
function crear(){
    

    document.getElementById("Tables").innerHTML = "";
    
    var i, j;

    var filas_col=0;

    //var columnas=0;
    

    filas_col=document.getElementById("filas_col").value;
    //columnas=document.getElementById("columnas").value;
    //var n_col=1+parseInt(columnas, 10);
    if(filas_col<2 || filas_col>10){
        alert("Ingresa un número entre 2 y 10");
        return false;
    }
    var n_j=0;

    var HTML = "<table border=0 width=80%>";

    HTML += "<tr><td rowspan="+filas_col+1+" align='center'>A=</td></tr>";

    for(i=0; i<filas_col; i++){
        
        HTML += "<tr>";
        for(j=0;j<filas_col;j++){
            /*
            n_j=parseInt(j,10)+1
            if(filas_col==j+1){
                HTML += "<td align=center>"+'<input type="text" id="x'+i+'_'+j+'" onkeypress="return valideKey(event, this);" style="width: 80px;" > </td>';
            }else if(parseInt(filas_col,10)-2==j){
                HTML += "<td align=center>"+'<input type="text" id="x'+i+'_'+j+'" onkeypress="return valideKey(event, this);" style="width: 80px;" ></td><td>x<sub>'+n_j+'</sub>=</td>';

            }else{
                HTML += "<td align=center>"+'<input type="text" id="x'+i+'_'+j+'" onkeypress="return valideKey(event, this);" style="width: 80px;"></td><td>x<sub>'+n_j+'</sub>+</td>';
            }
            */

            HTML += "<td align=center>"+'<input type="text" id="x'+i+'_'+j+'" onkeypress="return valideKey(event, this);" style="width: 80px;" > </td>';
            
        }
    
    }
    
    HTML += "</tr></table>";
    HTML += '<input id="btnCalcular" type="button" value="Aceptar" onclick="calcular()" ></input>';
    document.getElementById("Tables").innerHTML = HTML;

}

function calcular(){
    document.getElementById("Resultados").innerHTML = "";
    document.getElementById("Resultados").innerHTML = "";
    document.getElementById("Resultados2").innerHTML = "";
    document.getElementById("Resultados3").innerHTML = "";
    document.getElementById("Imprimir").innerHTML = "";

    var filas_col=0;
    //var columnas=0;
    var solucion=0;

    

    filas_col=document.getElementById("filas_col").value;
    //columnas=document.getElementById("columnas").value;
    //var n_col=1+parseInt(columnas, 10);

    var contador=0;
    var contador0=0;
    var contador02=0;
    for(i=0; i<filas_col; i++){
        for(j=0;j<filas_col;j++){
            if(document.getElementById("x"+i+"_"+j).value=="" || document.getElementById("x"+i+"_"+j).value=="-"){
                contador++;
            }else if(document.getElementById("x"+i+"_"+j).value==0){
                contador0++;
            }
        }

    }

    /*
    for (j = 0;  j< filas_col; j++) {
        for (i = 0; i < filas_col; i++) {
            if(document.getElementById("x"+i+"_"+j).value==0){
                contador02++;
            }
            
        }
        if(contador02==filas_col){
            alert("Pon por lo menos un número diferente de 0 en cada incógnita");
            return false;
        }
        contador02=0;
        
    }
    */
    if(contador>0||contador0==filas_col*filas_col){
        alert("rellena todas las ecuaciones con numeros");
        return false;
    }


    var matriz= new Array(filas_col);
    

    var i, j;

    for(i=0; i<filas_col; i++){
        matriz[i]= new Array(filas_col)
        for(j=0; j<filas_col;j++){
            matriz[i][j] = document.getElementById('x'+i+'_'+j+'').value;
        }
    }

    var matrizinversa=new Array(filas_col);
    for(i=0; i<filas_col; i++){
        matrizinversa[i]= new Array(filas_col)
        for(j=0; j<filas_col;j++){
            if(i==j){
                matrizinversa[i][j] = 1;
            }else{
                matrizinversa[i][j] = 0;
            }
            
        }
    }


    var matrizcuadrada;

    matrizcuadrada = matrizCuadrada(matriz, filas_col);


    var HTML = "<table border=0 width=80%>";

    for(i=0; i<matriz.length; i++){
        
        HTML += "<tr>";
        for(j=0;j<filas_col;j++){
            
            HTML += '<td align=center>'+matriz[i][j]+'</td>';
            
            
        }
    
    }
    
    HTML += "</tr></table>";
    
    document.getElementById("Resultados").innerHTML = HTML;
    //Hasta aca todo va bien

    var estado;//1-calcular inversa, 2-calcular determinante de a^2
    var pivote;
    var determinante, determinante2;

    estado=1;
    multiplicacion=1;
    bucle: for(i=0; i<matriz.length; i++){

        for(j=0; j<matriz[i].length;j++){

            //console.log("invoko al primer eliminar filas");
            if(!eliminarFilas(matriz, filas_col)){
                //console.log("saludos desde el if");
                document.getElementById("Resultados3").innerHTML = "El determinante es 0--------1";
                determinante=0;
                solucion=1;

                break bucle;

            }
            //console.log("saludos desde abajo del if");
            
            if(matriz[i][j]==0 && i==j && j!=filas_col){

                
                if(!ordenar(matriz, i, j, filas_col, estado, matrizinversa)){
                    //document.getElementById("Resultados3").innerHTML = "No tiene solución";
                    //console.log("No tiene solución");
                    determinante=0;
                    solucion=1;
    
                    break bucle;
    
                }
                //ordenar(matriz, i, j, n_col);
                
                pivote=matriz[i][j];
                if(!operacion(matriz, i, j, filas_col, pivote, estado, matrizinversa)){
                    document.getElementById("Resultados3").innerHTML = "El determinante es 0----------2";
                    determinante=0;
                    solucion=1;

                    break bucle;
                }

    
            }else if(matriz[i][j]!=0 && i==j && j!=filas_col){
                
                pivote=matriz[i][j];
                if(!operacion(matriz, i, j, filas_col, pivote, estado, matrizinversa)){
                    document.getElementById("Resultados3").innerHTML = "El determinante es 0--------3";
                    determinante=0;
                    solucion=1;

                    break bucle;
                }

            }
            
        }
        //console.log("saludos desde abajo del for j");
        
    }

    

    if(solucion==0){
        determinante = multiplicacion;
        for(i=matriz.length-1; i>0; i--){

            for(j=matriz[i].length-1; j>0;j--){
                if(i==j){
                    
                    pivote=matriz[i][j];
                    operacionAtras(matriz, i, j, filas_col, pivote, matrizinversa);
    
                }
                
            }
            
        }
        
        //imprimirResultados(matriz, n_col);
    }
    console.log("determnante de A(241)= "+determinante);

    var mostrarDeterminante= "<table border=0 width=80%><tr><td align='center'>|A|= "+Math.round(determinante)+"</td></tr>";
    document.getElementById("DeterminanteA").innerHTML = mostrarDeterminante;

    multiplicacion=1;


    estado=2;
    solucion=0;
    bucle2: for(i=0; i<matrizcuadrada.length; i++){

        for(j=0; j<matrizcuadrada[i].length;j++){

            //console.log("invoko al primer eliminar filas");
            if(!eliminarFilas(matrizcuadrada, filas_col)){
                //console.log("saludos desde el if");
                document.getElementById("Resultados3").innerHTML = "El determinante es 0--------1";
                determinante2=0;
                solucion=1;

                break bucle2;

            }
            //console.log("saludos desde abajo del if");
            
            if(matrizcuadrada[i][j]==0 && i==j && j!=filas_col){

                
                if(!ordenar(matrizcuadrada, i, j, filas_col, estado)){
                    //document.getElementById("Resultados3").innerHTML = "No tiene solución";
                    //console.log("No tiene solución");
                    document.getElementById("Resultados3").innerHTML = "El determinante es 0--------1";
                    determinante2=0;
                    solucion=1;
    
                    break bucle2;
    
                }
                //ordenar(matrizcuadrada, i, j, n_col);
                
                pivote=matrizcuadrada[i][j];
                if(!operacion(matrizcuadrada, i, j, filas_col, pivote, estado)){
                    document.getElementById("Resultados3").innerHTML = "El determinante es 0----------2";
                    determinante2=0;
                    solucion=1;

                    break bucle2;
                }

    
            }else if(matrizcuadrada[i][j]!=0 && i==j && j!=filas_col){
                
                pivote=matrizcuadrada[i][j];
                if(!operacion(matrizcuadrada, i, j, filas_col, pivote, estado)){
                    document.getElementById("Resultados3").innerHTML = "El determinante es 0--------3";
                    determinante2=0;
                    solucion=1;

                    break bucle2;
                }

            }
            
        }
        //console.log("saludos desde abajo del for j");
        
    }

    if(solucion==0){
        determinante2=multiplicacion;
    }else{
        determinante2=0;
    }

    var mostrarDeterminante2= "<table border=0 width=80%><tr><td align='center'>|A<sup>2</sup>|= "+Math.round(determinante2)+"</td></tr>";
    document.getElementById("DeterminanteA2").innerHTML = mostrarDeterminante2;

    var inversa = "<table border=0 width=80%>";

    if(determinante!=0){
        inversa+="<tr><td rowspan="+matriz.length+1+" align='center'>A<sup>-1</sup>=</td></tr>";
        for(i=0; i<matriz.length; i++){
        
            inversa += "<tr>";
            for(j=0;j<filas_col;j++){
                
                inversa += '<td align=center>'+matrizinversa[i][j]+'</td>';
                
                
            }
        
        }
        
        inversa += "</tr></table>";
        
        document.getElementById("MatrizInversa").innerHTML = inversa;
    }else{
        inversa+="<tr><td align=center>Como el determinante de la matriz original es 0, no tiene inversa";
        document.getElementById("MatrizInversa").innerHTML = inversa;
    }

    
    


}



function operacion(matriz, i, j, n_col, pivote, estado, matrizinversa){

    var mensaje;
    var n_pivote;
    var k;
    var posicion = parseInt(i, 10)+1;
    var posicion2;
    
    for(k=0;k<n_col; k++){
        matriz[i][k]=parseFloat(matriz[i][k])/parseFloat(pivote);
        if(Math.abs(matriz[i][k])<0.0000000000001){
            //console.log("***************************************************************muchos ceros*********************");
            matriz[i][k]=0;
        }
        if(estado==1){
            matrizinversa[i][k]=parseFloat(matrizinversa[i][k])/parseFloat(pivote);
        }
        
        
    }
    multiplicacion=multiplicacion*(pivote);
    if(estado==1){
        console.log("Determinante de A: "+multiplicacion);
    }else if(estado==2){
        console.log("Determinante de A^2: "+multiplicacion);
    }
    

    if(pivote%1==0 || pivote%.1==0 || pivote%.01==0 || pivote%.001==0|| pivote%.0001==0){
        mensaje="(1/"+pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
    }else{
        mensaje="(1/"+parseFloat(pivote).toFixed(2)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
    }

    
    if(estado==1){
        imprimir(matriz, mensaje, matrizinversa, true);
    }else if(estado==2){
        imprimir(matriz, mensaje);
    }
    

    var m;
    var fx;
    
    var expresion_f, expresion_c;

    

    for(m=i+1; m<matriz.length; m++){
        n_pivote=matriz[m][j];
        for(k=0; k<n_col; k++){
            
            matriz[m][k]=parseFloat(matriz[m][k])-(parseFloat(matriz[i][k])*parseFloat(n_pivote));
            if(Math.abs(matriz[m][k])<0.0000000000001){
                //console.log("***************************************************************muchos ceros2*********************");
                matriz[m][k]=0;
            }
            if(estado==1){
                matrizinversa[m][k]=parseFloat(matrizinversa[m][k])-(parseFloat(matrizinversa[i][k])*parseFloat(n_pivote));
            }
            
        }
        posicion2 = parseInt(m, 10)+1;
        if(n_pivote%1==0 || n_pivote%.1==0 || n_pivote%.01==0 || n_pivote%.001==0|| n_pivote%.0001==0){
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+parseFloat(n_pivote).toFixed(4)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }
        
        

        if(estado==1){
            imprimir(matriz, mensaje, matrizinversa, true);
        }else if(estado==2){
            imprimir(matriz, mensaje);
        }
        
    }

    //console.log("INvoko al eliminarfilas");
    if(!eliminarFilas(matriz, filas_col)){
        //console.log("aca tambien se retorna falso");
        return false;
    }

    return matriz;
    

}


function ordenar(matriz, i, j, n_col, estado, matrizinversa){

    var k, r, m;
    var array_columnas= [];
    var auxiliar = [];
    var auxiliari = [];
    var num_fila="";
    var mensaje;
    var posicion = parseInt(i, 10)+1;
    var posicion2;

    for(k=0;k<matriz.length; k++){
        array_columnas[k]=matriz[k][i]
    }

    for(m=j; m<matriz.length; m++){
        if(array_columnas[m]!=0){
            num_fila=m;
            break;
        }
    }

    if(num_fila==""){
        return false;
    }else{
        for(r=0; r<n_col; r++){
            auxiliar[r]=matriz[i][r];
            matriz[i][r] = matriz[num_fila][r];
            matriz[num_fila][r] = auxiliar[r];

            if(estado==1){
                auxiliari[r]=matrizinversa[i][r];
                matrizinversa[i][r] = matrizinversa[num_fila][r];
                matrizinversa[num_fila][r] = auxiliari[r];
            }
            
        }
    }


    posicion2 = parseInt(num_fila, 10)+1;
    multiplicacion=multiplicacion*(-1);
    mensaje="F<sub>"+posicion+"</sub>↔F<sub>"+posicion2+"</sub>";
    imprimir(matriz, mensaje, matrizinversa, true);

    return matriz;

}



function operacionAtras(matriz, i, j, filas_col, pivote, matrizinversa){


    var n_pivote;
    var k;
    var mensaje;
    var m=i-1;
    var posicion = parseInt(i, 10)+1;
    var posicion2;
    var atras=true;

    var matrizaux = new Array(matriz.length);

    for(k=0; k<matriz.length; k++){
        matrizaux[k]= new Array(matriz.length);
        for(m=0; m<matriz.length; m++){
            matrizaux[k][m]=matriz[k][m];
        }
    }


    
    var fx;
    
    var expresion_f, expresion_c;

    
    for(m=i-1; m>=0; m--){
        n_pivote=matrizaux[m][j];
        for(k=0; k<filas_col; k++){
            matrizaux[m][k]=parseFloat(matrizaux[m][k])-(parseFloat(matrizaux[i][k])*parseFloat(n_pivote));
            matrizinversa[m][k]=parseFloat(matrizinversa[m][k])-(parseFloat(matrizinversa[i][k])*parseFloat(n_pivote));
            
            
        }

        posicion2 = parseInt(m, 10)+1;
        if(n_pivote%1==0 || n_pivote%.1==0 || n_pivote%.01==0 || n_pivote%.001==0|| n_pivote%.0001==0){
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+parseFloat(n_pivote).toFixed(4)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }
        
        imprimir(matriz, mensaje, matrizinversa, atras);
    }

   atras=false;

    return matrizinversa;


}


function eliminarFilas(matriz, filas_col){

    var i, j, k;
    var contador;
    var contadorc, contadorf;
    var mensaje;
    var posicion, posicionj;
    var solucion;
    /*
    for (i = 0; i < matriz.length; i++) {
        contador=0;
        for ( j = 0; j < filas_col; j++) {
            if (matriz[i][j]== 0) {
                contador++;
            }

            if (contador==matriz[i].length) {
                //matriz.splice(i, 1);
                posicion= parseInt(i, 10)+1;
                mensaje ="Fila de ceros en F<sub>"+posicion+"</sub>";
                solucion=0;
                imprimir(matriz, mensaje);
                //imprimirResultados(matriz, solucion);
                

                i=0;
            }
            
        }
        
    }
    */

    for (i = 0; i < matriz.length; i++) {
        contadorf=0;
        contadorc=0;
        for ( j = 0; j < (matriz[i].length); j++) {
            if (matriz[j][i]== 0) {
                contadorc++;
            }
            if (matriz[i][j]== 0) {
                contadorf++;
            }
            
        }

        if(contadorf==matriz[i].length){
            
            //imprimirResultados(matriz, solucion);
            posicion= parseInt(i, 10)+1;
            mensaje ="Fila de ceros en F<sub>"+posicion+"</sub>";
            solucion=0;
            imprimir(matriz, mensaje);
            //console.log("se retorna falso");
            return false;
        }else if(contadorc==matriz[i].length){
            posicion= parseInt(i, 10)+1;
            mensaje ="Fila de ceros en C<sub>"+posicion+"</sub>";
            solucion=0;
            imprimir(matriz, mensaje);
            //console.log("se retorna falso");
            return false;
        }
        
        
    }

    contadorf=0;
    contadorc=0;
    for(i=0; i<matriz.length; i++){
        
        for(j=i+1; j<matriz.length; j++){
            contadorf=0;
            contadorc=0;
            for(k=0;k<matriz.length; k++){
                if(matriz[k][i]==matriz[k][j]){
                    contadorc++;
                }
                if(matriz[i][k]==matriz[j][k]){
                    contadorf++;
                }
            }
            if(contadorf==matriz.length){
                
                posicion= parseInt(i, 10)+1;
                posicionj= parseInt(j, 10)+1;
                mensaje ="F<sub>"+posicion+"</sub>=F<sub>"+posicionj+"</sub>";
                solucion=0;
                imprimir(matriz, mensaje);
                
                return false;
            }else if(contadorc==matriz.length){
                posicion= parseInt(i, 10)+1;
                posicionj= parseInt(j, 10)+1;
                mensaje ="C<sub>"+posicion+"</sub>=C<sub>"+posicionj+"</sub>";
                solucion=0;
                imprimir(matriz, mensaje);
                //console.log("se retorna falso");
                return false;
            }
        }
        
    }

    //console.log("se retorna verdadero");
    return matriz;
}



function imprimir(matriz, mensaje, matrizinversa, atras){

    var i, j;
    var imprimirProcedimiento = document.getElementById('Imprimir');

    var procedimiento = "<table border=0 cellspacing='30px'>";

    procedimiento += "<tr><td rowspan="+matriz.length+1+" align='center'>"+mensaje+"</td></tr>";
    
    for(i=0; i<matriz.length; i++){
        
        procedimiento += "<tr>";
        for(j=0;j<matriz[i].length;j++){

            if(matriz[i][j]%1==0 || matriz[i][j]%.1==0 || matriz[i][j]%.01==0 || matriz[i][j]%.001==0|| matriz[i][j]%.0001==0){
                procedimiento += '<td align=center>'+matriz[i][j]+'</td>';
            }else{
                procedimiento += '<td align=center>'+parseFloat(matriz[i][j]).toFixed(4)+'</td>';
            }
            
            
            
            
        }
        procedimiento+="</tr>"
    }

    
    procedimiento += "</table>";

    
    if(atras){
        procedimiento += "<table border=0 cellspacing='30px'>";
        procedimiento += "<tr><td rowspan="+matriz.length+1+" align='center'>Inversa:</td></tr>";

        for(i=0; i<matrizinversa.length; i++){
        
            procedimiento += "<tr>";
            for(j=0;j<matrizinversa[i].length;j++){
    
                if(matrizinversa[i][j]%1==0 || matrizinversa[i][j]%.1==0 || matrizinversa[i][j]%.01==0 || matrizinversa[i][j]%.001==0|| matrizinversa[i][j]%.0001==0){
                    procedimiento += '<td align=center>'+matrizinversa[i][j]+'</td>';
                }else{
                    procedimiento += '<td align=center>'+parseFloat(matrizinversa[i][j]).toFixed(4)+'</td>';
                }
                
                
                
                
            }
            procedimiento+="</tr>"
        }


    }

    
    procedimiento += "</table><br><br><br>";
    
    imprimirProcedimiento.insertAdjacentHTML('beforeend', procedimiento);
    
}


function imprimirResultados(matriz, solucion){
    
    //var i, j, k, m;
    
    //var suma = "";
    var imprimirresultadoFinal = document.getElementById('Resultados3');
    var resultadoFinal;
    //document.getElementById('Resultados2').innerHTML="El sistema tiene soluciones infinitas <br><br>";
    //var rango;
    //var lamnda = "";
    
    if(solucion==0){
        document.getElementById('Resultados2').innerHTML="El determinante es 0----------4<br><br>";
        resultadoFinal+= "El determinante es 0-----------5<br><br>";
    }
    
    
    

    
    imprimirresultadoFinal.insertAdjacentHTML('beforeend', resultadoFinal);

    document.getElementById('Imprimir').insertAdjacentHTML('beforeend', resultadoFinal);
}

function matrizCuadrada(matriz, filas_col){
    var matrizcuadrada= new Array(matriz.length);
    var aux = new Array(filas_col*filas_col);
    

    var i, j, k;
    var suma, cont=0;

    
	
	for(i=0; i<matriz.length; i++){
		suma=0;
		for(j=0; j<matriz.length; j++){
			
			
			for(k=0; k<matriz.length; k++){
                suma = suma + (matriz[i][k]*matriz[k][j]);
                /*
                console.log(suma);
                console.log(matriz[i][k]);
                console.log(matriz[k][j]);
                */
			}
			
			//printf("\n\nsuma: %d\n\n", suma);
            aux[cont]= suma;
            //console.log(aux[cont]);
            cont=cont+1;
            suma=0;
			
		}
        
		
		
	}
	
	cont=0;
	for(i=0; i<matriz.length; i++){
        matrizcuadrada[i]= new Array(filas_col);
		for(j=0; j<matriz.length; j++){
			matrizcuadrada[i][j]= aux[cont];
			cont=cont+1;
		}
	}

    imprimirCuadrada(matrizcuadrada);
    return matrizcuadrada;
}

function imprimirCuadrada(matrizcuadrada){
    var i, j;
    var imprimir = document.getElementById('MatrizCuadrada');

    var mcuadrada = "<table border=0 cellspacing='30px'>";

    mcuadrada +="<tr><td rowspan="+matrizcuadrada.length+1+" align='center'>A<sup>2</sup>=</td></tr>";
    
    for(i=0; i<matrizcuadrada.length; i++){
        
        mcuadrada += "<tr>";
        for(j=0;j<matrizcuadrada[i].length;j++){

            if(matrizcuadrada[i][j]%1==0 || matrizcuadrada[i][j]%.1==0 || matrizcuadrada[i][j]%.01==0 || matrizcuadrada[i][j]%.001==0|| matrizcuadrada[i][j]%.0001==0){
                mcuadrada += '<td align=center>'+matrizcuadrada[i][j]+'</td>';
            }else{
                mcuadrada += '<td align=center>'+parseFloat(matrizcuadrada[i][j]).toFixed(4)+'</td>';
            }
            
            
            
            
        }
    
    }
    
    
    mcuadrada += "</tr></table><br><br><br>";

    imprimir.innerHTML = mcuadrada;
    
    

}