let headerS = document.querySelector('.solid-bckg');
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput');
let formClose = document.querySelector('.fa-x')
let openForm = document.getElementById('open-form');
let getForm = document.getElementById('form');

openForm.addEventListener('click',()=>{
  getForm.style.display = 'flex'
})

formClose.addEventListener('click', ()=>{
  getForm.style.display = 'none'
})