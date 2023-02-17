let log_In = document.getElementById('open-logIn');
let logIn_off = document.getElementById('power-off');
let logInUser = document.getElementById('check-User')
let check_email = document.getElementById('email');
let check_password = document.getElementById('password');

const userDataBase = JSON.parse(localStorage.getItem('dataUser')) || [];

logIn_off.addEventListener('click', ()=>{
    location.href = '../index.html';
})

const getUserStored=(getValue)=>{
  let getDataLocalStorage = JSON.parse(localStorage.getItem('dataUser'));
  let rowIndexLocalStorage = getDataLocalStorage.findIndex(element => element.id == getValue)
  let emailStored = getDataLocalStorage[rowIndexLocalStorage]['validation_email']; 
  let passwordStored = getDataLocalStorage[rowIndexLocalStorage]['validation_password']; 
}
//Función para validar usuario
//Uso de getItem para tomar registro de usuario y verificar si está guardado en sessionStorage. 
//Uso de parse
logInUser.addEventListener('click',(e)=>{
    e.preventDefault()
    //cath the input values 
    let email = check_email.value;
    let password =  check_password.value; 
    let getDataLocalStorage = JSON.parse(localStorage.getItem('dataUser'));
    let rowIndexLocalStorage = getDataLocalStorage.findIndex(element => element.id == email)
    let emailStored = getDataLocalStorage[rowIndexLocalStorage]['validation_email']; 
    let passwordStored = getDataLocalStorage[rowIndexLocalStorage]['validation_password']; 
    let nameStored = getDataLocalStorage[rowIndexLocalStorage]['validation_name']; 


    if(email === emailStored && password === passwordStored){
      swal({
        title: `Hola ${nameStored}, Bienvenido`,
        icon: "info",
      });
      setTimeout(()=>{
        location.href = './home.html';
      },1000)
      
    } else 
    swal({
      title: `Verifique los datos ingresados`,
      icon: "error",
    });
    //Use the email value to call my storage 
    // let getUser = sessionStorage.getItem(email);
    //Parse my object and get the email, password and name stored 
    // try {
    //     let storedUser = (JSON.parse(getUser).validation_email);
    //     let storedPassword = (JSON.parse(getUser).validation_password); 
    //     let name = (JSON.parse(getUser).validation_name); 
    //     if (email === storedUser && password === storedPassword){
    //         alert(`Bienvenido ${name}!`)
            
    //     }       }
    //   catch(err) {
    //     alert('Verifica las credenciales ingresadas'); 
    //   }
    
    //check the input and the stored value  

})

