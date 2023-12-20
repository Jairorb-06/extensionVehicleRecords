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

let placaActual = '';
let currentIndexdb='';
window.addEventListener("message", async function(event) {
  //console.log("Respuesta recibida en sandbox.js:", event.data);
  try {
    // Parsear la cadena JSON
    const datos = JSON.parse(event.data);

    // Acceder a cada objeto por separado
    const datosBasicos = datos.datosBasicos || {};
    const infoVehiculo = datos.infoVehiculo || {};
    const datosSoat= datos.datosSoat || {};
    const datosRevisionTM= datos.datosRevisionTM || {};
    const datosCertificaciones = datos.datosCertificaciones || {};
    const datosGravamenes= datos.datosGravamenes || {};
    const datosLimitaciones= datos.datosLimitaciones || {};
    const datosPropietario= datos.datosPropietario || {};
    
    const historialTramites= datos.historialTramites || [];
    const placa = datos.placa 

    const currentIndex = datos.currentIndex;
    console.log("currentIndex db",currentIndex)

    if (placa !== undefined) {
      placaActual = placa;
      //console.log("Nuevo valor de placa:", placaActual);
    } else {
      console.log("se conserva el valor actual:", placaActual);
    }

    if(currentIndex !== undefined){
      currentIndexdb = currentIndex
    }
    // console.log("length", Object.keys(datosBasicos).length )
    // console.log("length history",  historialTramites.length > 0)
    const firestore = firebase.firestore();

   

  const informacionCollection = await firestore.collection("informacion").get();
  let placaEncontradaInformacion = false;
  informacionCollection.forEach((doc) => {
    const datos = doc.data();
    if (datos.placa === placaActual) {
      placaEncontradaInformacion = true;
    }
  });
  console.log("placaEncontradaInformacion", placaEncontradaInformacion)
   /* if (
      (Object.keys(datosBasicos).length === 0 &&
        Object.keys(infoVehiculo).length === 0) ||
      historialTramites.length > 0
    ) {*/
    if (!placaEncontradaInformacion){
      // Enviar a Firestore   
      if (Object.keys(datosBasicos).length > 0 && Object.keys(infoVehiculo).length > 0) {
          const respuestasCollection = firestore.collection("informacion");
          respuestasCollection.add({
            datosBasicos: datosBasicos,
            infoVehiculo: infoVehiculo,
            datosSoat: datosSoat,
            datosRevisionTM: datosRevisionTM,
            datosCertificaciones:datosCertificaciones,
            datosGravamenes:datosGravamenes,
            datosLimitaciones: datosLimitaciones,
            datosPropietario: datosPropietario,
            placa: placaActual,
          })
          .then((docRef) => {
            console.log("Respuesta guardada en Firestore con ID:", docRef.id);
          })
          .catch((error) => {
            console.error("Error al guardar la respuesta en Firestore:", error);
          });
      }
    }else{
      console.log("placa ya consultada!")
    }

      const informacionHistorial = await firestore.collection("historial").get();
      let placaEncontradaHistorial = false;
      informacionHistorial.forEach((doc) => {
        const datos = doc.data();
        if (datos.placa === placaActual) {
          placaEncontradaHistorial = true;
        }
      });
      console.log("placa nHistorial", placaEncontradaHistorial)
      if (!placaEncontradaHistorial){
        if(historialTramites && historialTramites.length > 0){

          const historialCollection = firestore.collection("historial");
          historialCollection.add({
            historialTramites: historialTramites,
            placa: placaActual
          })
          .then((docRef) => {
            console.log("Respuesta guardada en Firestore con ID:", docRef.id);
            
          })
          .catch((error) => {
            console.error("Error al guardar la respuesta en Firestore:", error);
          });
        }else{
          console.log("no hay datos de historial")
        }
      }else{
        console.log("historial de placa ya consultado")
      }

      const indicedb = firestore.collection("Placas");      
      const query = indicedb.where("consulta", "==", false);      
      query.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docRef = indicedb.doc(doc.id);
            if (!isNaN(currentIndexdb)) {
              docRef.update({
                indiceConsultado: currentIndexdb
              })
                .then(() => {
                  console.log("Documento actualizado exitosamente.");
                })
                .catch((error) => {
                  console.error("Error al actualizar el documento:", error);
                });
            }
          });
        })
        .catch((error) => {
          console.error("Error al realizar la consulta:", error);
        });
      
    
    /*}else {
      console.log("No hay datos para guardar en Firestore.");
    }*/
    
  } catch (error) {
    console.error("Error al analizar el mensaje JSON:", error);
  }  
});


async function fetchData() {
  const app = firebase.initializeApp(config);
  // console.log("Initialized Firebase!", app);

  // Inicializa Firebase Firestore
  const firestore = firebase.firestore();

  try {
    // Consulta la colección "plates" de Firestore
    const platesCollection = firestore.collection("Placas");
    const querySnapshot = await platesCollection.get();
    const local = {};

    const platesData = [];
    querySnapshot.forEach((doc) => {
      const consulta = doc.data().consulta;
      if (consulta === false) {
        const columnData = doc.data().placas || doc.data().placasUbicabilidad;
        const indiceConsultado = doc.data().indiceConsultado ;

      console.log( columnData)        
        if (Array.isArray(columnData)) {
          /*
          //iterar placa por placa
          const filteredPlates = columnData.filter(plate => !plate.estado);
          for (const plate of filteredPlates) {
            platesData.push(plate);
          } */        
          for (const plate of columnData) {
            platesData.push(plate);
          }
          // Después de obtener las placas
          window.parent.postMessage({ platesData, indiceConsultado }, "*");

          // console.log("Placas", platesData);
        } else {
          console.log("No se encontraron datos de placas.");
        }
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
  
 
  