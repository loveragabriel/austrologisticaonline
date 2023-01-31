let log_In = document.getElementById('open-logIn');
let logIn_off = document.getElementById('power-off');
let logInUser = document.getElementById('check-User')
let check_email = document.getElementById('email');
let check_password = document.getElementById('password');




let password_input =check_password.value;



logIn_off.addEventListener('click', ()=>{
    location.href = '../index.html';
})

logInUser.addEventListener('click',(e)=>{
    e.preventDefault()
    //cath the input values 
    let email = check_email.value;
    let password =  check_password.value; 
    //Use the email value to call my storage 
    let getUser = localStorage.getItem(email);
    //Parse my object and get the email, password and name stored 
    let storedUser = (JSON.parse(getUser).validation_email);
    let storedPassword = (JSON.parse(getUser).validation_password); 
    let name = (JSON.parse(getUser).validation_name); 
    //check the input and the stored value  
    if(email === storedUser && password === storedPassword){
        alert(`Bienvenido ${name}`)
        location.href = '/pages/dash.html';
    } else if (storedUser || storedPassword == null || ''){
        alert('Debe registrarse');
    } else alert('⚠️Verifique sus credenciales!');



})