let closeDash = document.getElementById('power-off');
let user = document.getElementById('user-dash');

let _email = document.getElementById('email');
let email = _email.value;
let getUser = localStorage.getItem(email);
let storedUser = (JSON.parse(getUser).validation_email);
let storedPassword = (JSON.parse(getUser).validation_password); 
let name = (JSON.parse(getUser).validation_name); 

()=>{
    user.innerHTML = `<h1>${name}</h1>`
}
closeDash.addEventListener('click', ()=>{
    window.localStorage.clear();
    location.href = '../index.html';
})