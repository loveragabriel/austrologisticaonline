let log_In = document.getElementById('open-logIn');
let logIn_off = document.getElementById('power-off');
let logInUser = document.getElementById('check-User')
let check_email = document.getElementById('email');
let check_password = document.getElementById('password');



logIn_off.addEventListener('click', ()=>{
    location.href = '../index.html';
})

//Función para validar usuario
//Uso de getItem para tomar registro de usuario y verificar si está guardado en sessionStorage. 
//Uso de parse
logInUser.addEventListener('click',(e)=>{
    e.preventDefault()
    //cath the input values 
    let email = check_email.value;
    let password =  check_password.value; 
    //Use the email value to call my storage 
    let getUser = sessionStorage.getItem(email);
    //Parse my object and get the email, password and name stored 
    try {
        let storedUser = (JSON.parse(getUser).validation_email);
        let storedPassword = (JSON.parse(getUser).validation_password); 
        let name = (JSON.parse(getUser).validation_name); 
        if (email === storedUser && password === storedPassword){
            alert(`Bienvenido ${name}!`)
            location.href = './home.html';
        }       }
      catch(err) {
        alert('Verifica las credenciales ingresadas'); 
      }
    
    //check the input and the stored value  

})

