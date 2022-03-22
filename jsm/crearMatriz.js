//q:)->-</:
function crear(){

    document.getElementById("Tables").innerHTML = "";
    
    var i, j;

    var filas=0;
    var columnas=0;
    

    filas=document.getElementById("filas").value;
    columnas=document.getElementById("columnas").value;
    var n_col=1+parseInt(columnas, 10);
    var n_j=0;

    var HTML = "<table border=0 width=80%>";

    for(i=0; i<filas; i++){
        
        HTML += "<tr>";
        for(j=0;j<n_col;j++){
            n_j=parseInt(j,10)+1
            if(n_col==j+1){
                HTML += "<td align=center>"+'<input type="text" id="x'+i+'_'+j+'" onkeypress="return valideKey(event, this);" style="width: 80px;" > </td>';
            }else if(parseInt(n_col,10)-2==j){
                HTML += "<td align=center>"+'<input type="text" id="x'+i+'_'+j+'" onkeypress="return valideKey(event, this);" style="width: 80px;" ></td><td>x<sub>'+n_j+'</sub>=</td>';

            }else{
                HTML += "<td align=center>"+'<input type="text" id="x'+i+'_'+j+'" onkeypress="return valideKey(event, this);" style="width: 80px;"></td><td>x<sub>'+n_j+'</sub>+</td>';
            }
            
        }
    
    }
    
    HTML += "</tr></table>";
    HTML += '<input id="btnCalcular" type="button" value="Aceptar" onclick="calcular()" ></input>'
    document.getElementById("Tables").innerHTML = HTML;

}

function calcular(){
    document.getElementById("Resultados").innerHTML = "";
    document.getElementById("Resultados").innerHTML = "";
    document.getElementById("Resultados2").innerHTML = "";
    document.getElementById("Resultados3").innerHTML = "";
    document.getElementById("Imprimir").innerHTML = "";

    var filas=0;
    var columnas=0;
    var solucion=0;

    

    filas=document.getElementById("filas").value;
    columnas=document.getElementById("columnas").value;
    var n_col=1+parseInt(columnas, 10);

    var contador=0;
    var contador0=0;
    var contador02=0;
    for(i=0; i<filas; i++){
        for(j=0;j<n_col;j++){
            if(document.getElementById("x"+i+"_"+j).value=="" || document.getElementById("x"+i+"_"+j).value=="-"){
                contador++;
            }else if(document.getElementById("x"+i+"_"+j).value==0){
                contador0++;
            }
        }

    }

    for (j = 0;  j< columnas; j++) {
        for (i = 0; i < filas; i++) {
            if(document.getElementById("x"+i+"_"+j).value==0){
                contador02++;
            }
            
        }
        if(contador02==filas){
            alert("Pon por lo menos un número diferente de 0 en cada incógnita");
            return false;
        }
        contador02=0;
        
    }
    if(contador>0||contador0==filas*n_col){
        alert("rellena todas las ecuaciones con numeros");
        return false;
    }


    var matriz= new Array(filas);
    

    var i, j;

    for(i=0; i<filas; i++){
        matriz[i]= new Array(n_col)
        for(j=0; j<n_col;j++){
            matriz[i][j] = document.getElementById('x'+i+'_'+j+'').value;
        }
    }


    var HTML = "<table border=0 width=80%>";

    for(i=0; i<matriz.length; i++){
        
        HTML += "<tr>";
        for(j=0;j<n_col;j++){
            
            HTML += '<td align=center>'+matriz[i][j]+'</td>';
            
            
        }
    
    }
    
    HTML += "</tr></table>";
    
    document.getElementById("Resultados").innerHTML = HTML;

    var pivote;

    for(i=0; i<matriz.length; i++){

        for(j=0; j<matriz[i].length;j++){

            if(!eliminarFilas(matriz, n_col)){
                document.getElementById("Resultados3").innerHTML = "No tiene solución";
                solucion=1;

                break;

            }
            
            if(matriz[i][j]==0 && i==j && j!=columnas){

                
                if(!ordenar(matriz, i, j, n_col)){
                    document.getElementById("Resultados3").innerHTML = "No tiene solución";
                    console.log("No tiene solución");
                    solucion=1;
    
                    break;
    
                }
                //ordenar(matriz, i, j, n_col);
                
                pivote=matriz[i][j];
                operacion(matriz, i, j, n_col, pivote);

    
            }else if(matriz[i][j]!=0 && i==j && j!=columnas){
                
                pivote=matriz[i][j];
                operacion(matriz, i, j, n_col, pivote);

            }
            
        }
        
    }

    if(solucion==0){
        for(i=matriz.length-1; i>0; i--){

            for(j=matriz[i].length-1; j>0;j--){
                if( i==j && j!=columnas){
                    
                    pivote=matriz[i][j];
                    operacionAtras(matriz, i, j, n_col, pivote);
    
                }
                
            }
            
        }
        
        imprimirResultados(matriz, n_col);
    }

    
    


}

