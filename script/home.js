let closeDash = document.querySelector('.fa-power-off');
let user = document.getElementById('user-dash');
let _email = document.getElementById('email');
let get_shipper = document.getElementById('shipper')
let get_order = document.getElementById('order');
let get_fob = document.getElementById('fob');
let get_country = document.getElementById('country')
let get_port = document.getElementById('portCode')
let get_freight = document.getElementById('freight')
let get_insurance = document.getElementById('insurance')
let get_netkg = document.getElementById('netkg');
let create_order = document.getElementById('new-order');
let display_orders = document.getElementById('orders-created');
let set_order_msj = document.querySelector('#orders-msj');
let inner_col = document.getElementById('new-col');
let delete_order = document.getElementById('delete-order');
let displayFinalValue = document.getElementById('display-final-result');
let modal_newOrder = document.getElementById('modal-order');
let display_orderModal = document.querySelector('.newOrder');
let closeForm = document.querySelector('.fa-x');
let listOrders = document.getElementById('total-orders');
const getTable = document.querySelector('table');
let modal_form = document.getElementById('form');
let display_Import_Cal = document.getElementById('modal-import-calculation');
let select = document.getElementById('selection');
let port_code = document.getElementById('un_locode');


//Fetch API
window.onload=()=>{
  fetch(`https://restcountries.com/v3.1/all`)
  .then(res => res.json())
  .then(data=> {
      let countriesList = data; 
        let array = []; 
        for (let i= 1 ; i < countriesList.length; i++)
            array.push(countriesList[i]['name']['common'])
          array.sort(); 
          for(let h = 0; h< array.length; h++){
            select.innerHTML += `<option>${array[h]}</option>`
          }
               
              })
              .catch((error) => {
                console.error('Error:', error);
              });
      }

      select.addEventListener('change', (e)=>{
        let pais = e.target.value; 
        un_locode(pais); 
      })

function un_locode(code){
      fetch(`https://port-api.com/port/search/${code}`)
      .then(res => res.json())
      .then(data=> {let array = data['features'];
              for (let i= 1 ; i < array.length; i++)
              if( array[i]['properties']['un_locode'] != undefined)
              port_code.innerHTML += `<option>${array[i]['properties']['un_locode']}</option>`
                })
            }

//Function for getting orders in localStorage
const ordersArray = JSON.parse(localStorage.getItem('dataOrders')) || [];

//Function that count orders created
const listarOrders = () => {
  listOrders.innerHTML = `<span>Ordenes: ${ordersArray.length}</span>`
}
listarOrders();

//Function display form for creating new order
modal_newOrder.addEventListener('click', () => {
  display_orderModal.style.display = 'flex'
})

//Function close form that create new order
closeForm.addEventListener('click', () => {
  display_orderModal.style.display = 'none'
})

