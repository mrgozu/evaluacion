/**
 * Problema número 2.
 * 
 * Genera un script/algoritmo/función que sea capaz de transformar los datos de input-p2.csv
 * en un arból de estructura similar al problema de p1 utilizando la estructura de Nodo.js
 */

const Nodo = require("./src/Nodo");
const raiz = new Nodo("root", "Raíz");
//Agregar a raiz toda la estructura solicitada.
//...
const csv = require('csvtojson'); //https://www.npmjs.com/package/csvtojson
const csvFilePath = './src/input-p2.csv';


/**Explicacion: Se usa la libreria csvtojson que mediante una funcion convierte el csv a un json utilizable
 * luego se utiliza un **reduce** en cada iteracion, y al ya haber obtenido el valor "unico" se aprovecha de almacenar
 * en la raiz, hasta finalmente llegar a las ofertas. Una vez se llega a las ofertas, solo resta ingresar ese ultimo Nodo
 * 
 */

csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        //jsonObj corresponde al csv convertido en json
        //Funcion que mezcla todos los parametros en base a su nombre de **Sede**
        const reduceSedes = jsonObj.reduce((acc, d) => {
            const found = acc.find(a => a.Sede === d.Sede);
            const value = { Curso: d.Curso, Seccion: d.Seccion, Oferta: d.Oferta };
            if (!found) {
                acc.push({ Sede: d.Sede, hijos: [value] });
                //raiz()
            } else {
                found.hijos.push(value);
            }
            return acc;
        }, []);
        //Recorre cada fila, que corresponde a cada **Sede**
        for (let sede in reduceSedes) {
            //console.log(reduceSedes[sede].Sede);
            let nombreSede = reduceSedes[sede].Sede; //Almaceno nombre de Sede

            let nodoSedes = new Nodo(nombreSede, 'Sede');
            raiz.hijos.push(nodoSedes);
            // console.log(nombreSede);

            //Funcion que mezcla todos los parametros en base a su nombre de **Curso**           
            const reduceCurso = reduceSedes[sede].hijos.reduce((acc, d) => {
                const found = acc.find(a => a.Curso === d.Curso);
                const value = { Seccion: d.Seccion, Oferta: d.Oferta };
                if (!found) {
                    acc.push({ Curso: d.Curso, hijos: [value] });
                    //raiz()
                } else {
                    found.hijos.push(value);
                }
                return acc;
            }, []);

            //Recorre cada fila, que corresponde a cada **Curso**
            for (let curso in reduceCurso) {
                let nombreCurso = reduceCurso[curso].Curso; //Almaceno nombre de Sede
                let nodoCurso = new Nodo(nombreCurso, 'Curso');
                nodoSedes.hijos.push(nodoCurso);

                // console.log(nombreCurso);
                //Funcion que mezcla todos los parametros en base a su nombre de **Seccion** 
                const reduceSeccion = reduceCurso[curso].hijos.reduce((acc, d) => {
                    const found = acc.find(a => a.Seccion === d.Seccion);
                    const value = { Oferta: d.Oferta };
                    if (!found) {
                        acc.push({ Seccion: d.Seccion, hijos: [value] });
                        //raiz()
                    } else {
                        found.hijos.push(value);
                    }
                    return acc;
                }, []);

                //Recorre cada fila, que corresponde a cada **Seccion**
                for (let seccion in reduceSeccion) {
                    let nombreSeccion = reduceSeccion[seccion].Seccion;
                    let nombreOferta = reduceSeccion[seccion].hijos;
                    let nodoSeccion = new Nodo(nombreSeccion, 'Seccion');
                    nodoCurso.hijos.push(nodoSeccion);
                    // console.log(nombreSeccion);

                    //Recorre las **Ofertas**
                    for (let oferta in nombreOferta) {
                        //    console.log(nombreOferta[oferta]);
                        let nodoOferta = new Nodo(nombreOferta[oferta].Oferta, 'Oferta');
                        nodoSeccion.hijos.push(nodoOferta);
                    }

                }

            }

        }
        console.log(raiz);
    });