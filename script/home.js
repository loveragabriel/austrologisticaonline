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
let diplayFinalValue = document.getElementById('display-final-result');
let modal_newOrder = document.getElementById('modal-order');
let display_orderModal = document.querySelector('.newOrder');
let closeForm = document.querySelector('.fa-x');
let listOrders = document.getElementById('total-orders');
const getTable = document.querySelector('table');
let modal_form = document.getElementById('form');

let ordersArray = JSON.parse(localStorage.getItem('dataOrders')) || [];
//Function display Modal


const listarOrders = () => {
  listOrders.innerHTML = `<p>Ordenes: ${JSON.parse(localStorage.getItem('dataOrders')).length}`
}
listarOrders();

modal_newOrder.addEventListener('click', () => {
  display_orderModal.style.display = 'flex'
})

closeForm.addEventListener('click', () => {
  display_orderModal.style.display = 'none'
})


//Delete element form localStorage
const deleteRowLocalStorage=(id)=>{
  let getArrayLocalStorage = JSON.parse(localStorage.getItem('dataOrders'));
  let rowIndexLocalStorage = getArrayLocalStorage.findIndex(element => element.orderNumber == id )
  if(rowIndexLocalStorage !== -1){
    getArrayLocalStorage.splice(rowIndexLocalStorage,1);
  }
  localStorage.setItem("dataOrders", JSON.stringify(getArrayLocalStorage));

}

//Function drawOrder on screen 
const drawOrders = () => {
  for (let i = 0; i < ordersArray.length; i++) {
    let obj = ordersArray[i];
    document.getElementById('orders-msj').style.display = 'none'
    const newRow = document.getElementById('new-col');
    const getTable = document.querySelector('table');
    newRow.innerHTML += `<tr>
                                    <td value='${ordersArray[i]['orderNumber']}' >${ordersArray[i]['orderNumber']}</td>
                                    <td>${ordersArray[i]['shipper']}</td>
                                    <td>${ordersArray[i]['cost']}</td>
                                    <td>${ordersArray[i]['freight']}</td>
                                    <td>${ordersArray[i]['insurance']}</td>
                                    <td>${ordersArray[i]['netKg']}</td>
                                    <td>${ordersArray[i]['unitValue']}</td>
                                    <td><button id="delete"value='${ordersArray[i]['orderNumber']}' class='btn btn-danger btn-sm'>Eliminar</button></td>
                                    <td><button id="importar" value='${ordersArray[i]['orderNumber']}' class='btn btn-success btn-sm'>Calcular</button></td>
                                    </tr>
                `
  }
}

// get Item for operate operations 
const getItemforOperation=(id)=>{
  let getArrayLocalStorage = JSON.parse(localStorage.getItem('dataOrders'));
  let rowIndexLocalStorage = getArrayLocalStorage.filter(element => element.orderNumber == id )
  let rowForOperate =  rowIndexLocalStorage.forEach(element =>  element); 


}

document.addEventListener('DOMContentLoaded', drawOrders);
//Declaración de array para cargar las ordenes
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
  //Creación de método 
  getUnitValue(cost, netKg) {
    return this.cost / this.netKg
  }
}
//Función uso de constructor y uso de métodos 
const createNewOrder = (e) => {
  e.preventDefault()
  //Use de constructor
  let newOrder = new Order(get_shipper.value,
    get_order.value,
    get_fob.value,
    get_freight.value,
    get_insurance.value,
    get_netkg.value,);

  if (get_shipper.value == '' ||
    get_order.value == '' ||
    get_fob.value == '' ||
    get_freight.value == '' ||
    get_insurance.value == '' ||
    get_netkg.value == '') {
    swal({
      title: "Datos incompletos",
      text: "Debes Ingresar todos los datos",
      icon: "warning",
      button: "Regresar",
    });

  } else {
    newOrder.getUnitValue();

    //console.log(newOrder);

    let checkOrder = get_order.value;

    for (let i = 0; i < ordersArray.length; i++) {
      // console.log(ordersArray[i]['orderNumber'],checkOrder)
      if (ordersArray[i]['orderNumber'] === checkOrder) {
        swal({
          title: `Orden ${get_order.value} Existe`,
          icon: "warning",
        });
        return console.log("Item already exists in the array.")

      }
    }
    ordersArray.push(newOrder);
    localStorage.setItem('dataOrders', JSON.stringify(ordersArray))
    listarOrders();
    document.getElementById('orders-msj').style.display = 'none'
    const newRow = document.getElementById('new-col');
    const getTable = document.querySelector('table');
    newRow.innerHTML += `<tr>
                                    <td value='${get_order.value}' >${get_order.value}</td>
                                    <td>${get_shipper.value}</td>
                                    <td>${get_fob.value}</td>
                                    <td>${get_freight.value}</td>
                                    <td>${get_insurance.value}</td>
                                    <td>${get_netkg.value}</td>
                                    <td>${newOrder.getUnitValue().toFixed(2)}</td>
                                    <td><button id="delete"value='${get_order.value}' class='btn btn-danger btn-sm'>Eliminar</button></td>
                                    <td><button id="importar" value='${get_order.value}' class='btn btn-success btn-sm'>Calcular</button></td>
                                    </tr>
                `
    form.reset();
   display_orderModal.style.display = 'none'

    swal({
      title: `Orden ${get_order.value} Creada`,
      icon: "success"
    });
    return console.log("Item added to the array.");
  }

  // ordersArray.push(newOrder);

  // if (localStorage.getItem(`${get_order.value}`) !== null) {
  //     swal({
  //       title: `Orden ${get_order.value} Existe`,
  //       icon: "warning",
  //     });
  //     return
  //   } else {

  // localStorage.setItem('dataOrders', JSON.stringify(ordersArray));
  // swal({
  //   title: `Orden ${get_order.value} Creada`,
  //   icon: "success",
  // }); 
  // modal_form.style.display = 'none'
  // document.getElementById('orders-msj').style.display = 'none'
  // const newRow = document.getElementById('new-col');
  // newRow.innerHTML += `<tr>
  // <td value='${get_order.value}' >${get_order.value}</td>
  //                     <td>${get_shipper.value}</td>
  //                     <td>${get_fob.value}</td>
  //                     <td>${get_freight.value}</td>
  //                     <td>${get_insurance.value}</td>
  //                     <td>${get_netkg.value}</td>
  //                     <td>${newOrder.getUnitValue().toFixed(2)}</td>
  //                     <td><button id="delete"value='${get_order.value}' class='btn btn-danger btn-sm'>Eliminar</button></td>
  //                     <td><button id="importar" value='${get_order.value}' class='btn btn-success btn-sm'>Calcular</button></td>
  //                     </tr>
  // `
  // listarOrders()
}