//Delete element from localStorage
const deleteRowLocalStorage = (id) => {
  let getArrayLocalStorage = JSON.parse(localStorage.getItem('dataOrders'));
  let rowIndexLocalStorage = getArrayLocalStorage.findIndex(element => element.orderNumber == id)
  if (rowIndexLocalStorage !== -1) {
    getArrayLocalStorage.splice(rowIndexLocalStorage, 1);
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
                                    <td>${ordersArray[i]['orderCountry']}</td>
                                    <td>${ordersArray[i]['portOrder']}</td>
                                    <td>${ordersArray[i]['insurance']}</td>
                                    <td>${ordersArray[i]['netKg']}</td>
                                    <td>${ordersArray[i]['unitValue'].toFixed(2)}</td>
                                    <td><button id="importar" value='${ordersArray[i]['orderNumber']}' class='btn btn-success btn-sm'><i class="fa-solid fa-calculator"></i></button></td>
                                    <td><button id="delete"value='${ordersArray[i]['orderNumber']}' class='btn btn-danger btn-sm'><i class="fa-solid fa-trash"></i></button></td>
                                    </tr>
                `
  }
}

//Function that get Item for making operations 
const getItemforOperation = (id) => {
  let getArrayLocalStorage = JSON.parse(localStorage.getItem('dataOrders'));
  let rowIndexLocalStorage = getArrayLocalStorage.filter(element => element.orderNumber == id)
  let rowForOperate = rowIndexLocalStorage.forEach(element => element);
}

document.addEventListener('DOMContentLoaded', drawOrders);


//Constructor for creating new orders
class Order {
  constructor(shipper, orderNumber, cost,freight, orderCountry, portOrder, insurance, netKg) {
    this.shipper = shipper.toUpperCase();
    this.orderNumber = orderNumber;
    this.cost = cost;    
    this.freight = freight;
    this.orderCountry = orderCountry; 
    this.portOrder = portOrder; 
    this.insurance = insurance;
    this.netKg = netKg;
    this.unitValue = this.getUnitValue();
  }
  //Method that return unit price
  getUnitValue(cost, netKg) {
    return this.cost / this.netKg
  }
}

//Function that create a new order and display and add it in the table orders
const createNewOrder = (e) => {
  e.preventDefault()

  // Use constructor
  let newOrder = new Order(
    get_shipper.value,
    get_order.value,
    get_fob.value,
    get_freight.value,
    select.value,
    port_code.value,
    get_insurance.value,
    get_netkg.value,);

  if (get_shipper.value == '' ||
    get_order.value == '' ||
    get_fob.value == '' ||
    select.value== '' ||
    port_code.value == '' ||
    get_freight.value == '' ||
    get_insurance.value == '' ||
    get_netkg.value == '') {
    //Sweet alert for checking all value completed
    swal({
      title: "Datos incompletos",
      text: "Debes Ingresar todos los datos",
      icon: "warning",
      button: "Regresar",
    });

  } else {
    newOrder.getUnitValue().toFixed(2);
    let checkOrder = get_order.value;
    //Loop for checking if the orders exist
    for (let i = 0; i < ordersArray.length; i++) {
      if (ordersArray[i]['orderNumber'] === checkOrder) {
        swal({
          title: `Orden ${get_order.value} Existe`,
          icon: "warning",
        });
        return
      }
    }
    //Block of code that store the new order created
    ordersArray.push(newOrder);
    localStorage.setItem('dataOrders', JSON.stringify(ordersArray))
    //Update count of orders stored
    listarOrders();
    //Block of code that add html to the DOM with the new order values
    document.getElementById('orders-msj').style.display = 'none'
    const newRow = document.getElementById('new-col');
    const getTable = document.querySelector('table');
    newRow.innerHTML += `<tr>
                                    <td value='${get_order.value}' >${get_order.value}</td>
                                    <td class='text-center'>${get_shipper.value}</td>
                                    <td class='text-center' step='0.01'>${get_fob.value}</td>
                                    <td class='text-center'>${get_freight.value}</td>
                                    <td class='text-center'>${select.value}</td>
                                    <td class='text-center'>${port_code.value}</td>
                                    <td class='text-center'>${get_insurance.value}</td>
                                    <td class='text-center'>${get_netkg.value}</td>
                                    <td class='text-center'>${newOrder.getUnitValue().toFixed(2)}</td>
                                    <td><button id="importar" value='${get_order.value}' class='btn btn-success btn-sm'><i class="fa-solid fa-calculator"></i></button></td>
                                    <td><button id="delete"value='${get_order.value}' class='btn btn-danger btn-sm'><i class="fa-solid fa-trash"></i></button></td>
                                    </tr>
                                  
                `
    form.reset();
    display_orderModal.style.display = 'none'
    //Confirm order created 
    Toastify({
      text: "Orden Creada",
      duration: 3000
    }).showToast();
    return
  }
}

//Function operate for delete order from the table or make the operation
getTable.addEventListener('click', (e) => {
  //Block of code that retrieve the id of the order selected
  let btn = e.target
  let imporId = btn.closest('button').value;
  //Function for deleting order after confirmation 
  const deleteRow = (e) => {
    listarOrders()
    //Alert for confirm delete the order
    swal({
      title: `Seguro quieres eliminar tu order ${imporId}?`,
      text: "Una vez lo elimines, no podr??s recuperar tu orden",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        // if else statement for check if delete the order or not
        if (willDelete) {
          deleteRowLocalStorage(imporId)
          listarOrders();
          localStorage.removeItem(`${imporId}`);
          btn.closest('tr').remove()
          setTimeout(()=>{
            location.reload()
          },2000)
          listOrders.innerHTML = `
                              <p>Ordenes: ${localStorage.length}`
          if (localStorage.length == 0) {
            document.getElementById('orders-msj').style.display = 'flex'
          }
          //Alert that confirm te order umber deleted 
          Toastify({
            text: `Orden ${imporId} eliminada `,
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();

        } else {
          //Alert that confirm if the order was not deleted and is still stored
          swal("??Tu Orden seguir?? guardada!");
        }
      });

  }

  //Function for calculations 
  const calcularImpo = (e) => {

    //Block of code that filter order number selected
    let getArrayLocalStorage = JSON.parse(localStorage.getItem('dataOrders'));
    let rowIndexLocalStorage = getArrayLocalStorage.filter(element => element.orderNumber == `${imporId}`)
    let rowForOperate = rowIndexLocalStorage.forEach(element => element);
    //Loop for selecting the values of the order
    for (let i = 0; i < rowIndexLocalStorage.length; i++) {
      //Deconstructor for managing orders?? values
      let { cost, freight, insurance, netKg, orderNumber, shipper, unitValue, orderCountry, portOrder} = rowIndexLocalStorage[i];
      let itsRight = imporId === orderNumber;
      if (itsRight) {
        let costOrder = Number(cost);
        let insuranceOrder = Number(insurance);
        let freightOrder = Number(freight);
        let shipperOrder = String(shipper);
        let netKgOrder = Number(netKg);
        let unitValueOrder = Number(unitValue);
        let countryOrder = String(orderCountry);
        let orderPort = String(portOrder)

        //Call fanction for calculations with the value retreived
        valorIncoterm(costOrder, insuranceOrder, freightOrder, shipperOrder, netKgOrder, unitValueOrder,countryOrder,orderPort)
      }

    }
  }
  //Ternary operator for delete or do calculations acording the order selected
  let idBtn = btn.closest('button').id;
  (idBtn === 'delete' ? deleteRow() : calcularImpo())

})

//Call to action for create a new order
create_order.onclick = createNewOrder;

//Funcion display order??s value selected for calculation
const valorIncoterm = (valorCosto, valorSeguro, valorFlete, shipper) => {
  display_Import_Cal.innerHTML = `<form id='modal-import-operation'>
  <div class="form-row">
    <div class="form-group ">
      <label for="shipperOrder">Proveedor</label>
      <input type="text" class="form-control"  value ='${shipper}'id="shipperOrder">
    </div>
    <div class="form-group ">
      <label for="fobOrder">Valor FOB</label>
      <input type="number" class="form-control" id="forbOrder" value='${valorCosto}'>
    </div>
  </div>
  <div class="form-group">
    <label for="freightOrder">Flete</label>
    <input type="text" class="form-control" id="freightOrder" value='${valorFlete}'>
  </div>
  <div class="form-group">
    <label for="insuranceOrder">Seguro</label>
    <input type="text" class="form-control" id="insuranceOrder" value='${valorSeguro}'>
  </div>
    <div class="form-group col-md-4">
      <label for="customOrder">Aduana</label>
      <select id="customOrder" class="form-control">
        <option selected>Choose...</option>
        <option value='1'>Buenos Aires</option>
        <option value='2'>Rio Grande</option>
        <option value='3'>Ushuaia</option>
      </select>
    </div>
  </div>
  <button class="btn btn-primary m-3"id='modal-operation'>Calcular</button>
</form>`;

  document.getElementById('modal-operation').addEventListener('click', (e) => {
    e.preventDefault()
    displayFinalValue.style.display = 'flex';
    let aduanaCase = Number(customOrder.value);
    let valorAduana = (valorCosto + valorFlete + valorSeguro)
    funcionParaAduana(aduanaCase, valorAduana)
    form.reset();
    document.getElementById('modal-import-operation').style.display = 'none';    
  })
}

//Function for cleaning DOM after calculations
let deleteDetails = document.getElementById('clean-screen');
displayFinalValue.addEventListener('click', () => {
  displayFinalValue.style.display = 'none';
})


// Function with Switch statement for do calculations according to the customs selected
const funcionParaAduana = (valorCase, valorCalculo) => {
  switch (valorCase) {
    case 1:
      let totalB = valorCalculo + (valorCalculo * 0.21) + (valorCalculo * 0.35);
      let impuestos = ((valorCalculo * 0.21) + (valorCalculo * 0.35)).toFixed(2);
      swal({
        title: "Su importaci??n deber?? cumplir con los Impuestos",
        text: "IVA tasa general del 21% \n Otros impuestos 35% ",
        icon: "info",
        button: "Aceptar",
      });
      displayFinalValue.innerHTML = `<div id="modal-import-operation-done"> 
                                          <p>El valor de su mercader??a en Buenos Aires es: </p>
                                          <p>Impuesto: $ ${impuestos} </p>
                                          <p>Valor en Aduana: $ ${valorCalculo} </p>
                                          <hr>
                                          <p class='font-weight-bold'>Valor Final: $ ${totalB.toFixed(2)} </p>
                                          <button id='clean-screen' class="btn btn-secondary">Limpiar</button>
                                        </div>
                                        `;
      break;
    case 2:
      swal("Ingrese el valor del transporte terrestre:", {
        content: {
          element: "input",
          attributes: {
            type: "number",
          },
        },
      })
        .then((value) => {
          //swal(`You typed: ${value}`);
          let truck = Number(value);
          let totalR = valorCalculo + truck;
          displayFinalValue.innerHTML = `<div id="modal-import-operation-done">
                                          <p>El valor de su mercader??a en Rio Grande es: </p>
                                          <p>Valor del Transporte Terrestre: $ ${truck} </p>
                                          <p>Valor en Aduana: $ ${valorCalculo} </p>
                                          <hr>
                                          <p class='font-weight-bold'>Valor Final: $ ${totalR.toFixed(2)} </p>
                                          <button id='clean-screen' class="btn btn-secondary">Limpiar</button>
                                        </div>
                                        `;
        });
      break;
    case 3:
      swal({
        title: "Importaci??n en Zona Econ??mica",
        text: "Libre de impuestos de importaci??n",
        icon: "info",
        button: "Aceptar",
      });
      displayFinalValue.innerHTML = `<div id="modal-import-operation-done">
                                          <p>El valor de su mercader??a en Zona Econ??mica especial (Libre de impuestos) es: </p>
                                           <p>Valor en Aduana: $ ${valorCalculo} </p>
                                           <hr>
                                          <p class='font-weight-bold'>Valor Final: $ ${valorCalculo.toFixed(2)} </p>
                                          <button id='clean-screen' class="btn btn-secondary">Limpiar</button>
                                          </div>
                                        `;
      break;
    default:
      swal({
        title: `??Debes seleccionar una Aduana!`,
        icon: "info",
        dangerMode: true,
      })
  }
}

closeDash.addEventListener('click', () => {
  location.href = '../index.html';})