console.log("JS conectado");

// ****** Código API ******
// Petición al servidor
function getJSON(url) {
	return new Promise(function (resolve, reject) {
		var ajax = new XMLHttpRequest();

		ajax.open("GET", url),
		ajax.send();
		ajax.onreadystatechange = function () {
			if (ajax.readyState == 4) {
				// resolve(JSON.parse(ajax.responseText));
			}
		}
	});
}

getJSON("api/users.js")
.then(function (datos) {
	console.log(datos);
	return getJSON(dato);
})
.then(function (datosReturn) {
	datosReturn.forEach(function (algo) {
		objectToDom(algo);
	})
});

// function objectToDom(algo) {
// 	var div = document.createElement('div');
// 	div.innerText
// }
// **** FUNCIONES ***

function cargarFunciones() {
	 $('.carousel.carousel-slider').carousel({fullWidth: true});
}


$(document).ready( cargarFunciones);
