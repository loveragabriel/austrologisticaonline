let headerS = document.querySelector('.solid-bckg');
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput');
let formClose = document.getElementById("closeForm");
let openForm = document.getElementById('form_signIn');

openForm.addEventListener('click',()=>{
  form.style.visibility = 'visible'
})

formClose.addEventListener('click', ()=>{
  formClose.style.display = 'none'
})