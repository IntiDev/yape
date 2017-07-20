// console.log("JS conectado");
// **** VARIABLES ****
var $input = $('#inputTel');
var $check = $('#checkTerminos');
var $txtNum = $('#textoNumero');
var codigoGenerado = 0;

// **** FUNCIONES ****

function almacenar() {
	console.log($input.val());
	console.log(codigoGenerado);
	localStorage.setItem("id", $input.val());
	localStorage.setItem("code", codigoGenerado);
}

function leerDatos() {
	console.log(localStorage.getItem("id"));
	$txtNum.append("<b>" + localStorage.getItem("id") + "</b>");
	var segundos = 20;
	var temporizador = setInterval(function(){
		if(segundos == 0){
			clearInterval(temporizador);
		}
		$("#temporizador").text(segundos--);
	}, 1000);
}

function verificarLongNum($input) {
	// console.log($input);
	if(/^([0-9])*$/.test($input.val()) && $input.val().length == 10){
		return true;
	}
	else{
		alert("Número no valido");
		return false;
	}
}

function verificarCheckbox($check) {
	var habilitado = $check.is(':checked');
	return habilitado;
}

function habilitarBtn() {
	var $btn = $('#btnContinuar');
	if(verificarLongNum($input) && verificarCheckbox($check)){
		$btn.removeClass('disabled');
		generarCodigo();
		validarCodigo();
		$btn.click(function () {
			almacenar();
			$input.val("");
			$check.removeAttr("checked");
		});
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

function generarCodigo() {
	$.post(url.regNum,{
		"phone": $input.val(),
		"terms": 'true'
	}).then(function (response) {
		console.log(response);
	}).fail(function (error) {
		console.log(error);
	});

}

function validarCodigo(){
	$.post(url.resendCode,{
		"phone": $input.val()
	}).then(function (response) {
		console.log(response);
		console.log(response.data);
		codigoGenerado = response.data;
	});
}

$(document).ready( cargarFunciones);