getTable.addEventListener('click', (e) => {

  let btn = e.target
  let imporId = btn.closest('button').value;
  console.log(imporId);
  
 const deleteRow = (e) => {
    // 
    listarOrders()

    swal({
      title: `Seguro quieres eliminar tu order ${imporId}?`,
      text: "Una vez lo elimines, no podrás recuperar tu orden",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteRowLocalStorage(imporId)
          listarOrders();
          localStorage.removeItem(`${imporId}`);
          btn.closest('tr').remove()
          listOrders.innerHTML = `
                              <p>Ordenes: ${localStorage.length}`
          if (localStorage.length == 0) {
            document.getElementById('orders-msj').style.display = 'flex'

          }
          swal(`Orden ${imporId} eliminada con éxito`, {
            icon: "success",
          });
        } else {
          swal("Tu Orden seguirá guardada");
        }
      });

  }

  const calcularImpo = (e) => {
    // this code return the id value but the all row


    {/**No usar por el momento*/ }


    //Uso de deconstructor

    let getArrayLocalStorage = JSON.parse(localStorage.getItem('dataOrders'));
    let rowIndexLocalStorage = getArrayLocalStorage.filter(element => element.orderNumber == `${imporId}` )
    let rowForOperate =  rowIndexLocalStorage.forEach(element =>  element); 
    for (let i = 0; i < rowIndexLocalStorage.length; i++) {
      let {cost, freight, insurance, orderNumber} = rowIndexLocalStorage[i];
    let itsRight = imporId === orderNumber;
    if (itsRight) {

      let costOrder = Number(cost);
      let insuranceOrder = Number(insurance);
      let freightOrder = Number(freight);

      valorIncoterm(costOrder, insuranceOrder, freightOrder)
    }

  }
}
  let idBtn = btn.closest('button').id;
  (idBtn === 'delete' ? deleteRow() : calcularImpo())

})

