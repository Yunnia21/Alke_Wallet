// Esperar a que la página cargue completamente
document.addEventListener('DOMContentLoaded', function () {

    // Verificamos que existe el botón
    // Evento submit del formulario de login
    if ($('#send').length) {

        $('#loginForm').on('submit', function (event) {
            event.preventDefault();

            // Capturar los valores del formulario.
            let usuario = $('#user').val();
            let contrasena = $('#pass').val();

            // Verifica el login, redirige en caso de éxito.
            if (usuario === "administrador" && contrasena === "contraseña") {
                alert("Inicio de Sesión Correcto");
                window.location.href = 'menu.html';
            } else {
                alert("Usuario o Contraseña Inválidos");
            }
        });
    }

    // Obtiene el saldo y lo muestra por pantalla.
    let saldo = parseInt(localStorage.getItem('saldo_cuenta')) || 0;
    $('#saldo').text("$" + saldo);
    console.log("Saldo inicial cargado:", saldo);


    // Verificar si estamos en la página de depósito y existe el formulario
    if ($('#formDeposito').length) {

        $('#formDeposito').submit(function (e) {

            // Prevenir que el formulario se envíe
            e.preventDefault();

            let monto = parseInt($('#amount').val());

            if (!isNaN(monto) && monto > 0) {
                // Agregar el monto al saldo
                saldo += monto;

                // Guardar en localStorage
                localStorage.setItem('saldo_cuenta', saldo);

                // Refrescar la pantalla
                $('#saldo').text("$" + saldo);
                $('#amount').val('');

                alert('Se ha depositado $' + monto + ' en su cuenta. Saldo actual: $' + saldo);
            } else {
                alert('Monto inválido.');
            }
        });
    }

    // ===== Funciones de Contacto =====

    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];


    //Actualiza el select con los contactos guardados en localStorage.
     
    function refrescarSelect() {
        const $select = $('#lista');
        $select.empty();

        contactos.forEach(item => {
            $select.append('<option value="' + item + '">' + item + '</option>');
        });
    }


    // Función para actualizar la tabla de transferencias
    function actualizarTablaTransferencias() {

        // Obtiene las transferencias del localStorage
        const transferencias = JSON.parse(localStorage.getItem('transferencias')) || [];
        const $tbody = $('#tabla tbody');
        $tbody.empty();

        // Itera sobre cada transferencia y agrega una fila a la tabla.
        transferencias.forEach(transferencia => {
            $tbody.append('<tr><td>' + transferencia.usuario + '</td><td>$' + transferencia.monto + '</td></tr>');
        });
    }

    function guardarContactos() {
        localStorage.setItem('contactos', JSON.stringify(contactos));
        console.log("Contactos guardados en localStorage:", contactos);
    }

    // Verificar si estamos en la página de envío de dinero
    if ($('#agregar').length) {
        console.log("Página de envío de dinero detectada");

        // Mostrar el saldo actual
        $('#saldo').text("$" + saldo);

        // Cargar contactos guardados en el select
        if (contactos.length > 0) {
            refrescarSelect();
        }

        // Cargar y mostrar las transferencias previas
        actualizarTablaTransferencias();

        // Evento para agregar nuevo contacto
        $('#agregar').on('click', function (e) {
            e.preventDefault(); // Prevenir que dispare el submit del formulario
            console.log("Botón agregar clickeado");
            const valor = $('#nuevoItem').val().trim();

            if (!valor) {
                alert('Por favor ingresa un nombre de contacto');
                return;
            }

            // Verificar si el contacto ya existe
            if (contactos.includes(valor)) {
                alert('Este contacto ya existe');
                return;
            }

            contactos.push(valor);
            $('#nuevoItem').val('');
            refrescarSelect();
            guardarContactos(); // Guardar en localStorage
            alert('Contacto "' + valor + '" agregado exitosamente');
        });


        $('#lista').on('change', function () {
            const seleccionado = $(this).val();
            $('#saludo').text('Depositando a ' + seleccionado);
        });
    }


    // Evento submit del formulario de transferencia
    $('#formTransferencia').on('submit', function (event) {
        event.preventDefault();
        console.log("Formulario de transferencia enviado");

        const monto = parseInt($('#sendMoney').val());
        const contactoSeleccionado = $('#lista').val();

        // Validaciones
        if (!contactoSeleccionado) {
            alert('Por favor selecciona un contacto');
            return;
        }

        if (isNaN(monto) || monto <= 0) {
            alert('Por favor ingresa un monto válido');
            return;
        }

        if (monto > saldo) {
            alert('Saldo insuficiente. Tu saldo actual es: $' + saldo);
            return;
        }

        // Realizar la transferencia
        saldo -= monto;

        // Guardar el saldo actualizado en localStorage
        localStorage.setItem('saldo_cuenta', saldo);
        console.log("Saldo actualizado en localStorage después de transferencia:", saldo);

        // Crear objeto de transferencia con todos los datos
        const datosTransferencia = {
            usuario: contactoSeleccionado,
            monto: monto,
            fecha: new Date().toLocaleString('es-ES')
        };

        // Obtener el array de transferencias o crear uno nuevo
        const transferencias = JSON.parse(localStorage.getItem('transferencias')) || [];

        // Agregar la nueva transferencia al array
        transferencias.push(datosTransferencia);

        // Guardar el array actualizado en localStorage
        localStorage.setItem('transferencias', JSON.stringify(transferencias));
        console.log("Transferencia guardada:", datosTransferencia);

        // Actualizar la tabla 
        actualizarTablaTransferencias();

        // Actualizar la pantalla
        $('#saldo').text("$" + saldo);
        $('#sendMoney').val('');

        alert('Transferencia exitosa!\nContacto: ' + contactoSeleccionado + '\nMonto: $' + monto + '\nSaldo restante: $' + saldo);
    });
    if ($('#tabla').length) {
        actualizarTablaTransferencias();

    }    
});