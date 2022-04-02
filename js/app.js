const sendbtn = document.querySelector('#send');
const erasebtn = document.querySelector('#eraser');
const box = document.querySelector('.form-container');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventLoad();

function eventLoad() {
    limpiarForm();
    document.addEventListener('DOMContentLoaded', iniciarApp);
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    erasebtn.addEventListener('click', limpiarForm);
    sendbtn.addEventListener('click', enviarMail);
}

function iniciarApp() {
    sendbtn.disabled = true;
    sendbtn.classList.add('send-init');
}

function validarFormulario(evt) {
    if (evt.target.value.length > 0) {
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        evt.target.classList.remove('init-input');
        evt.target.classList.remove('error-input');
        evt.target.classList.add('success-input');
    } else {
        evt.target.classList.remove('init-input');
        evt.target.classList.remove('success-input');
        evt.target.classList.add('error-input');
        mostrarError('Todos los campos son necesarios.')
    }

    if (evt.target.type === 'email') {
        if (er.test(evt.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            evt.target.classList.remove('init-input');
            evt.target.classList.remove('error-input');
            evt.target.classList.add('success-input');
        } else {
            evt.target.classList.remove('init-input');
            evt.target.classList.remove('success-input');
            evt.target.classList.add('error-input');
            mostrarError('Email no valido.')
        }
    }

    if (er.test(email.value) && mensaje.value !== '' && asunto.value !== '') {
        sendbtn.disabled = false;
        sendbtn.classList.remove('send-init');
    } else {
        iniciarApp();
    }
}

function mostrarError(msj) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = msj;
    mensajeError.classList.add('error-text', 'error');
    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        box.appendChild(mensajeError);
    }
}

function enviarMail(evt) {
    evt.preventDefault();
    console.log("envio el mail(?)");
    const spinner = document.querySelector('#spinnerid');
    console.log(spinner);
    console.log(spinner.classList);
    spinner.style.display = 'Flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        const parrafo = document.createElement('p');
        parrafo.textContent = 'Enviado correctamente';
        parrafo.classList.add('success-text');

        box.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
            limpiarForm();
        }, 5000);
    }, 3000);
}

function limpiarForm() {
    box.reset();
    iniciarApp();
    mensaje.classList.remove('success-input');
    mensaje.classList.add('init-input');
    email.classList.remove('success-input');
    email.classList.add('init-input');
    asunto.classList.remove('success-input');
    asunto.classList.add('init-input');
}