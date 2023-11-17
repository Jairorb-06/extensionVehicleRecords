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
        //setTimeout(function () {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: function () {
              var tablaDatosBasicos = document.getElementById("ConsultarAutomotorForm:pGridContentInputColumns1");
              var datosBasicos = {};
                if (tablaDatosBasicos) {
                  var filas =
                    tablaDatosBasicos.querySelectorAll("tr.row, tr.row_odd");
                  for (var i = 0; i < filas.length; i++) {
                    var celdas = filas[i].querySelectorAll("td");
                    for (var j = 0; j < celdas.length; j++) {
                      var contenido = celdas[j].textContent.trim();
                      var esEtiqueta = contenido.endsWith(":");
                      if (esEtiqueta && j + 1 < celdas.length) {
                        var etiqueta = contenido.slice(0, -1).trim();
                        var valor = celdas[j + 1].textContent.trim();
                        datosBasicos[etiqueta] = valor;
                      }
                    }
                  }
                }
                console.log("Datos Básicos:", datosBasicos);

                var tablaInfoVehiculo = document.getElementById("ConsultarAutomotorForm:pGridContentInputColumns2");
                var infoVehiculo = {};

                if (tablaInfoVehiculo) {
                  var filasInfoVehiculo =
                    tablaInfoVehiculo.querySelectorAll("tr.row, tr.row_odd");

                  for (var i = 0; i < filasInfoVehiculo.length; i++) {
                    var celdasInfoVehiculo =
                      filasInfoVehiculo[i].querySelectorAll("td");

                    for (var j = 0; j < celdasInfoVehiculo.length; j++) {
                      var contenidoInfoVehiculo =
                        celdasInfoVehiculo[j].textContent.trim();
                      var esEtiquetaInfoVehiculo =
                        contenidoInfoVehiculo.endsWith(":");

                      if (
                        esEtiquetaInfoVehiculo &&
                        j + 1 < celdasInfoVehiculo.length
                      ) {
                        var etiquetaInfoVehiculo = contenidoInfoVehiculo
                          .slice(0, -1)
                          .trim();
                        var valorInfoVehiculo =
                          celdasInfoVehiculo[j + 1].textContent.trim();

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

                  var encabezadoSoat = tablaSoat.querySelector('thead');
                  var nombresColumnas = [];
                  if (encabezadoSoat) {
                    var celdasEncabezadoSoat = encabezadoSoat.querySelectorAll('th');
                    nombresColumnas = Array.from(celdasEncabezadoSoat).map(celda => celda.textContent.trim());
                  }

                  for (var i = 0; i < filasSoat.length; i++) {
                    var celdasSoat = filasSoat[i].querySelectorAll('td');

                    var filaDatosSoat = {};

                    for (var j = 0; j < celdasSoat.length; j++) {
                      var contenidoSoat = celdasSoat[j].textContent.trim();

                      filaDatosSoat[nombresColumnas[j]] = contenidoSoat;
                    }

                    datosSoat.push(filaDatosSoat);
                  }
                }
                console.log('Datos SOAT:', datosSoat);


                var tablaRevisionTM = document.getElementById('ConsultarAutomotorForm:pagedTableRevisionTM');
                var datosRevisionTM = [];

                if (tablaRevisionTM) {
                  var filasRevisionTM = tablaRevisionTM.querySelectorAll('tr.row, tr.row_odd');

                  var encabezadoRevisionTM = tablaRevisionTM.querySelector('thead');
                  var nombresColumnasRevisionTM = [];
                  if (encabezadoRevisionTM) {
                    var celdasEncabezadoRevisionTM = encabezadoRevisionTM.querySelectorAll('th');
                    nombresColumnasRevisionTM = Array.from(celdasEncabezadoRevisionTM).map(celda => celda.textContent.trim());
                  }

                  for (var i = 0; i < filasRevisionTM.length; i++) {

                    var celdasRevisionTM = filasRevisionTM[i].querySelectorAll('td');

                    var filaDatosRevisionTM = {};

                    for (var j = 0; j < celdasRevisionTM.length; j++) {

                      var contenidoRevisionTM = celdasRevisionTM[j].textContent.trim();
                      filaDatosRevisionTM[nombresColumnasRevisionTM[j]] = contenidoRevisionTM;
                    }
                    datosRevisionTM.push(filaDatosRevisionTM);
                  }
                }
                console.log('Datos Revisión Técnico-Mecánica:', datosRevisionTM);

                var tablaCertificaciones = document.getElementById('ConsultarAutomotorForm:pagedTableRevisionTMCert');
                var datosCertificaciones = [];

                if (tablaCertificaciones) {
                  var filasCertificaciones = tablaCertificaciones.querySelectorAll('tr.row, tr.row_odd');

                  var encabezadoCertificaciones = tablaCertificaciones.querySelector('thead');
                  var nombresColumnasCertificaciones = [];
                  if (encabezadoCertificaciones) {
                    var celdasEncabezadoCertificaciones = encabezadoCertificaciones.querySelectorAll('th');
                    nombresColumnasCertificaciones = Array.from(celdasEncabezadoCertificaciones).map(celda => celda.textContent.trim());
                  }

                  for (var i = 0; i < filasCertificaciones.length; i++) {
                    var celdasCertificaciones = filasCertificaciones[i].querySelectorAll('td');
                    var filaDatosCertificaciones = {};
                    for (var j = 0; j < celdasCertificaciones.length; j++) {
                      var contenidoCertificaciones = celdasCertificaciones[j].textContent.trim();
                      filaDatosCertificaciones[nombresColumnasCertificaciones[j]] = contenidoCertificaciones;
                    }
                    datosCertificaciones.push(filaDatosCertificaciones);
                  }

                }
                console.log('Datos Certificaciones:', datosCertificaciones);

                var tablaGravamenes = document.getElementById('ConsultarAutomotorForm:pagedTableGravamen');
                var datosGravamenes = [];

                if (tablaGravamenes) {
                  var filasGravamenes = tablaGravamenes.querySelectorAll('tr.row, tr.row_odd');
                  var encabezadoGravamenes = tablaGravamenes.querySelector('thead');
                  var nombresColumnasGravamenes = [];
                  if (encabezadoGravamenes) {
                    var celdasEncabezadoGravamenes = encabezadoGravamenes.querySelectorAll('th');
                    nombresColumnasGravamenes = Array.from(celdasEncabezadoGravamenes).map(celda => celda.textContent.trim());
                  }
                  for (var i = 0; i < filasGravamenes.length; i++) {
                    var celdasGravamenes = filasGravamenes[i].querySelectorAll('td');
                    var filaDatosGravamenes = {};
                    for (var j = 0; j < celdasGravamenes.length; j++) {
                      var contenidoGravamenes = celdasGravamenes[j].textContent.trim();
                      filaDatosGravamenes[nombresColumnasGravamenes[j]] = contenidoGravamenes;
                    }
                    datosGravamenes.push(filaDatosGravamenes);
                  }

                }
                console.log('Datos Gravámenes:', datosGravamenes);

                var tablaLimitaciones = document.getElementById('ConsultarAutomotorForm:pagedTableMedidadPreventiva');
                var datosLimitaciones = [];

                if (tablaLimitaciones) {
                  var filasLimitaciones = tablaLimitaciones.querySelectorAll('tr.row, tr.row_odd');
                  var encabezadoLimitaciones = tablaLimitaciones.querySelector('thead');
                  var nombresColumnasLimitaciones = [];
                  if (encabezadoLimitaciones) {
                    var celdasEncabezadoLimitaciones = encabezadoLimitaciones.querySelectorAll('th');
                    nombresColumnasLimitaciones = Array.from(celdasEncabezadoLimitaciones).map(celda => celda.textContent.trim());
                  }
                  for (var i = 0; i < filasLimitaciones.length; i++) {
                    var celdasLimitaciones = filasLimitaciones[i].querySelectorAll('td');
                    var filaDatosLimitaciones = {};
                    for (var j = 0; j < celdasLimitaciones.length; j++) {
                      var contenidoLimitaciones = celdasLimitaciones[j].textContent.trim();
                      filaDatosLimitaciones[nombresColumnasLimitaciones[j]] = contenidoLimitaciones;
                    }
                    datosLimitaciones.push(filaDatosLimitaciones);
                  }

                }
                console.log('Datos Limitaciones:', datosLimitaciones);

                var tablaPropietario = document.getElementById('ConsultarAutomotorForm:pagedTablePropietario');
                var datosPropietario = [];

                if (tablaPropietario) {
                  var filasPropietario = tablaPropietario.querySelectorAll('tr.row, tr.row_odd');
                  var encabezadoPropietario = tablaPropietario.querySelector('thead');
                  var nombresColumnasPropietario = [];
                  if (encabezadoPropietario) {
                    var celdasEncabezadoPropietario = encabezadoPropietario.querySelectorAll('th');
                    nombresColumnasPropietario = Array.from(celdasEncabezadoPropietario).map(celda => celda.textContent.trim());
                  }
                  for (var i = 0; i < filasPropietario.length; i++) {
                    var celdasPropietario = filasPropietario[i].querySelectorAll('td');
                    var filaDatosPropietario = {};
                    for (var j = 0; j < celdasPropietario.length; j++) {
                      var contenidoPropietario = celdasPropietario[j].textContent.trim();
                      filaDatosPropietario[nombresColumnasPropietario[j]] = contenidoPropietario;
                    }
                    datosPropietario.push(filaDatosPropietario);
                  }
                }
                console.log('Datos Propietario:', datosPropietario);

                //historial vehículos
                var tablaTramites = document.getElementById('historialVehiculos:tablaTramitesAutomotor');
                var historialTramites = [];
                  if (tablaTramites) {
                    var filasTramites = tablaTramites.querySelectorAll('tr.row, tr.row_odd');
                    var encabezadoTramites = tablaTramites.querySelector('thead');
                    var nombresColumnasTramites = [];
                    if (encabezadoTramites) {
                      var celdasEncabezadoTramites = encabezadoTramites.querySelectorAll('th');
                      nombresColumnasTramites = Array.from(celdasEncabezadoTramites).map(celda => celda.textContent.trim());
                    }
                    for (var i = 0; i < filasTramites.length; i++) {
                      var celdasTramites = filasTramites[i].querySelectorAll('td');
                      var filaDatosTramites = {};
                      for (var j = 0; j < celdasTramites.length; j++) {
                        var contenidoTramites = celdasTramites[j].textContent.trim();
                        filaDatosTramites[nombresColumnasTramites[j]] = contenidoTramites;
                      }
                      historialTramites.push(filaDatosTramites);
                    }
                  }
                  console.log('Datos Trámites:', historialTramites);
                  if (Object.keys(datosBasicos).length > 0 &&
                  Object.keys(infoVehiculo).length > 0 
                  ) {
              
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
                    historialTramites: historialTramites,
                  });
                }else {
                  if(
                    historialTramites.length > 0){
                      chrome.runtime.sendMessage({
                        historialTramites: historialTramites,
                      });
                  }
                }

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
              historialTramites: message.historialTramites,
            };
            window.frames[0].postMessage(JSON.stringify(platesData), "*");
          });
       // }, 500);
      }
    });

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status === "complete") {
        console.log(
          "Página recargada. Esperando antes de buscar el botón 'Generar Historial'..."
        );
        //setTimeout(function () {
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
       // }, 6000);
      }
    });

    
    /*chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status === "complete") {
        console.log("Página recargada. Guardando historial de vehículos");
        setTimeout(function () {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: function () {

              var tablaTramites = document.getElementById('historialVehiculos:tablaTramitesAutomotor');
              var historialTramites = [];
                if (tablaTramites) {
                  var filasTramites = tablaTramites.querySelectorAll('tr.row, tr.row_odd');
                  var encabezadoTramites = tablaTramites.querySelector('thead');
                  var nombresColumnasTramites = [];
                  if (encabezadoTramites) {
                    var celdasEncabezadoTramites = encabezadoTramites.querySelectorAll('th');
                    nombresColumnasTramites = Array.from(celdasEncabezadoTramites).map(celda => celda.textContent.trim());
                  }
                  for (var i = 0; i < filasTramites.length; i++) {
                    var celdasTramites = filasTramites[i].querySelectorAll('td');
                    var filaDatosTramites = {};
                    for (var j = 0; j < celdasTramites.length; j++) {
                      var contenidoTramites = celdasTramites[j].textContent.trim();
                      filaDatosTramites[nombresColumnasTramites[j]] = contenidoTramites;
                    }
                    historialTramites.push(filaDatosTramites);
                  }
                }
                console.log('Datos Trámites:', historialTramites);
              
                chrome.runtime.sendMessage({
                  historialTramites: historialTramites,
                });
              
            },
          });

          chrome.runtime.onMessage.addListener(function (message) {
            const platesData = {
              historialTramites:message.historialTramites,
            };
            window.frames[0].postMessage(JSON.stringify(platesData), "*");
          });
        }, 1000);
      }
    });*/
    
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
        }, 700); 
      }
    });
  }
});
