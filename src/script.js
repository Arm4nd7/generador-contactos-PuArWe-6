let form = document.getElementById("contact-form");
let buttonSubirContacto = document.getElementById("subir-contacto");
let buttonEliminar = document.getElementById("eliminar");
let buttonGuardar = document.getElementById("guardar");
let buttonMostrar = document.getElementById("mostrar");
let lista = document.getElementById("lista-contactos");
let errorCampoTelefono = document.getElementById("error-tipo-telefono");
let errorCampoNombre = document.getElementById("error-tipo-nombre");
let errorCampoEmail = document.getElementById("error-tipo-email");
let selectInput = document.getElementById("contar-contactos");
let idContacto = null;
const caracterEspecial = /[^a-zA-Z0-9\s@.]/;

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


function filtroContacto() {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    let valorLista = selectInput.value;
    lista.innerHTML = '';
    if (valorLista === "5") {
        const primerosCincoContactos = contactos.slice(0, 5); //mostrar solo 5
        primerosCincoContactos.forEach((c, i) => {
            crearContacto(c, i); 
            buttonEditarContacto(c, i);
        });
    } else {
        // Si el valor no es "5", muestras todos (o manejas otra lógica)
        mostrarContacto();
    }
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
        buttonGuardar.disabled = false;
        buttonSubirContacto.disabled = true;
        buttonGuardar.style.display = "block";
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

/* AQUI COMIENZAN Las validaciones de ERRORES*/

function validarErrorTelefono(idTelefono) {
    idTelefono.addEventListener("input", () => {
        if (isNaN(idTelefono.value) || idTelefono.value === "") {
            buttonSubirContacto.disabled = true;
            errorCampoTelefono.style.display = "block"
        } else {
            errorCampoTelefono.style.display = "none"
            buttonSubirContacto.disabled = false;

        }
    });
}

function validarErrorEmail(idEmail) {
    idEmail.addEventListener("input", () => {
        if (!idEmail.value.includes('@') || !idEmail.value.includes('.') || caracterEspecial.test(idEmail.value)) {
            buttonSubirContacto.disabled = true;
            errorCampoEmail.style.display = "block"
        } else {
            errorCampoEmail.style.display = "none"
        }
    })
}

function validarErrorNombre(idNombre) {
    idNombre.addEventListener("input", () => {
        if (caracterEspecial.test(idNombre.value)) {
            buttonSubirContacto.disabled = true;
            errorCampoNombre.style.display = "block"
        } else {
            buttonSubirContacto.disabled = false;
            errorCampoNombre.style.display = "none"
        }
    })
}

function validarDatos() {
    let inputNombre = document.getElementById("nombre");
    let inputEmail = document.getElementById("email");
    let inputTelefono = document.getElementById("telefono");
    validarErrorNombre(inputNombre);
    validarErrorEmail(inputEmail);
    validarErrorTelefono(inputTelefono);
}

console.log(idContacto)

validarDatos();
buttonGuardar.addEventListener("click", function () {
    if (idContacto === null) return;
    buttonSubirContacto.disabled = "true";
    editarContacto(idContacto);
    buttonSubirContacto.disabled = false;
    buttonGuardar.disabled = true;
    form.reset();
    mostrarContacto();
});

buttonEliminar.addEventListener("click", () => {
    eliminarContacto();
});

buttonMostrar.addEventListener("click", function() {
    filtroContacto();
})

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