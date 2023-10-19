// popup.js
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
              // setTimeout(() => {
                // const buscarButton = document.getElementById('ConsultarAutomotorForm:btnconsultarAutomotor');
                buscarButton.click(); // Presiona el botón "Buscar"
                console.log("Button clicked");


              // }, 2000);
            } else {
              console.log("Automatización completada!");
            }
          }

         
          insertPlacaAndTab();

          // Ahora busca el botón "Generar Historial"
         
        } else {
          console.log("Campo de entrada no encontrado.");
        }
      }
    });
  });
});










// popup.js
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
                if (buscarButton) {
                  buscarButton.click(); // Presiona el botón "Buscar"
                  console.log("Button clicked");
                }
              }, 2000);
            } else {
              console.log("Automatización completada!");
            }
          }

          insertPlacaAndTab();

          // Ahora busca el botón "Generar Historial"
          setTimeout(() => {
            const generarHistorialButton = document.getElementById('ConsultarAutomotorForm:btnAction2');
            if (generarHistorialButton) {
              console.log("Presionando el botón 'Generar Historial'...");
              generarHistorialButton.click();
            } else {
              console.log("El botón 'Generar Historial' no se encontró en la página.");
            }
          }, 10000); // Ajusta el tiempo según sea necesario
        } else {
          console.log("Campo de entrada no encontrado.");
        }
      }
    });
  });
});









// popup.js
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
                if (buscarButton) {
                  buscarButton.click(); // Presiona el botón "Buscar"
                  console.log("Button clicked");

                  // Espera un tiempo para asegurarte de que la información se haya cargado completamente (ajusta el tiempo según sea necesario)
                 

                    // Intenta encontrar y presionar el botón "Generar Historial"
                    const generarHistorialButton = document.getElementById('ConsultarAutomotorForm:btnAction2');
                    if (generarHistorialButton) {
                      generarHistorialButton.click();
                      console.log("Botón 'Generar Historial' presionado.");
                    }

                    // Llama a la función insertPlacaAndTab nuevamente para procesar la siguiente placa
                    insertPlacaAndTab();
                 
                    // Ajusta el tiempo según sea necesario
                }
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
