// console.log("JS conectado");
// **** VARIABLES ****
var $input = $('#inputTel');
var $check = $('#checkTerminos');

// **** FUNCIONES ****
function verificarLongNum($input) {
	// console.log($input);
	return $input.val().length == 10;
}

function verificarCheckbox($check) {
	var habilitado = $check.is(':checked');
	console.log(habilitado);
	return habilitado;
}

function habilitarBtn() {
	var $btn = $('#btnContinuar');
	if(verificarLongNum($input) && verificarCheckbox($check)){
		$btn.removeClass('disabled');
		$btn.on('click',cargarPeticiones);
	}
	else{
		$btn.addClass('disabled');
	}
}

function validacionItems() {
	$('#inputTel').on('change', habilitarBtn);
	$('#checkTerminos').change(habilitarBtn);
}

function cargarFunciones() {
	 $('.carousel.carousel-slider').carousel({fullWidth: true});
	 $('select').material_select();//dropdown
	 validacionItems();
}

// ****** API ******

var url = {
	regNum : "http://localhost:3000/api/registerNumber",
	resendCode : "http://localhost:3000/api/resendCode",
	createUser : "http://localhost:3000/api/createUser",
	regCard : "http://localhost:3000/api/registerCard"
};

function cargarPeticiones() {
	$.post(url.regNum,{
		"phone": $input.val(),
		"terms": verificarCheckbox($check)
	}).then(function (response) {
		console.log(response);
	}).fail(function (error) {
		console.log(error);
	});


	$.post(url.resendCode,{
		"phone": $input.val()
	}).then(function (response) {
		console.log(response);
	});
}


$(document).ready( cargarFunciones);
