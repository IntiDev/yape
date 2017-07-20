// console.log("JS conectado");
// **** VARIABLES ****
var $input = $('#inputTel');
var $check = $('#checkTerminos');
var $txtNum = $('#textoNumero');
var $inputCodigo = $('#inputValidarCodigo');
var codigoGenerado = 0;
var $nombre = $('#nombre');
var $correo = $('#correo');
var $clave = $('#inputClave');

// **** FUNCIONES ****

function almacenar() {
	console.log($input.val());
	console.log(codigoGenerado);
	localStorage.setItem("id", $input.val());
	localStorage.setItem("code", codigoGenerado);
}

function cargarSigPantalla() {
	setInterval($(location).attr('href', 'registroTarjeta.html'), 4000);
}

function leerDatos() {
	// console.log(localStorage.getItem("id"));
	$txtNum.append("<b>" + localStorage.getItem("id") + "</b>");
	timer();
	setInterval(alert("Tu código de verificación es: " + localStorage.getItem("code"), 2000));
	$inputCodigo.on("keyup", verificarCodigo);
}

function verificarFormulario() {
	console.log("Hola Usuario");
	$nombre.on('change', datosUsuario);
	$correo.on('change', datosUsuario);
	$clave.on('change', datosUsuario);
}

function datosUsuario() {
	var $btnCuenta = $('#btnCuenta');
	if($nombre.val(), $correo.val(), $clave.val() != ""){
		if ($clave.val().length == 6 && $clave.val() == localStorage.getItem("code") ) {
			$btnCuenta.removeClass('disabled');
		}
		else{
			alert("Código incorrecto :(")
		}
	}
	else{
		$btnCuenta.addClass('disabled');
	}

}

function verificarCodigo() {
	// console.log($inputCodigo.val());
	if($inputCodigo.val().length == 6 && $inputCodigo.val() == localStorage.getItem("code")){
		console.log("Código aceptado");
		$(location).attr('href', 'crearUsuario.html');
	}
}
function timer() {
	var segundos = 20;
	var temporizador = setInterval(function(){
		if(segundos == 0){
			clearInterval(temporizador);
			alert("Inténtalo nuevamente");
			// timer();
			$inputCodigo.val("");
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
		alert("Número no válido");
		return false;
	}
}

function verificarCheckbox($check) {
	var habilitado = $check.is(':checked');
	return habilitado;
}

function habilitarBtnContinuar() {
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
	$('#inputTel').on('change', habilitarBtnContinuar);
	$('#checkTerminos').change(habilitarBtnContinuar);
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
