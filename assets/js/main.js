console.log("JS conectado");

// ****** Código API ******
// Petición al servidor
function getJSON(url) {
	return new Promise(function (resolve, reject) {
		var ajax = new XMLHttpRequest();

		ajax.open("GET", url),
		ajax.send();
		ajax.onreadystatechange = function () {
		}
	});
}

getJSON("http://localhost:3000/api/registerNumber");

// **** FUNCIONES ***
function verificarLongNum() {
	var $input = $('#inputTel').val().length;
	console.log($input);
	return $input == 10;
}

function verificarCheckbox() {
	var $check = $('#checkTerminos');
	console.log($check.is(':checked'));
	return $check.is(':checked');
}

function habilitarBtn() {
	var $btn = $('#btnContinuar');

	if(verificarLongNum() && verificarCheckbox()){
		$btn.removeClass('disabled');
	}
	else{
		$btn.addClass('disabled');
	}
}

function validacion() {
	$('#inputTel').on('change', habilitarBtn);
	$('#checkTerminos').change(habilitarBtn);
}

function cargarFunciones() {
	 $('.carousel.carousel-slider').carousel({fullWidth: true});
	 $('select').material_select();
	 validacion();
}


$(document).ready( cargarFunciones);
