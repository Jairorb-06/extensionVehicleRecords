document.getElementById('startAutomation').addEventListener('click', function () {
  console.log("Botón 'Iniciar Automatización' clickeado.");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("Extensión button clicked.");
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        console.log("Detectando campo de entrada...");
        const input = document.getElementById('ConsultarAutomotorForm:automotorPlacaNumplaca');
        if (input) {
          console.log("Campo de entrada encontrado.");
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