/* window.addEventListener("message", function(event) {
  if (event.data.platesData) {
    const platesData = event.data.platesData;
    // Haz algo con el arreglo en popup.js
    console.log("placas en popup.js",platesData); 
  }
}); 
 */



window.addEventListener("message", function (event) {
  if (event.data.platesData) {
    const platesData = event.data.platesData;
    document.getElementById('startAutomation').addEventListener('click', function () {
      console.log("Botón 'Iniciar Automatización' clickeado.");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("Extensión button clicked.");


        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: (platesData) => {
            console.log("Detectando campo de entrada...");

            // Usa las placas recibidas desde sandbox.js en lugar de la matriz hardcodeada
            const placas = platesData;
            //  aqui debo recibir las placas de sandbox  
            const input = document.getElementById('ConsultarAutomotorForm:automotorPlacaNumplaca');
            if (input) {
              console.log("Campo de entrada encontrado.");
              console.log("placas en popup.js", platesData);

              const placs = [
                "RZV652",
                "WIB13D",
                "185NCL",
                "IHA03F",
                "WIE09D",
                "WIE25D",
                "BSU727",
                "NEB725",
                "WIE11D",
                "SKG115"
              ];

              /*  setTimeout(function () {
                 window.frames[0].postMessage({ placs: placas }, "*");
                 console.log("placas", placas);
               }, 2000);
               let currentIndex = 0; */

              let currentIndex = 0;

              function insertPlacaAndTab() {
                if (currentIndex < placas.length) {

                  console.log("Insertando placa: " + placas[currentIndex]);
                  input.value = placas[currentIndex];
                  currentIndex++;

                  // Simula el evento "input" en el campo de entrada
                  const inputEvent = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                  });
                  input.dispatchEvent(inputEvent);

                  // Presiona la tecla "Tab" automáticamente
                  input.focus();
                  const tabKeyCode = 9; // Código de tecla para "Tab"
                  const tabEvent = new KeyboardEvent('keydown', {
                    key: 'Tab',
                    keyCode: tabKeyCode,
                    which: tabKeyCode,
                    bubbles: true,
                    cancelable: true,
                  });
                  input.dispatchEvent(tabEvent);

                  // Espera 2 segundos para que se complete la entrada y luego presiona el botón "Buscar"
                  setTimeout(() => {
                    const buscarButton = document.getElementById('ConsultarAutomotorForm:btnconsultarAutomotor');
                    buscarButton.click(); // Presiona el botón "Buscar"
                    console.log("Button clicked");
                  }, 2000);
                } else {
                  console.log("Automatización completada!");
                }
              }

              insertPlacaAndTab();
            } else {
              console.log("Campo de entrada no encontrado.");
            }

            // Resto del código de automatización...
            // ...
          }, args: [platesData] // Pasa platesData como argumento
        });


        /* const placs = [
          "RZV652",
          "WIB13D",
          "185NCL",
          "IHA03F",
          "WIE09D",
          "WIE25D",
          "BSU727",
          "NEB725",
          "WIE11D",
          "SKG115"
        ];
       
        setTimeout(function () {
          window.frames[0].postMessage({ placs: placs }, "*");
          console.log("placas", placs);
        }, 200);
        let currentIndex = 0; */
      });
    });


    /*
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status === "complete") {
        console.log("Página recargada. Guardando contenido de las tablas...");
    
        setTimeout(function () {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: function () {
              var tablaDatosBasicos = document.getElementById('ConsultarAutomotorForm:pGridContentInputColumns1');
              //console.log(tablaDatosBasicos)
              var datosBasicos = {};
              if (tablaDatosBasicos) {
                var filas = tablaDatosBasicos.getElementsByTagName('tr');
                for (var i = 0; i < filas.length; i++) {
                  var celdas = filas[i].getElementsByTagName('td');
                  if (celdas.length === 4) {
                    var etiqueta = celdas[0].textContent.trim();
                    var valor = celdas[1].textContent.trim();
                    datosBasicos[etiqueta] = valor;
                  }
                }
              }
              console.log('Datos Básicos:', datosBasicos);
    
              var tablaInfoVehiculo = document.getElementById('ConsultarAutomotorForm:pGridContentInputColumns2');
              //console.log(tablaInfoVehiculo)
              var infoVehiculo = {};
              if (tablaInfoVehiculo) {
                var filasInfoVehiculo = tablaInfoVehiculo.getElementsByTagName('tr');
                for (var j = 0; j < filasInfoVehiculo.length; j++) {
                  var celdasInfoVehiculo = filasInfoVehiculo[j].getElementsByTagName('td');
                  if (celdasInfoVehiculo.length === 4) {
                    var etiquetaInfoVehiculo = celdasInfoVehiculo[0].textContent.trim();
                    var valorInfoVehiculo = celdasInfoVehiculo[1].textContent.trim();
                    infoVehiculo[etiquetaInfoVehiculo] = valorInfoVehiculo;
                  }
                }
              }
              console.log('Información del Vehículo:', infoVehiculo);
            }
          });
        }, 4000);
      }
    });
    */
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status === "complete") {
        console.log("Página recargada. Guardando contenido de las tablas...");

        setTimeout(function () {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: function () {
              var tablaDatosBasicos = document.getElementById('ConsultarAutomotorForm:pGridContentInputColumns1');
              var datosBasicos = {};
              if (tablaDatosBasicos) {
                // Obtén todas las filas de la tabla
                var filas = tablaDatosBasicos.querySelectorAll('tr.row, tr.row_odd');
                // Itera sobre las filas
                for (var i = 0; i < filas.length; i++) {
                  // Obtén todas las celdas de la fila actual
                  var celdas = filas[i].querySelectorAll('td');
                  // Itera sobre las celdas
                  for (var j = 0; j < celdas.length; j++) {
                    // Verifica si el contenido de la celda parece una etiqueta
                    var contenido = celdas[j].textContent.trim();
                    var esEtiqueta = contenido.endsWith(':');
                    // Si es una etiqueta, toma el siguiente valor como valor asociado
                    if (esEtiqueta && j + 1 < celdas.length) {
                      var etiqueta = contenido.slice(0, -1).trim();
                      var valor = celdas[j + 1].textContent.trim();
                      // Almacena en el objeto datosBasicos
                      datosBasicos[etiqueta] = valor;
                    }
                  }
                }

              }
              console.log('Datos Básicos:', datosBasicos);


              var tablaInfoVehiculo = document.getElementById('ConsultarAutomotorForm:pGridContentInputColumns2');
              var infoVehiculo = {};

              if (tablaInfoVehiculo) {
                // Obtén todas las filas de la tabla
                var filasInfoVehiculo = tablaInfoVehiculo.querySelectorAll('tr.row, tr.row_odd');

                // Itera sobre las filas
                for (var i = 0; i < filasInfoVehiculo.length; i++) {
                  // Obtén todas las celdas de la fila actual
                  var celdasInfoVehiculo = filasInfoVehiculo[i].querySelectorAll('td');

                  // Itera sobre las celdas
                  for (var j = 0; j < celdasInfoVehiculo.length; j++) {
                    // Verifica si el contenido de la celda parece una etiqueta
                    var contenidoInfoVehiculo = celdasInfoVehiculo[j].textContent.trim();
                    var esEtiquetaInfoVehiculo = contenidoInfoVehiculo.endsWith(':');

                    // Si es una etiqueta, toma el siguiente valor como valor asociado
                    if (esEtiquetaInfoVehiculo && j + 1 < celdasInfoVehiculo.length) {
                      var etiquetaInfoVehiculo = contenidoInfoVehiculo.slice(0, -1).trim();
                      var valorInfoVehiculo = celdasInfoVehiculo[j + 1].textContent.trim();

                      // Almacena en el objeto infoVehiculo
                      infoVehiculo[etiquetaInfoVehiculo] = valorInfoVehiculo;
                    }
                  }
                }

                console.log('Info Vehículo:', infoVehiculo);
              }

              var tablaSoat = document.getElementById('ConsultarAutomotorForm:pagedTableSoat');
              var datosSoat = [];

              if (tablaSoat) {
                // Obtén todas las filas de la tabla
                var filasSoat = tablaSoat.querySelectorAll('tr.row, tr.row_odd');

                // Obtén los nombres de las columnas
                var nombresColumnas = [];
                var encabezadoSoat = tablaSoat.querySelector('thead');
                if (encabezadoSoat) {
                  var celdasEncabezadoSoat = encabezadoSoat.querySelectorAll('th');
                  celdasEncabezadoSoat.forEach(function (celda) {
                    nombresColumnas.push(celda.textContent.trim());
                  });
                }

                // Itera sobre las filas
                for (var i = 0; i < filasSoat.length; i++) {
                  // Obtén todas las celdas de la fila actual
                  var celdasSoat = filasSoat[i].querySelectorAll('td');

                  // Inicializa un objeto para almacenar los datos de esta fila
                  var filaSoat = {};

                  // Itera sobre las celdas
                  for (var j = 0; j < celdasSoat.length; j++) {
                    // Obtiene el contenido de la celda
                    var contenidoSoat = celdasSoat[j].textContent.trim();

                    // Usa el nombre de la columna como clave
                    filaSoat[nombresColumnas[j]] = contenidoSoat;
                  }

                  // Almacena la fila en el array de datosSoat
                  datosSoat.push(filaSoat);
                }

              }
              console.log('Datos SOAT:', datosSoat);


              // Enviar los datos de vuelta al contexto del evento
              chrome.runtime.sendMessage({ datosBasicos: datosBasicos, infoVehiculo: infoVehiculo, datosSoat: datosSoat });
            }
          });

          chrome.runtime.onMessage.addListener(function (message) {
            console.log("Datos básicos:", message.datosBasicos);
            console.log("Información del vehículo:", message.infoVehiculo);
            console.log("soartt", datosSoat)
            const platesData = {
              datosBasicos: message.datosBasicos,
              infoVehiculo: message.infoVehiculo,
              datosSoat: datosSoat,
            };
            window.frames[0].postMessage(JSON.stringify(platesData), "*");
          });

        }, 5000);
      }
    });


    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status === "complete") {
        console.log("Página recargada. Esperando antes de buscar el botón 'Generar Historial'...");
        setTimeout(function () {
          // console.log("Espera completada. Guardando contenido de la consulta en localStorage...");
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
              /*const fechaLicenciaContent = document.getElementById('ConsultarAutomotorForm:fechaLicencia2').textContent;
              if (fechaLicenciaContent) {           
                localStorage.setItem('fechaLicenciaContent', fechaLicenciaContent);
                console.log("Contenido de la fecha de licencia guardado en localStorage.");
              } else {
                console.log("No se encontró la etiqueta con id 'ConsultarAutomotorForm:fechaLicencia2'.");
              }*/
              const generarHistorialButton = document.getElementById('ConsultarAutomotorForm:btnAction2');
              if (generarHistorialButton) {
                //generarHistorialButton.click(); 
                console.log("Botón 'Generar Historial' presionado.");
              }
            }

          });
        }, 3000);
      }
    });

    /*
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status === "complete") {
        console.log("Página recargada después de presionar 'Consultar Automotor'. Esperando antes de buscar el botón 'Consultar Automotor'...");
        setTimeout(function () {
          console.log("Espera completada. Buscando botón 'Consultar Automotor'...");
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
              // Presionar el botón "Consultar Automotor" en el menú lateral
              const consultarAutomotorButton = document.querySelector('table[id="apy_t0i26"]');
              if (consultarAutomotorButton) {
                consultarAutomotorButton.click();
                console.log("Botón 'Consultar Automotor' presionado.");
              }
            }
          });
        }, 6000); 
      }
    });*/

  }
});
//este aqui ya no iria
/*const placs = [
  "RZV652",
  "WIB13D",
  "185NCL",
  "IHA03F",
  "WIE09D",
  "WIE25D",
  "BSU727",
  "NEB725",
  "WIE11D",
  "SKG115"
];*/
// const iframe = document.getElementById('iframe');
// chrome.runtime.sendMessage({ data: placs });
// iframe.contentWindow.postMessage({ placsData: placs }, "*");
// window.parent.postMessage({ placs: placs }, "*");

