let closeDash = document.querySelector('.fa-power-off');
let user = document.getElementById('user-dash');
let _email = document.getElementById('email');
let get_shipper = document.getElementById('shipper')
let get_order = document.getElementById('order');
let get_fob = document.getElementById('fob')
let get_freight = document.getElementById('freight')
let get_insurance = document.getElementById('insurance')
let get_netkg = document.getElementById('netkg');
let create_order = document.getElementById('new-order');
let display_orders = document.getElementById('orders-created');
let set_order_msj = document.querySelector('#orders-msj');
let inner_col = document.getElementById('new-col');
let delete_order = document.getElementById('delete-order');

 


closeDash.addEventListener('click', ()=>{
    location.href = '../index.html';
})

//Declaración de variable para cargar las ordenes
let ordersArray = [];
//Creación de constructor 
class Order {
    constructor(shipper, orderNumber, cost, freight, insurance, netKg) {
      this.shipper = shipper.toUpperCase();
      this.orderNumber = orderNumber;
      this.cost = cost;
      this.freight = freight;
      this.insurance = insurance;
      this.netKg = netKg;
      this.unitValue = this.getUnitValue();
    }
    //Createción de método 
    getUnitValue(cost, netKg) {
      return this.cost / this.netKg
    }
  }
//Función constiene constructo y uso de métodos 
const createNewOrder = (e) => {
    e.preventDefault() 
  //Use de constructor
  let newOrder = new Order(get_shipper.value, 
    get_order.value,
    get_fob.value,
    get_freight.value,
    get_insurance.value,
    get_netkg.value,);
  //Uso de Método push 
  if(get_shipper.value == '' ||
    get_order.value == '',
    get_fob.value == '',
    get_freight.value == '',
    get_insurance.value == '',
    get_netkg.value == ''){
      alert('Debe completar todos los datos')

    } else { newOrder.getUnitValue();
      ordersArray.push(newOrder);
      newOrder.getUnitValue()
      console.log(ordersArray);
    // creo la etiqueta que voy a incluir en el html
    // utilizo innerHTML para definir que voy a incluir en la tag
    // selecciono la constante que me llama el id donde voy a incluir la nueva etiqueta y uso append a prepend 
    
    document.getElementById('orders-msj').style.display = 'none'
    const newRow = document.getElementById('new-col');
    const getTable = document.querySelector('table');
    newRow.innerHTML += `<tr>
                        <td>${get_order.value}</td>
                        <td>${get_shipper.value}</td>
                        <td>${get_fob.value}</td>
                        <td>${get_freight.value}</td>
                        <td>${get_insurance.value}</td>
                        <td>${get_netkg.value}</td>
                        <td>${newOrder.getUnitValue().toFixed(2)}</td>
                        <td><button id="delete" value='${get_order.value}' class='btn btn-danger btn-sm'>Eliminar</button></td>
                        <td><button id="importar" value='${get_order.value}' class='btn btn-success btn-sm'>Calcular</button></td>
                        </tr>
    `



    const dataOrders =  localStorage.setItem(`${get_order.value}`, JSON.stringify(newOrder));
    
   



    getTable.addEventListener('click',(e)=>{
        //  console.log(ordersArray)
        //  let getId = document.getElementById(`impor-row${get_order.value}}`);
        //  console.log(getId);
        // alert(e.srcElement.id); 

        {/* Con este obtengo el element actual
      let btn = e.target
      btn.closest('tr').remove();
        con este obtengo el id del botton que seleccione
        btn.closest('button').id;

      */}

      let btn = e.target
 const deleteRow =(e)=>{
  btn.closest('tr').remove()
 }   

 const calcularImpo=(e)=>{
  // this code return the id value but the all row
  //let imporId = btn.value 
  let imporId = btn.value

   const getOrder = localStorage.getItem(`${imporId}`);
     console.log(JSON.parse(getOrder));
    // location.href = '/pages/dash.html';

}
 
 

      let idBtn = btn.closest('button').id; 
      (idBtn==='delete'? deleteRow() : calcularImpo())

        
       // let getId = document.getElementById(`${e.srcElement.id}`);
       // console.log(getId);

      })

  }

  
 
}






function eliminarOrden(){
  alert('Hello') 
}

create_order.onclick=createNewOrder; 


