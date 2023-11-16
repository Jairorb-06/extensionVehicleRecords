// sandbox.js
/* window.addEventListener('message', (event) => {
  if (event.data && event.data.data) {
    const datosRecibidos = event.data.data;
    // Ahora puedes trabajar con los datos recibidos en sandbox.js
    console.log(datosRecibidos)
  }
});
 */
/* chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.datos) {
    const arregloRecibido = request.datos;
    // Ahora puedes trabajar con el arreglo en sandbox.js
    console.log(arregloRecibido);
  }
}); */


const config = {
  apiKey: "AIzaSyCrHSBkkDtgv5zmdQnaxtPp2ftehhPUkqU",
  authDomain: "proyectplateregistration.firebaseapp.com",
  databaseURL: "https://proyectplateregistration-default-rtdb.firebaseio.com",
  projectId: "proyectplateregistration",
  storageBucket: "proyectplateregistration.appspot.com",
  messagingSenderId: "1091378837166",
  appId: "1:1091378837166:web:79133e45a006015b485f3f",
  measurementId: "G-YLGDWC3H2P",
};
firebase.initializeApp(config);

window.addEventListener("message", function(event) {
  //console.log("Respuesta recibida en sandbox.js:", event.data);
  try {
    // Parsear la cadena JSON
    const datos = JSON.parse(event.data);

    // Acceder a cada objeto por separado
    const datosBasicos = datos.datosBasicos || {};
    const infoVehiculo = datos.infoVehiculo || {};
    const datosSoat= datos.datosSoat || {};
    const datosPropietario= datos.datosPropietario || {};
    // Imprimir los resultados
    console.log("Datos Básicos:", datosBasicos);
    console.log("Info Vehículo:", infoVehiculo);

    // Enviar a Firestore
    const firestore = firebase.firestore();
    const respuestasCollection = firestore.collection("respuestas");
    respuestasCollection.add({
      datosBasicos: datosBasicos,
      infoVehiculo: infoVehiculo,
      datosSoat: datosSoat,
      datosPropietario: datosPropietario,
    })
    .then((docRef) => {
      console.log("Respuesta guardada en Firestore con ID:", docRef.id);
    })
    .catch((error) => {
      console.error("Error al guardar la respuesta en Firestore:", error);
    });
  } catch (error) {
    console.error("Error al analizar el mensaje JSON:", error);
  }
});


async function fetchData() {
  const app = firebase.initializeApp(config);
  console.log("Initialized Firebase!", app);

  // Inicializa Firebase Firestore
  const firestore = firebase.firestore();

  try {
    // Consulta la colección "plates" de Firestore
    const platesCollection = firestore.collection("plates");
    const querySnapshot = await platesCollection.get();
    const local = {};

    const platesData = [];
    querySnapshot.forEach((doc) => {
      // Supongamos que los datos se encuentran en un campo llamado "columnData"
      const columnData = doc.data().columnData;

      if (Array.isArray(columnData)) {
        for (const plate of columnData) {
          platesData.push(plate);
        }
        // Después de obtener las placas
        window.parent.postMessage({ platesData }, "*");

        console.log("Placas obtenidas en sandbox.js:", platesData);
      } else {
        console.log("No se encontraron datos de placas.");
      }
    });
  } catch (error) {
    console.error("Error al consultar la colección 'plates':", error);
  }
}
fetchData(); // Llama a la función para iniciar la consulta


/* async function saveResultsToFirebase(resultados) {
	try {
	  const firestore = firebase.firestore();
  
	  // Supongamos que quieres guardar los resultados en una colección llamada "resultados"
	  const resultadosCollection = firestore.collection("resultados");
		console.log("resultados2", resultados)
	  // Guarda los resultados en Firebase
	  await resultadosCollection.add({
		resultados: resultados
	  });
  
	  console.log("Resultados guardados en Firebase:", resultados);
	} catch (error) {
	  console.error("Error al guardar resultados en Firebase:", error);
	}
  } */
  
 /*  window.addEventListener("message", function(event) {
	console.log("event", event)
	if (event.data.placs) {
	  const placs = event.data.placs;
		console.log("resultados", placs)
	  // Guarda los resultados en Firebase
	  saveResultsToFirebase(placs);
	}
  });
 */
// Escucha el mensaje enviado desde popup.js
/* window.addEventListener("message", function(event) {
	console.log("ebent", event)
	if (event.data.placsData) {
	  const placsData = event.data.placsData;
	  console.log("placsData", placsData)
	  // Procesa el array 'placsData' y realiza las acciones necesarias, como guardarlos en Firebase.
	}
  });
   */
  
 
  