let form = document.getElementById("contact-form");
let buttonSubirContacto = document.getElementById("subir-contacto");
let buttonEliminar = document.getElementById("eliminar");
let buttonGuardar = document.getElementById("guardar");
let lista = document.getElementById("lista-contactos");
let errorCampoTelefono = document.getElementById("error-tipo-telefono");
let errorCampoNombre = document.getElementById("error-tipo-nombre");
let errorCampoEmail = document.getElementById("error-tipo-email");
let idContacto = null;
let contador = 0;

function almacenarDatosFormulario() {
    let contact = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value
    }
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.push(contact);
    localStorage.setItem("contactos", JSON.stringify(contactos));
}

function mostrarContacto() {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    lista.innerHTML = ""
    contactos.forEach((c, i) => {
        idContacto = i;
        crearContacto(c, i);
        buttonEditarContacto(c, i);
    })
}

function crearContacto(c, i) {
    const card = document.createElement("div");
    card.classList.add("info-contacto");
    card.setAttribute("id", i);
    card.innerHTML = `<strong>${c.nombre}</strong> <br>  ${c.email} - ${c.telefono}`
    lista.appendChild(card);
    console.log("este indice", i);
}

function eliminarContacto() {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.pop();
    localStorage.setItem("contactos", JSON.stringify(contactos));
    mostrarContacto();
}

function buttonEditarContacto(c, i) {
    const editButton = document.createElement("button");
    editButton.textContent = "editar";
    editButton.classList.add("edit-button");
    editButton.setAttribute("id", i);
    lista.appendChild(editButton);
    editButton.addEventListener("click", () => {
        capturaContactoEditar(c, i);
    })
}

function capturaContactoEditar(c, i) {
    if (c) {
        let inputNombre = document.getElementById("nombre")
        let inputEmail = document.getElementById("email")
        let inputTelefono = document.getElementById("telefono")
        inputNombre.value = c.nombre
        inputEmail.value = c.email
        inputTelefono.value = c.telefono
        idContacto = i;
    }
}

function editarContacto(i) {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    const c = contactos[i];
    const card = document.querySelector(".info-contacto");
    let inputNombre = document.getElementById("nombre");
    let inputEmail = document.getElementById("email")
    let inputTelefono = document.getElementById("telefono")
    c.nombre = inputNombre.value;
    c.email = inputEmail.value;
    c.telefono = inputTelefono.value;
    card.innerHTML = `<strong>${c.nombre} </strong> <br>  ${c.email} - ${c.telefono}`;
    localStorage.setItem("contactos", JSON.stringify(contactos));
    console.log(i)
}

buttonGuardar.addEventListener("click", function () {
    if (idContacto === null) return;
    editarContacto(idContacto);
    mostrarContacto();
});

buttonEliminar.addEventListener("click", () => {
    eliminarContacto();
});


/* AQUI COMIENZAN LOS ERRORES*/
function validarErrorTelefono(idTelefono){
    idTelefono.addEventListener("input", () => {
        if (isNaN(idTelefono.value)) {
            buttonSubirContacto.disabled = true;
            buttonGuardar.disabled = true;
            errorTelefono.style.display = "block"
        } else {
            buttonSubirContacto.disabled = false;
            buttonGuardar.disabled = false;
            errorTelefono.style.display = "none"
        }
    });
}

function validarErrorEmail(idEmail){
    idEmail.addEventListener("input", () => {
        if (!idEmail.value.includes('@') || !idEmail.value.includes('.')) {
            buttonSubirContacto.disabled = true;
            buttonGuardar.disabled = true;
            errorTelefono.style.display = "block"
        } else {
            buttonSubirContacto.disabled = false;
            // buttonGuardar.disabled = false;
            errorTelefono.style.display = "none"
        }
    })
}

function validarErrorNombre(idNombre){
    idNombre.addEventListener("input", () => {
        if (idNombre.value === "") {
            // buttonSubirContacto.disabled = true;
            buttonGuardar.disabled = true;
        } else {
            // buttonSubirContacto.disabled = false;

        }
    })
}

function validarDatos() {
    let inputNombre = document.getElementById("nombre");
    let inputEmail = document.getElementById("email");
    let inputTelefono = document.getElementById("telefono");
    validarErrorTelefono(inputTelefono)
    validarErrorEmail(inputEmail)
    validarErrorNombre(inputNombre)
}

console.log(idContacto)

validarDatos();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    almacenarDatosFormulario();
    mostrarContacto();
    form.reset();
});


mostrarContacto();


// crearContacto();
//eliminar contactos
//validar que los campos sean de ese tipo
//mostrar al usuario un mensaje claro de que no se cumple los requisitos
//ordenar contactos alfabeticametne por nombre
//mostrar 5 o 10 contactos o los 5 primeros y luego otros 5 a eleccion del usuario
//editar contacto