//URL de la api - EndPoint
const API_URL = 'https://retoolapi.dev/T9Luy1/EXPO';

//funcion para llamar a la api y traer el json
async function ObtenerPersonas(){
    //obtenemos la respuesta del servidor
    const res = await fetch(API_URL);//obtener datos de la api

    //convertir la respuesta del servidor a formato json
    const data = await res.json();

    CrearTabla(data); //Emviamos el JSON a la funcion "Crear tabla"

}

//Funcion que creara las finlas de la tabla en base a los regustros que vienen de la api
function CrearTabla(datos) { //"Datos" representa al json que viene de la api
    //se llama al "tbody" dentro de la tabla con id
    const tabla = document.querySelector("#tabla tbody");

    //para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; //vaciamos el contenido de la tabla

    datos.forEach(persona => {//por cada persona se va a agregar una nueva fila
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.edad}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `
    });
}
ObtenerPersonas();