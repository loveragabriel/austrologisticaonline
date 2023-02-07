let validation_name = document.getElementById('name');
let validation_email = document.getElementById('email');
let validation_password = document.getElementById('password');
let validation_password_conf = document.getElementById('password_conf');
let error_name = document.getElementById('invalid-feedback-input-1');
let error_email = document.getElementById('invalid-feedback-input-2');
let error_password = document.getElementById('invalid-feedback-input-3');
let error_pass_confirmation = document.getElementById('invalid-feedback-input-4');
let new_user = document.getElementById('create-user');

let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");

//Se crea Array para guardar datos de usuario en sessionStorage
let userDataBase = [];

// Función para registrar un nuevo usuario. 
//Validación de datos 
//Display mensajes de validación con elementos HTML en el DOM
//Uso de operador ternario 
//Uso de constructor 
//Uso de sessionStorage para guardar usuario
//Uso de stringify para guardar el registro tipo JSON


const createNewUse = (e) => {
  e.preventDefault();
  let numberValidation = validation_name.value.match(/[0-9]/);
  let characterValidation = validation_name.value.match(/[~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/);
  if ((numberValidation) || (characterValidation)) {
    error_name.innerHTML = `<p>Debe ingresar solo texto</p>`
  } else if (validation_name.value === '' || validation_name.value === null) {
    error_name.innerHTML = `<p>Debe completar un nombre</p>`
  } else {
    error_name.innerHTML = ``;
  }

  let validRegex = validation_email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  if (validRegex) {
    // error_email.removeChild(error_email.firstChild);
  } else
    error_email.innerHTML = `<p>Debe ingresar un correo electrónico</p>`

  //validate Password input
  let lowerCaseLetters = validation_password.value.match(/[a-z]/g);
  let numbers = validation_password.value.match(/[0-9]/g);
  let upperCaseLetters = validation_password.value.match(/[A-Z]/g); //ok
  let lengthInput = validation_password.value.length >= 8;
  //USO DE TERNARIO
  (lowerCaseLetters ? (letter.classList.remove("invalid"), letter.classList.add("valid")) : (letter.classList.remove("valid"), letter.classList.add("invalid")));
  (upperCaseLetters ? (capital.classList.remove("invalid"), capital.classList.add("valid")) : (capital.classList.remove("valid"), capital.classList.add("invalid")));
  (numbers ? (number.classList.remove("invalid"), number.classList.add("valid")) : (number.classList.remove("valid"), number.classList.add("invalid")));
  (lengthInput ? (length.classList.remove("invalid"), length.classList.add("valid")) : (length.classList.remove("valid"), length.classList.add("invalid")));

  if (!upperCaseLetters || !numbers || !lengthInput) {
    error_pass_confirmation.innerHTML = `<p>Asegurese de cumplir los requisitos de seguridad</p>`
    return
  }
  if (validation_password.value === validation_password_conf.value) {
    class User {
      constructor(validation_name, validation_email, validation_password, confirm_password) {
        this.id = validation_email;
        this.validation_name = validation_name
        this.validation_email = validation_email;
        this.validation_password = validation_password;
        this.confirm_password = confirm_password;
      }
    }
    const saveNewUser = (validation_name, validation_email, validation_password, confirm_password) => {
      let nuevoUsuario = new User(validation_name, validation_email, validation_password, confirm_password)
      userDataBase.push(nuevoUsuario);
      const dataUser = sessionStorage.setItem(`${validation_email}`, JSON.stringify(nuevoUsuario));
      const getUser = sessionStorage.getItem(`${validation_email}`);
      console.log(JSON.parse(getUser));
    }
    saveNewUser(validation_name.value, validation_email.value, validation_password.value, validation_password_conf.value);
    alert(` ¡Bienvenido ${validation_name.value}!😎`)
    location.href = '/pages/home.html';

  }

}

new_user.addEventListener('click', createNewUse);