/* //para enviar objeto
const placsData = {
  placs: placs
};
window.frames[0].postMessage(JSON.stringify(placsData), "*");
*/

/*setTimeout(function () {
  window.frames[0].postMessage({ placs: placs }, "*");
  // window.frames[0].postMessage(JSON.stringify(placsData), "*");
  console.log("placs", placs);
}, 2000);*/

/*
document.getElementById('startAutomation').addEventListener('click', function () {
  console.log("Botón 'Iniciar Automatización' clickeado.");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("Extensión button clicked.");
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        console.log("Detectando campo de entrada...");

      //  aqui debo recibir las placas de sandbox
        const input = document.getElementById('ConsultarAutomotorForm:automotorPlacaNumplaca');
        if (input) {
          console.log("Campo de entrada encontrado.");


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "enviarListadoPlacas") {
    const placas = message.placas;
    console.log("Listado de placas recibido en popup.js:", placas);
  }
});

          const placas = [
            "RZV652",
            "WIB13D",
            "185NCL",
            "IHA03F",
            "WIE09D",
            "WIE25D",
            "BSU727",
            "NEB725",
            "WIE11D",
            "SKG115"
          ];
          console.log("plaquitas", placas)
          // const plates = await obtenerNumerosDePlaca();
          let currentIndex = 0;

          function insertPlacaAndTab() {
            if (currentIndex < placas.length) {
              console.log("Insertando placa: " + placas[currentIndex]);
              input.value = placas[currentIndex];
              currentIndex++;

              // Simula el evento "input" en el campo de entrada
              const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true,
              });
              input.dispatchEvent(inputEvent);

              // Presiona la tecla "Tab" automáticamente
              input.focus();
              const tabKeyCode = 9; // Código de tecla para "Tab"
              const tabEvent = new KeyboardEvent('keydown', {
                key: 'Tab',
                keyCode: tabKeyCode,
                which: tabKeyCode,
                bubbles: true,
                cancelable: true,
              });
              input.dispatchEvent(tabEvent);

              // Espera 2 segundos para que se complete la entrada y luego presiona el botón "Buscar"
              setTimeout(() => {
                const buscarButton = document.getElementById('ConsultarAutomotorForm:btnconsultarAutomotor');
                buscarButton.click(); // Presiona el botón "Buscar"
                console.log("Button clicked");
              }, 2000);
            } else {
              console.log("Automatización completada!");
            }
          }

          insertPlacaAndTab();
        } else {
          console.log("Campo de entrada no encontrado.");
        }
      }
    });
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    console.log("Página recargada. Esperando antes de buscar el botón 'Generar Historial'...");
    setTimeout(function () {
      console.log("Espera completada. Guardando contenido de la consulta en localStorage...");
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          const fechaLicenciaContent = document.getElementById('ConsultarAutomotorForm:fechaLicencia2').textContent;
          if (fechaLicenciaContent) {
            localStorage.setItem('fechaLicenciaContent', fechaLicenciaContent);
            console.log("Contenido de la fecha de licencia guardado en localStorage.");
          } else {
            console.log("No se encontró la etiqueta con id 'ConsultarAutomotorForm:fechaLicencia2'.");
          }
          const generarHistorialButton = document.getElementById('ConsultarAutomotorForm:btnAction2');
          if (generarHistorialButton) {
            generarHistorialButton.click();
            console.log("Botón 'Generar Historial' presionado.");
          }
        }
      });
    }, 3000);
  }
});


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    console.log("Página recargada después de presionar 'Consultar Automotor'. Esperando antes de buscar el botón 'Consultar Automotor'...");
    setTimeout(function () {
      console.log("Espera completada. Buscando botón 'Consultar Automotor'...");
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          // Presionar el botón "Consultar Automotor" en el menú lateral
          const consultarAutomotorButton = document.querySelector('table[id="apy_t0i26"]');
          if (consultarAutomotorButton) {
            consultarAutomotorButton.click();
            console.log("Botón 'Consultar Automotor' presionado.");
          }
        }
      });
    }, 6000);
  }
});
 */

/* chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    console.log("Página recargada después de presionar 'Consultar Automotor'. Esperando 7 segundos antes de navegar a la nueva URL...");
    setTimeout(function () {
      console.log("Espera completada. URL...");
      chrome.tabs.update(tabId, { url: "https://hq.runt.com.co/runt/rna/vehiculos/consultar_automotor_filtro_consulta.jsf" });
    }, 6000);
  }
});
 */
/* chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    console.log("Página recargada después de navegar a la nueva URL. Esperando 7 segundos antes de ingresar la siguiente placa en el input...");
    setTimeout(function () {
      console.log("Espera completada. Ingresando la siguiente placa en el input...");

      // Llamar a la función insertPlacaAndTab para ingresar la siguiente placa y continuar con la consulta
      insertPlacaAndTab();

    }, 9000);
  }
}); */

// Detecta la recarga de la página
/*
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    console.log("Página recargada. Buscando botón 'Generar Historial'...");
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const generarHistorialButton = document.getElementById('ConsultarAutomotorForm:btnAction2');
       // if (generarHistorialButton) {
         // generarHistorialButton.click(); // Presiona el botón "Generar Historial"
         console.log("generarHistorialButton", generarHistorialButton)
          console.log("Botón 'Generar Historial' presionado.");
        //}
      }
    });
  }
});
*/