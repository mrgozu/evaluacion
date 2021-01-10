/**
 * Problema número 1.
 *
 * Necesitamos que obtengas los datos de ./src/input-p1.json y generes funciones que permitan:
 *
 * 1. Retornar todos los nodos que no tienen hijos.
 * 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
 * 3. Contabilizar la cantidad de nodos totales
 * 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
 */

const data = require("./src/input-p1.json"); // Se corrige nombre del archivo
//console.log(data);









//lo de aqui abajo funciona bien

// Funcion que verifica si la cantidad de hijos es mayor a 0
function tieneHijos(nodo) {
    if (nodo.hijos.length > 0) {
        return true;
    } else {
        return false;
    }
}
// Funcion que recorre los datos y en caso de encontrar una cantidad de hijos igual a 0, devuelve el nodo actual por consola
function recorrerArbol(arbol) {
    //console.log(arbol);
    if (tieneHijos(arbol)) {
        for (let i in arbol.hijos) {
            recorrerArbol(arbol.hijos[i]);
        }
    } else {
        console.log(arbol);
    }

}
// Funcion que recibe  el arbol, la cantidad corresponde al numero de hijos, segun el nivel en el que esta recorriendo
function recorrerArbolCantidad(arbol, cantidad) {
    //console.log(arbol);
    if (tieneHijos(arbol)) {
        if (cantidadHijos(arbol, cantidad)) {
            console.log(arbol);
        }
        for (let i in arbol.hijos) {
            //console.log(arbol.hijos[0].hijos[0].hijos[0].hijos[0]);
            recorrerArbolCantidad(arbol.hijos[i], cantidad);
        }
    }

}
//Similar a la funcion que verifica si existen hijos, esta funcion usa como condicion el parametro que se le ingresa
function cantidadHijos(nodo, cantidad) {
    if (nodo.hijos.length == cantidad) {
        //console.log('tiene hijos');
        return true;
    } else {
        return false;
    }
}







// 1. Retornar todos los nodos que no tienen hijos.
//recorrerArbol(data);
//2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
//recorrerArbolCantidad(data, 9);