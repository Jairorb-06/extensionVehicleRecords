window.addEventListener("message", function (event) {
  if (event.data.platesData) {
    const platesData = event.data.platesData;
    document
      .getElementById("startAutomation")
      .addEventListener("click", function () {
        console.log("Botón 'Iniciar Automatización' clickeado.");
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            console.log("Extensión button clicked.");

            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              function: (platesData) => {
                console.log("Detectando campo de entrada...");
                const placas = platesData;
                const input = document.getElementById(
                  "ConsultarAutomotorForm:automotorPlacaNumplaca"
                );
                if (input) {
                  console.log("Campo de entrada encontrado.");
                  // console.log("placas en popup.js", platesData);
                  let currentIndex = 0;

                  function insertPlacaAndTab() {
                    if (currentIndex < placas.length) {
                      console.log("Insertando placa: " + placas[currentIndex]);
                      input.value = placas[currentIndex];
                      currentIndex++;

                      // Simula el evento "input" en el campo de entrada
                      const inputEvent = new Event("input", {
                        bubbles: true,
                        cancelable: true,
                      });
                      input.dispatchEvent(inputEvent);

                      // Presiona la tecla "Tab" automáticamente
                      input.focus();
                      const tabKeyCode = 9; // Código de tecla para "Tab"
                      const tabEvent = new KeyboardEvent("keydown", {
                        key: "Tab",
                        keyCode: tabKeyCode,
                        which: tabKeyCode,
                        bubbles: true,
                        cancelable: true,
                      });
                      input.dispatchEvent(tabEvent);

                      // Espera 2 segundos para que se complete la entrada y luego presiona el botón "Buscar"
                      setTimeout(() => {
                        const buscarButton = document.getElementById(
                          "ConsultarAutomotorForm:btnconsultarAutomotor"
                        );
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
              },
              args: [platesData], // Pasa platesData como argumento
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
          }
        );
      });

    

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status === "complete") {
        console.log("Página recargada. Guardando contenido de las tablas...");

        setTimeout(function () {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: function () {
              var tablaDatosBasicos = document.getElementById(
                "ConsultarAutomotorForm:pGridContentInputColumns1"
              );
              var datosBasicos = {};
              if (tablaDatosBasicos) {
                // Obtén todas las filas de la tabla
                var filas =
                  tablaDatosBasicos.querySelectorAll("tr.row, tr.row_odd");
                // Itera sobre las filas
                for (var i = 0; i < filas.length; i++) {
                  // Obtén todas las celdas de la fila actual
                  var celdas = filas[i].querySelectorAll("td");
                  // Itera sobre las celdas
                  for (var j = 0; j < celdas.length; j++) {
                    // Verifica si el contenido de la celda parece una etiqueta
                    var contenido = celdas[j].textContent.trim();
                    var esEtiqueta = contenido.endsWith(":");
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
              console.log("Datos Básicos:", datosBasicos);

              var tablaInfoVehiculo = document.getElementById("ConsultarAutomotorForm:pGridContentInputColumns2");
              var infoVehiculo = {};

              if (tablaInfoVehiculo) {
                // Obtén todas las filas de la tabla
                var filasInfoVehiculo =
                  tablaInfoVehiculo.querySelectorAll("tr.row, tr.row_odd");

                // Itera sobre las filas
                for (var i = 0; i < filasInfoVehiculo.length; i++) {
                  // Obtén todas las celdas de la fila actual
                  var celdasInfoVehiculo =
                    filasInfoVehiculo[i].querySelectorAll("td");

                  // Itera sobre las celdas
                  for (var j = 0; j < celdasInfoVehiculo.length; j++) {
                    // Verifica si el contenido de la celda parece una etiqueta
                    var contenidoInfoVehiculo =
                      celdasInfoVehiculo[j].textContent.trim();
                    var esEtiquetaInfoVehiculo =
                      contenidoInfoVehiculo.endsWith(":");

                    // Si es una etiqueta, toma el siguiente valor como valor asociado
                    if (
                      esEtiquetaInfoVehiculo &&
                      j + 1 < celdasInfoVehiculo.length
                    ) {
                      var etiquetaInfoVehiculo = contenidoInfoVehiculo
                        .slice(0, -1)
                        .trim();
                      var valorInfoVehiculo =
                        celdasInfoVehiculo[j + 1].textContent.trim();

                      // Almacena en el objeto infoVehiculo
                      infoVehiculo[etiquetaInfoVehiculo] = valorInfoVehiculo;
                    }
                  }
                }
              }
              console.log("Info Vehículo:", infoVehiculo);

              var tablaSoat = document.getElementById('ConsultarAutomotorForm:pagedTableSoat');
              var datosSoat = [];

              if (tablaSoat) {
                var filasSoat = tablaSoat.querySelectorAll('tr.row, tr.row_odd');

                // Obtén los nombres de las columnas
                var encabezadoSoat = tablaSoat.querySelector('thead');
                var nombresColumnas = [];
                if (encabezadoSoat) {
                  var celdasEncabezadoSoat = encabezadoSoat.querySelectorAll('th');
                  nombresColumnas = Array.from(celdasEncabezadoSoat).map(celda => celda.textContent.trim());
                }

                // Itera sobre las filas
                for (var i = 0; i < filasSoat.length; i++) {
                  // Obtén todas las celdas de la fila actual
                  var celdasSoat = filasSoat[i].querySelectorAll('td');

                  // Inicializa un objeto para almacenar los datos de la fila
                  var filaDatosSoat = {};

                  // Itera sobre las celdas
                  for (var j = 0; j < celdasSoat.length; j++) {
                    // Obtiene el contenido de la celda
                    var contenidoSoat = celdasSoat[j].textContent.trim();

                    // Asigna el contenido al objeto con el nombre de la columna correspondiente
                    filaDatosSoat[nombresColumnas[j]] = contenidoSoat;
                  }

                  // Agrega el objeto de la fila al array principal
                  datosSoat.push(filaDatosSoat);
                }

              }
              console.log('Datos SOAT:', datosSoat);


          var tablaRevisionTM = document.getElementById('ConsultarAutomotorForm:pagedTableRevisionTM');
          var datosRevisionTM = [];

          if (tablaRevisionTM) {
            // Obtén todas las filas de la tabla
            var filasRevisionTM = tablaRevisionTM.querySelectorAll('tr.row, tr.row_odd');

            // Obtén los nombres de las columnas
            var encabezadoRevisionTM = tablaRevisionTM.querySelector('thead');
            var nombresColumnasRevisionTM = [];
            if (encabezadoRevisionTM) {
              var celdasEncabezadoRevisionTM = encabezadoRevisionTM.querySelectorAll('th');
              nombresColumnasRevisionTM = Array.from(celdasEncabezadoRevisionTM).map(celda => celda.textContent.trim());
            }

            // Itera sobre las filas
            for (var i = 0; i < filasRevisionTM.length; i++) {
              // Obtén todas las celdas de la fila actual
              var celdasRevisionTM = filasRevisionTM[i].querySelectorAll('td');

              // Inicializa un objeto para almacenar los datos de la fila
              var filaDatosRevisionTM = {};

              // Itera sobre las celdas
              for (var j = 0; j < celdasRevisionTM.length; j++) {
                // Obtiene el contenido de la celda
                var contenidoRevisionTM = celdasRevisionTM[j].textContent.trim();

                // Asigna el contenido al objeto con el nombre de la columna correspondiente
                filaDatosRevisionTM[nombresColumnasRevisionTM[j]] = contenidoRevisionTM;
              }

              // Agrega el objeto de la fila al array principal
              datosRevisionTM.push(filaDatosRevisionTM);
            }

          }
          console.log('Datos Revisión Técnico-Mecánica:', datosRevisionTM);


          var tablaCertificaciones = document.getElementById('ConsultarAutomotorForm:pagedTableRevisionTMCert');
var datosCertificaciones = [];

if (tablaCertificaciones) {
  // Obtén todas las filas de la tabla
  var filasCertificaciones = tablaCertificaciones.querySelectorAll('tr.row, tr.row_odd');

  // Obtén los nombres de las columnas
  var encabezadoCertificaciones = tablaCertificaciones.querySelector('thead');
  var nombresColumnasCertificaciones = [];
  if (encabezadoCertificaciones) {
    var celdasEncabezadoCertificaciones = encabezadoCertificaciones.querySelectorAll('th');
    nombresColumnasCertificaciones = Array.from(celdasEncabezadoCertificaciones).map(celda => celda.textContent.trim());
  }

  // Itera sobre las filas
  for (var i = 0; i < filasCertificaciones.length; i++) {
    // Obtén todas las celdas de la fila actual
    var celdasCertificaciones = filasCertificaciones[i].querySelectorAll('td');

    // Inicializa un objeto para almacenar los datos de la fila
    var filaDatosCertificaciones = {};

    // Itera sobre las celdas
    for (var j = 0; j < celdasCertificaciones.length; j++) {
      // Obtiene el contenido de la celda
      var contenidoCertificaciones = celdasCertificaciones[j].textContent.trim();

      // Asigna el contenido al objeto con el nombre de la columna correspondiente
      filaDatosCertificaciones[nombresColumnasCertificaciones[j]] = contenidoCertificaciones;
    }

    // Agrega el objeto de la fila al array principal
    datosCertificaciones.push(filaDatosCertificaciones);
  }

}
console.log('Datos Certificaciones:', datosCertificaciones);

var tablaGravamenes = document.getElementById('ConsultarAutomotorForm:pagedTableGravamen');
var datosGravamenes = [];

if (tablaGravamenes) {
  // Obtén todas las filas de la tabla
  var filasGravamenes = tablaGravamenes.querySelectorAll('tr.row, tr.row_odd');

  // Obtén los nombres de las columnas
  var encabezadoGravamenes = tablaGravamenes.querySelector('thead');
  var nombresColumnasGravamenes = [];
  if (encabezadoGravamenes) {
    var celdasEncabezadoGravamenes = encabezadoGravamenes.querySelectorAll('th');
    nombresColumnasGravamenes = Array.from(celdasEncabezadoGravamenes).map(celda => celda.textContent.trim());
  }

  // Itera sobre las filas
  for (var i = 0; i < filasGravamenes.length; i++) {
    // Obtén todas las celdas de la fila actual
    var celdasGravamenes = filasGravamenes[i].querySelectorAll('td');

    // Inicializa un objeto para almacenar los datos de la fila
    var filaDatosGravamenes = {};

    // Itera sobre las celdas
    for (var j = 0; j < celdasGravamenes.length; j++) {
      // Obtiene el contenido de la celda
      var contenidoGravamenes = celdasGravamenes[j].textContent.trim();

      // Asigna el contenido al objeto con el nombre de la columna correspondiente
      filaDatosGravamenes[nombresColumnasGravamenes[j]] = contenidoGravamenes;
    }

    // Agrega el objeto de la fila al array principal
    datosGravamenes.push(filaDatosGravamenes);
  }

}
console.log('Datos Gravámenes:', datosGravamenes);

var tablaLimitaciones = document.getElementById('ConsultarAutomotorForm:pagedTableMedidadPreventiva');
var datosLimitaciones = [];

if (tablaLimitaciones) {
  // Obtén todas las filas de la tabla
  var filasLimitaciones = tablaLimitaciones.querySelectorAll('tr.row, tr.row_odd');

  // Obtén los nombres de las columnas
  var encabezadoLimitaciones = tablaLimitaciones.querySelector('thead');
  var nombresColumnasLimitaciones = [];
  if (encabezadoLimitaciones) {
    var celdasEncabezadoLimitaciones = encabezadoLimitaciones.querySelectorAll('th');
    nombresColumnasLimitaciones = Array.from(celdasEncabezadoLimitaciones).map(celda => celda.textContent.trim());
  }

  // Itera sobre las filas
  for (var i = 0; i < filasLimitaciones.length; i++) {
    // Obtén todas las celdas de la fila actual
    var celdasLimitaciones = filasLimitaciones[i].querySelectorAll('td');

    // Inicializa un objeto para almacenar los datos de la fila
    var filaDatosLimitaciones = {};

    // Itera sobre las celdas
    for (var j = 0; j < celdasLimitaciones.length; j++) {
      // Obtiene el contenido de la celda
      var contenidoLimitaciones = celdasLimitaciones[j].textContent.trim();

      // Asigna el contenido al objeto con el nombre de la columna correspondiente
      filaDatosLimitaciones[nombresColumnasLimitaciones[j]] = contenidoLimitaciones;
    }

    // Agrega el objeto de la fila al array principal
    datosLimitaciones.push(filaDatosLimitaciones);
  }

}

console.log('Datos Limitaciones:', datosLimitaciones);




              var tablaPropietario = document.getElementById('ConsultarAutomotorForm:pagedTablePropietario');
              var datosPropietario = [];

              if (tablaPropietario) {
                // Obtén todas las filas de la tabla
                var filasPropietario = tablaPropietario.querySelectorAll('tr.row, tr.row_odd');

                // Obtén los nombres de las columnas
                var encabezadoPropietario = tablaPropietario.querySelector('thead');
                var nombresColumnasPropietario = [];
                if (encabezadoPropietario) {
                  var celdasEncabezadoPropietario = encabezadoPropietario.querySelectorAll('th');
                  nombresColumnasPropietario = Array.from(celdasEncabezadoPropietario).map(celda => celda.textContent.trim());
                }

                // Itera sobre las filas
                for (var i = 0; i < filasPropietario.length; i++) {
                  // Obtén todas las celdas de la fila actual
                  var celdasPropietario = filasPropietario[i].querySelectorAll('td');

                  // Inicializa un objeto para almacenar los datos de la fila
                  var filaDatosPropietario = {};

                  // Itera sobre las celdas
                  for (var j = 0; j < celdasPropietario.length; j++) {
                    // Obtiene el contenido de la celda
                    var contenidoPropietario = celdasPropietario[j].textContent.trim();

                    // Asigna el contenido al objeto con el nombre de la columna correspondiente
                    filaDatosPropietario[nombresColumnasPropietario[j]] = contenidoPropietario;
                  }

                  // Agrega el objeto de la fila al array principal
                  datosPropietario.push(filaDatosPropietario);
                }

              }
              console.log('Datos Propietario:', datosPropietario);



              // Enviar los datos de vuelta al contexto del evento
              chrome.runtime.sendMessage({
                datosBasicos: datosBasicos,
                infoVehiculo: infoVehiculo,
                datosSoat: datosSoat,
                datosRevisionTM: datosRevisionTM,
                datosCertificaciones: datosCertificaciones,
                datosGravamenes: datosGravamenes,
                datosLimitaciones: datosLimitaciones,
                datosPropietario: datosPropietario,
              });
            },
          });

          chrome.runtime.onMessage.addListener(function (message) {
            console.log("Datos básicos:", message.datosBasicos);
            console.log("Información del vehículo:", message.infoVehiculo);
            console.log("soartt", message.datosSoat)
            const platesData = {
              datosBasicos: message.datosBasicos,
              infoVehiculo: message.infoVehiculo,
              datosSoat: message.datosSoat,
              datosRevisionTM: message.datosRevisionTM,
              datosCertificaciones: message.datosCertificaciones,
              datosGravamenes: message.datosGravamenes,
              datosLimitaciones: message.datosLimitaciones,
              datosPropietario: message.datosPropietario,
            };
            window.frames[0].postMessage(JSON.stringify(platesData), "*");
          });
        }, 1500);
      }
    });

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status === "complete") {
        console.log(
          "Página recargada. Esperando antes de buscar el botón 'Generar Historial'..."
        );
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
              const generarHistorialButton = document.getElementById(
                "ConsultarAutomotorForm:btnAction2"
              );
              if (generarHistorialButton) {
                generarHistorialButton.click();
                console.log("Botón 'Generar Historial' presionado.");
              }
            },
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
