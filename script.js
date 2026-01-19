const boton=document.getElementById("send");
    boton.addEventListener('click',()=>{
        let usu=document.getElementById("user").value;
        let con=document.getElementById("pass").value;
        if(usu==="administrador" && con==="contraseña"){
            alert("Inicio de Sesión Correcto");
            window.location.href='menu.html';
        }else{                        
            alert("Usuario o Contraseña Inválidos");
        }
});

$(document).ready(function () {  
    let saldo = 0  
    $('#formDeposito').submit(function (e) {        
        e.preventDefault();
        
        let amount = parseInt($('#amount').val());

        if (!isNaN(amount) && amount > 0) {
            saldo += amount;
            $('#saldo').text("$" + saldo);
            $('#amount').val('');
            alert('Se ha depositado $' + amount + ' en su cuenta.');
        } else {
            alert('Monto invalido. Por favor ingrese un número positivo.');
        }

    });
    
    
                
});