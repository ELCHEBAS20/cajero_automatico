

let cuentas = [
  { nombre: 'Mali', saldo: 200, pswd: '1234' },
  { nombre: 'Gera', saldo: 290, pswd: 'abcd' },
  { nombre: 'Maui', saldo: 67, pswd: '1a2b3c' }
];

function MainProgram() {
  let salir = false;
  var Option;

  do {
    Option = parseInt(prompt("1.Consultar Saldo\n2.Ingresar Monto\n3.Retirar monto\n4.Salir de la sesion"))
    switch (Option) {
      case 1:
        APIREST(cuentas, 'GET'.toUpperCase());
        break;
      case 2:
        APIREST(cuentas, 'POST'.toUpperCase());
        break;
      case 3:
        APIREST(cuentas, 'UPDATE'.toUpperCase());
        break;
      case 4:
        salir = true;
        alert('Muchas gracias, hasta una próxima ocasión.!!')
        break;
    }

  } while (!(salir));

}

function APIREST(data, opcion) {

  let isIngreso = false;

  let ViewCuentas = parseInt(prompt('Quieres ver la cuenta 1,2 o 3'));
  let Pswd = prompt('Ingresar por favor contraseña de la cuenta: ', 0);


  if (Pswd === data[ViewCuentas - 1].pswd) {
    isIngreso = true;
  }

  if (isIngreso) {
    if (opcion.charAt(0) == 'G') {
      alert("Nombre: " + data[ViewCuentas - 1].nombre + "\n" + "Saldo Correspondiente: " + data[ViewCuentas - 1].saldo);
    } else if (opcion.charAt(0) == 'P') {
      const monto = parseInt(prompt('Ingresar el monto correspondiente'));

      try {
        if (monto > 0) {
          data[ViewCuentas - 1].saldo += monto;
          if (!(ExepecionCuenta(data[ViewCuentas - 1].saldo))) {
            data[ViewCuentas - 1].saldo -= monto;
            alert('Cuenta bloqueada en este momento por valor excedido');
          } else {
            alert("El nuevo Saldo: " + data[ViewCuentas - 1].saldo + "\n" + "Del usuario: " + data[ViewCuentas - 1].saldo);
          }

        } else {
          throw Error('No es la cantidad adecuada.');
        }
      } catch (Error) {
        alert(Error);
      }
    } else {
      let isFlag = true;
      const retirado = parseInt(prompt('Ingresar el monto a retirar'));

      if (retirado > 0) {
        data[ViewCuentas - 1].saldo -= retirado;
        if (data[ViewCuentas - 1].saldo > 0) {
          alert('Retirando........... ');
        } else {
          data[ViewCuentas - 1].saldo += retirado;
          alert(`Valor de la cuenta con el saldo: ${data[ViewCuentas - 1].saldo}`)
        }
      } else {
        isFlag = false;
      }

      if (!(isFlag)) {
        alert('El valor a retirar no es valido');
      }
    }
  } else {
    alert('contraseña no valida,por favor verifica.');
  }

}

function ExepecionCuenta(saldo) {
  let isValido = false;
  if (saldo >= 10 && saldo <= 990) {
    isValido = true;
  }
  return isValido;
}

MainProgram();