{/**
//     ordersArray.push(newOrder);
//     newOrder.getUnitValue()
//     console.log(ordersArray);
//     console.log(newOrder);
//     // creo la etiqueta que voy a incluir en el html
//     // utilizo innerHTML para definir que voy a incluir en la tag
//     // selecciono la constante que me llama el id donde voy a incluir la nueva etiqueta y uso append a prepend 

//     document.getElementById('orders-msj').style.display = 'none'
//     const newRow = document.getElementById('new-col');
//     const getTable = document.querySelector('table');
//     newRow.innerHTML += `<tr>
//                         <td value='${get_order.value}' >${get_order.value}</td>
//                         <td>${get_shipper.value}</td>
//                         <td>${get_fob.value}</td>
//                         <td>${get_freight.value}</td>
//                         <td>${get_insurance.value}</td>
//                         <td>${get_netkg.value}</td>
//                         <td>${newOrder.getUnitValue().toFixed(2)}</td>
//                         <td><button id="delete"value='${get_order.value}' class='btn btn-danger btn-sm'>Eliminar</button></td>
//                         <td><button id="importar" value='${get_order.value}' class='btn btn-success btn-sm'>Calcular</button></td>
//                         </tr>
//     `
//     //Guardo nueva orden en localStora con número de orden como ID para usarla al momento de querer hacer el calculo. 
//     const dataOrders = localStorage.setItem(`${get_order.value}`, JSON.stringify(newOrder));

//     display_orderModal.style.display = 'none'
//     swal({
//       title: `Orden ${get_order.value} Creada`,
//       icon: "success",
//     console.log(dataOrders);

// listarOrders();



//     //Función para operar con la orden generada
//     //deleRow para eliminar una orden creada
//     //calculrImpo para realizar el calculo de importación con los datos guardados en localStorage de la orden. 
//     //Uso de la función funcionParaAduana para hacer los calculos e imprimir resultado en el DOM. 
//     //Uso de deconstructor para objetos
//     getTable.addEventListener('click', (e) => {

//       let btn = e.target
//       let imporId = btn.closest('button').value;
//       const getOrder = localStorage.getItem(`${imporId}`);
//         let retriveOrder = JSON.parse(getOrder);
//         let { orderNumber, shipper, cost, freight, insurance, netKg, unitValue } = retriveOrder


//       const deleteRow = (e) => {
//         // 
//         // listarOrders()

//         swal({
//           title: `Seguro quieres eliminar tu order ${imporId}?`,
//           text: "Una vez lo elimines, no podrás recuperar tu orden",
//           icon: "warning",
//           buttons: true,
//           dangerMode: true,
//         })
//         .then((willDelete) => {
//           if (willDelete) {
//             localStorage.removeItem(`${imporId}`);
//             btn.closest('tr').remove()
//             listOrders.innerHTML = `
//                         <p>Ordenes: ${localStorage.length}`

//             swal(`Orden ${imporId} eliminada con éxito`, {
//               icon: "success",
//             });
//           } else {
//             swal("Tu Orden seguirá guardada");
//           }
//         });

//       }

//       const calcularImpo = (e) => {
//         // this code return the id value but the all row


//         {/**No usar por el momento


//         //Uso de deconstructor

//         let itsRight = imporId === orderNumber;
//         if (itsRight) {

//           let costOrder = Number(cost);
//           let insuranceOrder = Number(insurance);
//           let freightOrder = Number(freight);

//           valorIncoterm(costOrder, insuranceOrder, freightOrder)
//         }

//       }

//       let idBtn = btn.closest('button').id;
//       (idBtn === 'delete' ? deleteRow() : calcularImpo())

//     })

//   }
*/}


create_order.onclick = createNewOrder;





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

//Función para eliminar elemento HTML onClick.
let deleteDetails = document.getElementById('clean-screen');
diplayFinalValue.addEventListener('click', () => {
  diplayFinalValue.style.display = 'none';
})

// Funcion para calcular valor aduana Uso de Switch 
//Uso de innerHTML para dibujar elemento HTML en el DOM desde js. 
const funcionParaAduana = (valorCase, valorCalculo) => {
  switch (valorCase) {
    case 1:
      let totalB = valorCalculo + (valorCalculo * 0.21) + (valorCalculo * 0.35);
      let impuestos = ((valorCalculo * 0.21) + (valorCalculo * 0.35)).toFixed(2);
      alert('Recuerde de deberá cumpliar con los impuestos correspondientes')
      diplayFinalValue.innerHTML = `<div> 
                                          <p>El valor de su mercadería en Buenos Aires es: </p>
                                          <p>Impuesto: ${impuestos} </p>
                                          <p>Valor en Aduana: ${valorCalculo} </p>
                                          <p>Valor Final: ${totalB} </p>
                                          <button id='clean-screen' class="btn btn-secondary">Limpiar</button>
                                        </div>
                                        `;
      break;
    case 2:
      let camion = Number(prompt('Ingrese el valor de camión'));
      let totalR = valorCalculo + camion;
      diplayFinalValue.innerHTML = `<div> 
                                          <p>El valor de su mercadería en Rio Grande es: </p>
                                          <p>Valor del Transporte Terrestre: ${camion} </p>
                                          <p>Valor en Aduana: ${valorCalculo} </p>
                                          <p>Valor Final: ${totalR} </p>
                                          <button id='clean-screen' class="btn btn-secondary">Limpiar</button>
                                        </div>
                                        `;
      alert('El valor en Aduana RGA es ' + totalR)
      break;
    case 3:
      diplayFinalValue.innerHTML = `<div> 
                                          <p>El valor de su mercadería en Zona Económica especial (Libre de impuestos) es: </p>
                                           <p>Valor en Aduana: ${valorCalculo} </p>
                                          <p>Valor Final: ${valorCalculo} </p>
                                          <button id='clean-screen' class="btn btn-secondary">Limpiar</button>
                                          </div>
                                        `;
      break;
    default:
      alert('Debes ingresar una aduana correcta');
  }
}

closeDash.addEventListener('click', () => {
  location.href = '../index.html';
})

    //     });