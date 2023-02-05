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
      diplayFinalValue.innerHTML += `<div> 
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
      diplayFinalValue.innerHTML += `<div> 
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
      diplayFinalValue.innerHTML += `<div> 
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

//Declaración de array para cargar las ordenes
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
  //Uso de Método push 
  if (get_shipper.value == '' ||
    get_order.value == '',
    get_fob.value == '',
    get_freight.value == '',
    get_insurance.value == '',
    get_netkg.value == '') {
    alert('Debe completar todos los datos')

  } else {
    newOrder.getUnitValue();
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
                        <td value='${get_order.value}' >${get_order.value}</td>
                        <td>${get_shipper.value}</td>
                        <td>${get_fob.value}</td>
                        <td>${get_freight.value}</td>
                        <td>${get_insurance.value}</td>
                        <td>${get_netkg.value}</td>
                        <td>${newOrder.getUnitValue().toFixed(2)}</td>
                        <td><button id="delete" class='btn btn-danger btn-sm'>Eliminar</button></td>
                        <td><button id="importar" value='${get_order.value}' class='btn btn-success btn-sm'>Calcular</button></td>
                        </tr>
    `
    //Guardo nueva orden en localStora con número de orden como ID para usarla al momento de querer hacer el calculo. 
    const dataOrders = localStorage.setItem(`${get_order.value}`, JSON.stringify(newOrder));

    //Función para operar con la orden generada
    //deleRow para eliminar una orden creada
    //calculrImpo para realizar el calculo de importación con los datos guardados en localStorage de la orden. 
    //Uso de la función funcionParaAduana para hacer los calculos e imprimir resultado en el DOM. 
    //Uso de deconstructor para objetos
    getTable.addEventListener('click', (e) => {

      let btn = e.target
      const deleteRow = (e) => {
        btn.closest('tr').remove()

      }

      const calcularImpo = (e) => {
        // this code return the id value but the all row

        let imporId = btn.closest('button').value;

        {/**No usar por el momento*/ }
        const getOrder = localStorage.getItem(`${imporId}`);
        let retriveOrder = JSON.parse(getOrder);

        //Uso de deconstructor
        let { orderNumber, shipper, cost, freight, insurance, netKg, unitValue } = retriveOrder

        let itsRight = imporId === orderNumber;
        if (itsRight) {

          let costOrder = Number(cost);
          let insuranceOrder = Number(insurance);
          let freightOrder = Number(freight);

          valorIncoterm(costOrder, insuranceOrder, freightOrder)
        }

      }

      let idBtn = btn.closest('button').id;
      (idBtn === 'delete' ? deleteRow() : calcularImpo())

    })

  }

}

create_order.onclick = createNewOrder;


