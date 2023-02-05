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


//Funcion suma de costos - incorporación de condicionales
const valorIncoterm = (valorCosto, valorSeguro, valorFlete) => {
  if (!valorCosto || valorCosto == 0 || valorCosto == '') {
    alert('Debe Ingresar valor de su mercaderí, intente nuevamente.')
  } else if (!valorFlete || valorFlete == 0 || valorFlete == '') {
    alert('Debe ingresar el valor del flete');
  }
  else if (valorCosto && !valorSeguro || valorSeguro == 0 || valorSeguro == '' && valorFlete) {
    let valorAduana = valorCosto + (valorCosto * 0.01) + valorFlete;
    alert('El valor del seguro será del 1% del costo de la mercadería ingresada');
    let aduana = Number(prompt('Ingrese la aduana de destino \n 1. BUE \n 2. RGA \n 3. USH'));
    funcionParaAduana(aduana, valorAduana);
  } else if (valorCosto, valorSeguro, valorFlete) {
    let valorAduana = valorCosto + valorSeguro + valorFlete;
    let aduana = Number(prompt('Ingrese la aduana de destino \n 1. BUE \n 2. RGA \n 3. USH'));
    funcionParaAduana(aduana, valorAduana);

  }
  else alert('Los valores son incorrectos')
}


// Funcion para calcular valor aduana Uso de Switch 
const funcionParaAduana = (valorCase, valorCalculo) => {
  switch (valorCase) {
    case 1:
      let totalB = valorCalculo + (valorCalculo * 0.21) + (valorCalculo * 0.35);
      alert('Recuerde de deberá cumpliar con los impuestos correspondientes')
      alert('El valor en Aduana BUE es ' + totalB)
      break;
    case 2:
      let camion = Number(prompt('Ingrese el valor de camión'));
      let totalR = valorCalculo + camion;
      alert('El valor en Aduana RGA es ' + totalR)
      break;
    case 3:
      alert('El valor en Aduana USH zona Economica especial es ' + valorCalculo)
      break;
    default:
      alert('Debes ingresar una aduana correcta');
  }
}

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
     
     let btn = e.target
 const deleteRow =(e)=>{
  btn.closest('tr').remove()
 }   

 const calcularImpo=(e)=>{
  // this code return the id value but the all row
  //let imporId = btn.value 
  let imporId = btn.value

   const getOrder = localStorage.getItem(`${imporId}`);
    let retriveOrder = JSON.parse(getOrder);

     let {orderNumber,shipper, cost, freight, insurance, netKg,unitValue} = retriveOrder

     let itsRight = imporId === orderNumber; 
     if (itsRight) {

      let costOrder = Number(cost);
      let insuranceOrder = Number(insurance);
      let freightOrder = Number(freight);

      valorIncoterm(costOrder,insuranceOrder,freightOrder)
      }
{/*


     const calcularImpo = () => {
      //Llamado para seleccionar una objeto del array ordenes que servirá para calcular los gatos de importación de esa orden.  
      //Uso de iteración para evaluar 3 veces las credenciales ingresadas.    
    
          //Creación de función que usa el método find para identificar una orden y poder calcular los gastos de importación. 
          const encontrarFind = (order_ = prompt('Ingresa Numero de orden a Calcular').toUpperCase()) => ordersArray.find((item) => {
            let itsRight = item.orderNumber === order_;
            if (itsRight) {
              alert(`Calcularemos la importación para la siguiente orden: 
                            ${item.shipper}
                            ${item.orderNumber}
                            ${item.cost} 
                            ${item.freight}
                            ${item.insurance}`);
    
              let cost = Number(item.cost);
              let insurance = Number(item.insurance);
              let freight = Number(item.freight);
              //Uso de función con datos llamados del objeto orden para calcular gastos de importación. 
              valorIncoterm(cost, insurance, freight);
            }
          });
    
          encontrarFind();break
        }
        --intentos
        //alert('Verifica las credenciales ingresadas.')
    
        if (intentos == 0) {
          alert('No podrás calcular tu importación credenciales');
          break
        }
      }
    }
    
    
    btn_calculo_impo.onclick = calcularImpo;



///termina aquí
 */}
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