function operacion(matriz, i, j, n_col, pivote){

    var mensaje;
    var n_pivote;
    var k;
    var posicion = parseInt(i, 10)+1;
    var posicion2;
    for(k=0;k<n_col; k++){
        matriz[i][k]=parseFloat(matriz[i][k])/parseFloat(pivote);
        
    }

    if(pivote%1==0 || pivote%.1==0 || pivote%.01==0 || pivote%.001==0|| pivote%.0001==0){
        mensaje="(1/"+pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
    }else{
        mensaje="(1/"+parseFloat(pivote).toFixed(2)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
    }

    
    imprimir(matriz, mensaje);

    var m;
    var fx;
    
    var expresion_f, expresion_c;

    

    for(m=i+1; m<matriz.length; m++){
        n_pivote=matriz[m][j];
        for(k=0; k<n_col; k++){
            
            matriz[m][k]=parseFloat(matriz[m][k])-(parseFloat(matriz[i][k])*parseFloat(n_pivote));
        }
        posicion2 = parseInt(m, 10)+1;
        if(n_pivote%1==0 || n_pivote%.1==0 || n_pivote%.01==0 || n_pivote%.001==0|| n_pivote%.0001==0){
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+parseFloat(n_pivote).toFixed(4)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }
        
        imprimir(matriz, mensaje);
        
    }

    
    eliminarFilas(matriz, n_col);

    return matriz;
    

}


function ordenar(matriz, i, j, n_col){

    var k, r, m;
    var array_columnas= [];
    var auxiliar = [];
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
        }
    }


    posicion2 = parseInt(num_fila, 10)+1;
    mensaje="F<sub>"+posicion+"</sub>↔F<sub>"+posicion2+"</sub>";
    imprimir(matriz, mensaje);

    return matriz;

}



function operacionAtras(matriz, i, j, n_col, pivote){

    var n_pivote;
    var k;
    var mensaje;
    var m=i-1;
    var posicion = parseInt(i, 10)+1;
    var posicion2;


    
    var fx;
    
    var expresion_f, expresion_c;

    
    for(m=i-1; m>=0; m--){
        n_pivote=matriz[m][j];
        for(k=0; k<n_col; k++){
            matriz[m][k]=parseFloat(matriz[m][k])-(parseFloat(matriz[i][k])*parseFloat(n_pivote));
            
            
        }

        posicion2 = parseInt(m, 10)+1;
        if(n_pivote%1==0 || n_pivote%.1==0 || n_pivote%.01==0 || n_pivote%.001==0|| n_pivote%.0001==0){
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+parseFloat(n_pivote).toFixed(4)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }
        
        imprimir(matriz, mensaje);
    }

   

    return matriz;


}

function eliminarFilas(matriz, n_col,){

    var i, j;
    var contador;
    var mensaje;
    var posicion;
    for (i = 0; i < matriz.length; i++) {
        contador=0;
        for ( j = 0; j < n_col; j++) {
            if (matriz[i][j]== 0) {
                contador++;
            }

            if (contador==matriz[i].length) {
                matriz.splice(i, 1);
                posicion= parseInt(i, 10)+1;
                mensaje ="Se eliminó F<sub>"+posicion+"</sub>";
                imprimir(matriz, mensaje);

                i=0;
            }
            
        }
        
    }

    for (i = 0; i < matriz.length; i++) {
        contador=0;
        for ( j = 0; j < (matriz[i].length-1); j++) {
            if (matriz[i][j]== 0) {
                contador++;
            }
            
        }

        if(contador==matriz[i].length-1){

            return false;
        }
        
        
    }


    return matriz;
}



function imprimir(matriz, mensaje){

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
    
    }
    
    
    procedimiento += "</tr></table><br><br><br>";
    
    imprimirProcedimiento.insertAdjacentHTML('beforeend', procedimiento);
    
}


function imprimirResultados(matriz, n_col){
    
    var i, j, k, m;
    
    var suma = "";
    var imprimirresultadoFinal = document.getElementById('Resultados3');
    //document.getElementById('Resultados2').innerHTML="El sistema tiene soluciones infinitas <br><br>";
    var rango;
    var lamnda = "";
    
    

    var resultadoFinal = "<table border=0 cellspacing='30px'>";



    for(i=0; i<matriz.length; i++){
        resultadoFinal += "<tr>";
        for(j=0; j<matriz[i].length-1; j++){
            if(matriz[i][j]==1){
                document.getElementById('Resultados2').innerHTML="El sistema tiene solución única <br><br>";
                for(k=(j+1), m=(matriz[i].length-i); k<matriz[i].length-1; k++, m--){
                    if(matriz[i][k]==0){
                        suma=suma+"";
                    }else{
                        document.getElementById('Resultados2').innerHTML="El sistema tiene soluciones infinitas <br><br>";
                        if(matriz[i][k]>0){
                            suma=suma+((-1)*(matriz[i][k]))+" &lambda;<sub>"+(m)+"</sub> ";
                        }else{
                            suma=suma+" + "+((-1)*(matriz[i][k]))+" &lambda;<sub>"+(m)+"</sub> ";
                        }
                        
                    }

                    if(i==matriz.length-1){
                        lamnda += '<tr><td align=center>x<sub>'+(k+1)+"</sub>=  &lambda;<sub>"+m+'</sub></td>'
                    }
                    
                }
                resultadoFinal += '<td align=center>x<sub>'+(i+1)+"</sub>="+matriz[i][matriz[i].length-1]+" "+suma+'</td>';
                
            }
            suma="";   
            
            
        }
        
        
    }
    resultadoFinal += "</tr>";

    resultadoFinal += '</tr>'+lamnda;    

    resultadoFinal += "</tr></table><br><br><br>";
    imprimirresultadoFinal.insertAdjacentHTML('beforeend', resultadoFinal);

    document.getElementById('Imprimir').insertAdjacentHTML('beforeend', resultadoFinal);
}