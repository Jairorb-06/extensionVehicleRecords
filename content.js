document.getElementById('startAutomation').addEventListener('click', function () {
    console.log("Botón 'Iniciar Automatización' clickeado.");
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log("Extension button clicked.");
      /* chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: detectInput,
      }); */
    // });
  });