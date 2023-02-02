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
  ordersArray.push(newOrder);
  newOrder.getUnitValue();
console.log(ordersArray);
// creo la etiqueta que voy a incluir en el html
// utilizo innerHTML para definir que voy a incluir en la tag
// selecciono la constante que me llama el id donde voy a incluir la nueva etiqueta y uso append a prepend 
const liTag = document.createElement('li')
liTag.innerHTML = `${get_shipper.value} +
                    ${get_fob.value};`
display_orders.appendChild(liTag);
}



create_order.onclick=createNewOrder; 