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
//console.log(data.hijos.map(data => data));
var totalNodos = 0; // Variable Auxiliar para contabilizar nodos totales

//console.log(data);









//lo de aqui abajo funciona bien

// Funcion que verifica si la cantidad de hijos es mayor a 0, esta funcion retorna valores booleanos
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
//Similar a la funcion que verifica si existen hijos, esta funcion usa como condicion el parametro que se le ingresa, esta funcion retorna valores booleanos
function cantidadHijos(nodo, cantidad) {
    if (nodo.hijos.length == cantidad) {
        //console.log('tiene hijos');
        return true;
    } else {
        return false;
    }
}


// Simple Contador que incrementa a medida recorre el arbol.
function cantidadNodos(arbol) {
    for (let i in arbol.hijos) {
        totalNodos++;
        cantidadNodos(arbol.hijos[i]);
    }
}

//Recorre todo el arbol en orden evaluando condiciones
function recorrerConFiltro(sedes) {
    //recorre cada sede
    let resultado = [];
    for (let sede in sedes) {
        let nodoSede = sedes[sede]; // Tiene el nodo con las sedes
        //Recorre cada curso de la sede que se encuentra recorriendo
        for (let curso in nodoSede.hijos) {
            let nodoCurso = nodoSede.hijos[curso]; // Tiene el nodo con los cursos de cada sede
            if (nodoCurso.nombre == '4 Medio') { //Se verifica la primera condicion "solo 4 Medio"
                //Recorre las Secciones de 4 Medio
                for (let seccion in nodoCurso.hijos) {
                    let nodoSeccion = nodoCurso.hijos[seccion]; // Tiene el nodo con las secciones del curso
                    if (nodoSeccion.nombre == 'A') // Verifica que pertenezcan a la seccion A
                    //Recorre las *Ofertas*
                        for (let oferta in nodoSeccion.hijos) {
                        let nodoOferta = nodoSeccion.hijos[oferta]; //nodo con las ofertas de la seccion
                        if (nodoOferta.nombre == 'Tecnología') { //Verifica que tengan el ramo
                            resultado.push(nodoSede.nombre); // Guarda la sede que cumpla con "4 medio", "A" , "Tecnología"
                        }
                    }
                }
            }
        }
    }
    console.log(resultado);
}



console.log(' 1. Retornar todos los nodos que no tienen hijos.');
recorrerArbol(data);

console.log('2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos');
recorrerArbolCantidad(data, 9);

console.log('3. Contabilizar la cantidad de nodos totales');
cantidadNodos(data);
console.log(totalNodos);

console.log('4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*');
recorrerConFiltro(data.hijos);