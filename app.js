// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCb0kJxbTLUyPUOPMSA2Re36et5rxO2V2c',
  authDomain: 'crud-adc9a.firebaseapp.com',
  projectId: 'crud-adc9a'
});

var db = firebase.firestore();

function guardar() {

	var nombre = document.getElementById('nombre').value;
	var apellido = document.getElementById('apellido').value;
	var fecha = document.getElementById('fecha').value;

	db.collection("users").add({
	    first: nombre,
	    last: apellido,
	    born: fecha
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	    document.getElementById('nombre').value = '';
		document.getElementById('apellido').value = '';
		document.getElementById('fecha').value = ''; 
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

//Leer Docuemntos
var tabla = document.getElementById('tabla'); 
//se cambia get() (y se elimina la promesa )por onSnapshot para ver en tiemporeal
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        console.log(`${doc.id} => ${doc.data().first}`);

        tabla.innerHTML += `
			<tr>
		      <th scope="row">${doc.id}</th>
		      <td>${doc.data().first}</td>
		      <td>${doc.data().last}</td>
		      <td>${doc.data().born}</td>
		    </tr>
        `;
    });
});