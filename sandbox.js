
const config = {
	apiKey: "AIzaSyCrHSBkkDtgv5zmdQnaxtPp2ftehhPUkqU",
    authDomain: "proyectplateregistration.firebaseapp.com",
    databaseURL: "https://proyectplateregistration-default-rtdb.firebaseio.com",
    projectId: "proyectplateregistration",
    storageBucket: "proyectplateregistration.appspot.com",
    messagingSenderId: "1091378837166",
    appId: "1:1091378837166:web:79133e45a006015b485f3f",
    measurementId: "G-YLGDWC3H2P"
};

async function fetchData() {
	const app = firebase.initializeApp(config);
	console.log("Initialized Firebase!", app);
  
	// Inicializa Firebase Firestore
	const firestore = firebase.firestore();
  
	try {
	  // Consulta la colección "plates" de Firestore
	  const platesCollection = firestore.collection("plates");
	  const querySnapshot = await platesCollection.get();
  
	  querySnapshot.forEach((doc) => {
		// Supongamos que los datos se encuentran en un campo llamado "columnData"
		const columnData = doc.data().columnData;
		//chrome.runtime.sendMessage({ action: "enviarListadoPlacas", placas: columnData });
		if (Array.isArray(columnData)) {
		  for (const plate of columnData) {
			console.log(plate);
		}
		} else {
		  console.log("No se encontraron datos de placas.");
		}
	  });
	} catch (error) {
	  console.error("Error al consultar la colección 'plates':", error);
	}
  }
  
  fetchData(); // Llama a la función para iniciar la consulta

/* window.addEventListener("message", async (event) => {
	if (event.data === "init") {
	  const app = firebase.initializeApp(config);
	  console.log("Initialized Firebase!", app);
  
	  // Inicializa Firebase Firestore
	  const firestore = firebase.firestore();
  
	  try {
		// Consulta la colección "plates" de Firestore
		const platesCollection = firestore.collection("plates");
		const querySnapshot = await platesCollection.get();
  
		querySnapshot.forEach((doc) => {
		  // Supongamos que los datos se encuentran en un campo llamado "columnData"
		  const columnData = doc.data().columnData;
  
		  if (Array.isArray(columnData)) {
			for (const plate of columnData) {
			  console.log(plate);
			}
		  } else {
			console.log("No se encontraron datos de placas.");
		  }
		});
	  } catch (error) {
		console.error("Error al consultar la colección 'plates':", error);
	  }
	}
  }); */