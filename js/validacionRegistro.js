let formulario = document.querySelector('form');
let input_usuario = document.getElementById('usuario');
let input_contraseña = document.getElementById('contraseña');
let error = document.querySelectorAll('.error-validacion');

let usuario_nuevo = {
    "Username": '',
    "Password": ''
}

const expresion = /(?=.*[0-9])/; /* el string debe contener al menos 1 numero */


function registrarUsuario(nuevoUsuario, lista_usuarios) {
    lista_usuarios.push(nuevoUsuario);
}

function restaurarFormulario() {
    for (let i = 0; i < error.length; i++) {
        if (error[i].classList.value != 'error-validacion') {
            error[i].classList.toggle('error-validacion');
            input_usuario.style.border = '0';
            input_contraseña.style.border = '0';
        }
    }
}

function cargarListaUsuarios() {
    /* cargar pagina con Live Server de lo contrario esta funcion tira error por CORS */
    return fetch("js/listaUsuarios.json")
    .then(response => response.json())
    .then(lista => {
        /* reviso que el usuario no esté repetido */
        let usuario_repetido;
        for (let j = 0; j < lista.length; j++) {
            if (lista[j].Username == usuario_nuevo.Username) {
                error[0].innerText = 'That username already exists';
                usuario_repetido = usuario_nuevo.Username;
                if (error[0].classList.value == 'error-validacion') {
                    error[0].classList.toggle('error-validacion');
                    input_usuario.style.border = '2px solid red';
                }
                break;
            }
        };
        if (usuario_nuevo.Username == usuario_repetido) {
            return /* la funcion se corta aca si ya existe el nombre de usuario */
        }
        /* una vez confirmado que el usuario no esté repetido, lo agrego a la lista de usuarios */
        registrarUsuario(usuario_nuevo, lista);
        restaurarFormulario();
    })
}


formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    let contraseña = input_contraseña.value;
    if (contraseña.length < 6) {
        error[1].innerText = 'Password must consist of at least 6 characters';
        if (error[1].classList.value == 'error-validacion') {
            error[1].classList.toggle('error-validacion');
            input_contraseña.style.border = '2px solid red';
        }
        return
    }
    if (expresion.test(contraseña)) {
        usuario_nuevo.Username = input_usuario.value;
        usuario_nuevo.Password = input_contraseña.value;
        cargarListaUsuarios();
    } else {
        error[1].innerText = 'Password must contain at least 1 number';
        if (error[1].classList.value == 'error-validacion') {
            error[1].classList.toggle('error-validacion');
            input_contraseña.style.border = '2px solid red';
        }
    }
})
