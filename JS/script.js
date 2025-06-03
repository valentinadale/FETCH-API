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
                    <button onClick="eliminarRegistro(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `
    });
}
ObtenerPersonas();



//proceso para agregar un nuevo registro
const modal = document.getElementById("modalAgregar"); //cuadrode dialogo
const btnAgregar = document.getElementById("btnAbrirModal");//boton de agregar nuevo registro(+)
const btnCerrar = document.getElementById("btnCerrarModal");//boton (x) para cerrar el modal

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
});

//Agregar una nueva persona desde el formulario del modal
document.getElementById("frmAgregarPersona").addEventListener("submit", async e => {
    e.preventDefault();//la "e" representa al evento Submit - evita que el formulario se envie

    //capturamos los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("correo").value.trim();

    //validación básica
    if(!nombre || !edad || !correo){
        alert("Complete todos los campos");
        return; /// evita que el codigo se siga ejecutanto, osea que se envie el formulario
    }

    //Llamar a la API para enviar el usuario
    const respuesta = await fetch(API_URL, {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, edad, correo})//se va a enviar por string el JSON
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente.");

        //Limpiar el formulario
        document.getElementById("frmAgregarPersona").reset();

        //cerrar el formulario
        modal.close();

        //Recargar la tabla
        ObtenerPersonas();
    }
    else{
        alert("ERROR! El proceso no pudo ser completado.")
    }

});//fin del formulario


//para eliminar registros
async function eliminarRegistro(id){//se pide el id para borrar
    if(confirm("¿Estas seguro de querer borrar este registro?")){
        await fetch(`${API_URL}/${id}`, {method:'DELETE'});
        ObtenerPersonas();//se recargan los registros
    }
    else{

    }
};