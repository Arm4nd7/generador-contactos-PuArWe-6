let form = document.getElementById("contact-form");
let botonSubirContacto = document.getElementById("subir-contacto");
let eliminarContacto = document.getElementById("eliminar");
let guardar = document.getElementById("guardar");
let lista = document.getElementById("lista-contactos");
let indiceContacto = null;
let contador = 0


if (form) {
    validarDatos()
    form.addEventListener("submit", () => {
        let contact = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            telefono: document.getElementById("telefono").value
        }
        let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
        contactos.push(contact);
        localStorage.setItem("contactos", JSON.stringify(contactos));
        form.reset();
        mostrarContactos();
    });
}


function validarDatos() {
    // let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    // const c = contactos[i];
    let inputTelefono = document.getElementById("telefono");
    let errorTelefono = document.getElementById("error");
    inputTelefono.addEventListener("input", () => {
        if (isNaN(inputTelefono.value)) {
            botonSubirContacto.disabled = true;
            errorTelefono.style.display = "block"
        } else {
            botonSubirContacto.disabled = false;
            errorTelefono.style.display = "none"

        }
    });
}


eliminarContacto.addEventListener("click", () => {
    eliminarContactos();
});

function mostrarContactos() {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    lista.innerHTML = "";
    contactos.forEach((c, i) => {
        const card = document.createElement("div");
        card.classList.add("info-contacto");
        card.setAttribute("info-i", i);
        card.innerHTML = `<strong>${c.nombre} </strong> <br>  ${c.email} - ${c.telefono}`
        lista.appendChild(card);
        buttoneditarContactos(i);
    })
}

function eliminarContactos() {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.pop();
    localStorage.setItem("contactos", JSON.stringify(contactos));
    mostrarContactos();
}


function buttoneditarContactos(i) {
    const editButton = document.createElement("button");
    const div = document.getElementById("lista-contactos");
    editButton.textContent = "editar";
    editButton.classList.add("edit-button");
    editButton.setAttribute("info-i", i);
    div?.appendChild(editButton);
    editButton.addEventListener("click", function () {
        const contatoAEditar = parseInt(this.getAttribute("info-i"));
        editarContacto(contatoAEditar);
    })
}

function editarContacto(i) {

    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    const c = contactos[i];
    if (c) {
        let inputNombre = document.getElementById("nombre")
        let inputEmail = document.getElementById("email")
        let inputTelefono = document.getElementById("telefono")
        inputNombre.value = c.nombre
        inputEmail.value = c.email
        inputTelefono.value = c.telefono
        indiceContacto = i;
    }
}

    guardar.addEventListener("click", function () {
        if (indiceContacto === null) return;
        guardarEdicionContacto(indiceContacto)
    })


function guardarEdicionContacto(i) {
    guardar.setAttribute("info-i", i);
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    const c = contactos[i];
    const card = document.querySelector(".info-contacto");
    let inputNombre = document.getElementById("nombre");
    let inputEmail = document.getElementById("email")
    let inputTelefono = document.getElementById("telefono")
    c.nombre = inputNombre.value
    c.email = inputEmail.value
    c.telefono = inputTelefono.value
    card.innerHTML = `<strong>${c.nombre} </strong> <br>  ${c.email} - ${c.telefono}`;
    localStorage.setItem("contactos", JSON.stringify(contactos));
    mostrarContactos();
    console.log(i)
}

mostrarContactos();
//eliminar contactos
//validar que los campos sean de ese tipo
//mostrar al usuario un mensaje claro de que no se cumple los requisitos
//ordenar contactos alfabeticametne por nombre
//mostrar 5 o 10 contactos o los 5 primeros y luego otros 5 a eleccion del usuario
//editar contacto