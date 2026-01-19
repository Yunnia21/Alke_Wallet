// Esperar a que la página cargue completamente
document.addEventListener('DOMContentLoaded', function() {

    // ===== PÁGINA DE LOGIN =====
    const botonLogin = document.getElementById("send");

    if (botonLogin) {
        botonLogin.addEventListener('click', function(e) {
            // Prevenir que el formulario se envíe
            e.preventDefault();

            let usuario = document.getElementById("user").value;
            let contrasena = document.getElementById("pass").value;

            if (usuario === "administrador" && contrasena === "contraseña") {
                alert("Inicio de Sesión Correcto");
                window.location.href = 'menu.html';
            } else {
                alert("Usuario o Contraseña Inválidos");
            }
        });
    }

    // ===== PÁGINA DE DEPÓSITO (con jQuery) =====
    let saldo = 0; //parseInt(localStorage.getItem('saldo')) || 0;
    // Verificar si estamos en la página de depósito y existe el formulario
    if ($('#formDeposito').length) { 
        
        // Mostrar el saldo actual
        $('#saldo').text("$" + saldo);

        $('#formDeposito').submit(function(e) {
            // Prevenir que el formulario se envíe
            e.preventDefault();

            let monto = parseInt($('#amount').val());

            if (!isNaN(monto) && monto > 0) {
                // Agregar el monto al saldo
                saldo += monto;


                // Actualizar la pantalla
                $('#saldo').text("$" + saldo);
                $('#amount').val('');

                alert('Se ha depositado $' + monto + ' en su cuenta.');            
            } else {
                alert('Monto inválido.');
            }
    });
    const items = [];

    function refrescarSelect() {
        const $select = $('#lista');
        $select.empty();

        items.forEach(item => {
            $select.append(`<option value="${item}">${item}</option>`);
        });
    }

    $('#agregar').on('click', function () {
        console.log("Holi");    
        const valor = $('#nuevoItem').val().trim();
        if (!valor) return;

        items.push(valor);
        $('#nuevoItem').val('');
        refrescarSelect();
    });

        // Al cambiar el select, muestra el saludo
    $('#lista').on('change', function () {
        const seleccionado = $(this).val();
        $('#saludo').text(`hola ${seleccionado}`);
    });
    
    

}});
