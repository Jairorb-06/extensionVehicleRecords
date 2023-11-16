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

              var tablaSoat = document.getElementById(
                "ConsultarAutomotorForm:pagedTableSoat"
              );
              var datosSoat = {};
              if (tablaSoat) {
                var filasSoat = tablaSoat.querySelectorAll("tr.row, tr.row_odd");
                var nombresColumnas = [];
                var encabezadoSoat = tablaSoat.querySelector("thead");
                if (encabezadoSoat) {
                  var celdasEncabezadoSoat =
                    encabezadoSoat.querySelectorAll("th");
                  celdasEncabezadoSoat.forEach(function (celda) {
                    nombresColumnas.push(celda.textContent.trim());
                    datosSoat[celda.textContent.trim()] = [];
                  });
                }
                for (var i = 0; i < filasSoat.length; i++) {
                  var celdasSoat = filasSoat[i].querySelectorAll("td");
                  for (var j = 0; j < celdasSoat.length; j++) {
                    var contenidoSoat = celdasSoat[j].textContent.trim();
                    datosSoat[nombresColumnas[j]].push(contenidoSoat);
                  }
                }
              }
              console.log("Datos SOAT:", datosSoat);

              var tablaRevisionTM = document.getElementById('ConsultarAutomotorForm:panelResultRevisionTM');
              var datosRevisionTM = {};
              if (tablaRevisionTM) {
                var filasRevisionTM = tablaRevisionTM.querySelectorAll('tr.row, tr.row_odd');
                for (var i = 0; i < filasRevisionTM.length; i++) {
                  var celdasRevisionTM = filasRevisionTM[i].querySelectorAll('td');
                  for (var j = 0; j < celdasRevisionTM.length; j++) {
                    var contenidoRevisionTM = celdasRevisionTM[j].textContent.trim();
                    var esEtiquetaRevisionTM = contenidoRevisionTM.endsWith(':');
                    if (esEtiquetaRevisionTM && j + 1 < celdasRevisionTM.length) {
                      var etiquetaRevisionTM = contenidoRevisionTM.slice(0, -1).trim();
                      var valorRevisionTM = celdasRevisionTM[j + 1].textContent.trim();
                      datosRevisionTM[etiquetaRevisionTM] = valorRevisionTM;
                    }
                  }
                }
                console.log('Datos Revisión Técnico-Mecánica:', datosRevisionTM);
              } else {
                console.log('No se encontró la tabla de Revisión Técnico-Mecánica');
              }

              var tablaPropietario = document.getElementById('ConsultarAutomotorForm:pagedTablePropietario');
              var datosPropietario = {};
              if (tablaPropietario) {
                var filasPropietario = tablaPropietario.querySelectorAll('tr.row, tr.row_odd');
                var nombresColumnasPropietario = [];
                var encabezadoPropietario = tablaPropietario.querySelector('thead');
                if (encabezadoPropietario) {
                  var celdasEncabezadoPropietario = encabezadoPropietario.querySelectorAll('th');
                  celdasEncabezadoPropietario.forEach(function (celda) {
                    nombresColumnasPropietario.push(celda.textContent.trim());
                    datosPropietario[celda.textContent.trim()] = [];
                  });
                }
                for (var i = 0; i < filasPropietario.length; i++) {
                  var celdasPropietario = filasPropietario[i].querySelectorAll('td');
                  for (var j = 0; j < celdasPropietario.length; j++) {
                    var contenidoPropietario = celdasPropietario[j].textContent.trim();
                    datosPropietario[nombresColumnasPropietario[j]].push(contenidoPropietario);
                  }
                }
              }
              console.log('Datos Propietario:', datosPropietario);


              // Enviar los datos de vuelta al contexto del evento
              chrome.runtime.sendMessage({
                datosBasicos: datosBasicos,
                infoVehiculo: infoVehiculo,
                datosSoat: datosSoat,
                datosPropietario: datosPropietario,
              });
            },
          });

          chrome.runtime.onMessage.addListener(function (message) {
            console.log("Datos básicos:", message.datosBasicos);
            console.log("Información del vehículo:", message.infoVehiculo);
            const platesData = {
              datosBasicos: message.datosBasicos,
              infoVehiculo: message.infoVehiculo,
              datosSoat: message.datosSoat,
              datosPropietario: message.datosPropietario,
            };
            window.frames[0].postMessage(JSON.stringify(platesData), "*");
          });
        }, 3000);
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
                //generarHistorialButton.click();
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
