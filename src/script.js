let form = document.getElementById("contact-form");
let buttonSubirContacto = document.getElementById("subir-contacto");
let buttonEliminar = document.getElementById("eliminar");
let guardar = document.getElementById("guardar");
let lista = document.getElementById("lista-contactos");
let idContacto = [];
let contador = 0



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
        buttonEditarContacto(c,i);
    })
}

// localStorage.clear();
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

function buttonEditarContacto(c,i) {
    const editButton = document.createElement("button");
    editButton.textContent = "editar";
    editButton.classList.add("edit-button");
    editButton.setAttribute("id", i);
    lista.appendChild(editButton);
    editButton.addEventListener("click", () => {
        alert("Si vale");
        editarContacto(c);
    })
}

function editarContacto(c) {
    if (c) {
        let inputNombre = document.getElementById("nombre")
        let inputEmail = document.getElementById("email")
        let inputTelefono = document.getElementById("telefono")
        inputNombre.value = c.nombre
        inputEmail.value = c.email
        inputTelefono.value = c.telefono
    }
}

buttonEliminar.addEventListener("click", () => {
    eliminarContacto();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    almacenarDatosFormulario();
    mostrarContacto();
    form.reset();
});

// crearContacto();
mostrarContacto();

/*sirve para eliminar por id*/
// function eliminarContacto(idContactos) {
//     let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
//     contactos.filter(id => id.pop())
//     localStorage.setItem("contactos", JSON.stringify(contactos));
// }


// if (form) {
//     validarDatos()
//     form.addEventListener("submit", () => {
//         let contact = {
//             nombre: document.getElementById("nombre").value,
//             email: document.getElementById("email").value,
//             telefono: document.getElementById("telefono").value
//         }
//         let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
//         contactos.push(contact);
//         localStorage.setItem("contactos", JSON.stringify(contactos));
//         form.reset();
//         crearContacto();
//     });


// }

//     guardar.addEventListener("click", function () {
//         if (indiceContacto === null) return;
//         guardarEdicionContacto(indiceContacto)
//     })

// function validarDatos() {
//     if (indiceContacto === null) return;
//     let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
//     const c = contactos[indiceContacto];
//         let inputNombre = document.getElementById("nombre")
//         let inputEmail = document.getElementById("email")
//         let inputTelefono = document.getElementById("telefono")
//         inputNombre.value = c.nombre
//         inputEmail.value = c.email
//         inputTelefono.value = c.telefono
//     inputTelefono.addEventListener("input", () => {
//         if (isNaN(inputTelefono.value)) {
//             botonSubirContacto.disabled = true;
//             guardar.disabled = true;
//             errorTelefono.style.display = "block"
//         } else {
//             botonSubirContacto.disabled = false;
//             guardar.disabled = false;
//             errorTelefono.style.display = "none"
//         }
//     });
// }

// function buttoneditarContactos(i) {
//     const editButton = document.createElement("button");
//     const div = document.getElementById("lista-contactos");
//     editButton.textContent = "editar";
//     editButton.classList.add("edit-button");
//     editButton.setAttribute("info-i", i);
//     div?.appendChild(editButton);
//     editButton.addEventListener("click", function () {
//         const contatoAEditar = parseInt(this.getAttribute("info-i"));
//         editarContacto(contatoAEditar);
//     })
// }

// function editarContacto(i) {

//     let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
//     const c = contactos[i];
//     if (c) {
//         let inputNombre = document.getElementById("nombre")
//         let inputEmail = document.getElementById("email")
//         let inputTelefono = document.getElementById("telefono")
//         inputNombre.value = c.nombre
//         inputEmail.value = c.email
//         inputTelefono.value = c.telefono
//         indiceContacto = i;
//     }
// }







// function guardarEdicionContacto(i) {
//     let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
//     const c = contactos[i];
//     const card = document.querySelector(".info-contacto");
//     let inputNombre = document.getElementById("nombre");
//     let inputEmail = document.getElementById("email")
//     let inputTelefono = document.getElementById("telefono")
//     c.nombre = inputNombre.value;
//     c.email = inputEmail.value;
//     c.telefono = inputTelefono.value;
//     card.innerHTML = `<strong>${c.nombre} </strong> <br>  ${c.email} - ${c.telefono}`;
//     localStorage.setItem("contactos", JSON.stringify(contactos));
//     crearContacto();
//     console.log(i)
// }

// crearContacto();
//eliminar contactos
//validar que los campos sean de ese tipo
//mostrar al usuario un mensaje claro de que no se cumple los requisitos
//ordenar contactos alfabeticametne por nombre
//mostrar 5 o 10 contactos o los 5 primeros y luego otros 5 a eleccion del usuario
//editar contacto