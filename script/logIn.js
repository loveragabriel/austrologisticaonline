let log_In = document.getElementById('open-logIn');
let logIn_off = document.getElementById('power-off');

const la =()=>{
    console.log('iT WORKS!')
    location.href = '/pages/dash.html';
}


logIn_off.addEventListener('click', ()=>{
    location.href = '../index.html';

})
log_In.onclick=la; 