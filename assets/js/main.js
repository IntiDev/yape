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
var $btnCuenta = $('#btnCuenta');

// **** FUNCIONES ****

function almacenar() {
	console.log($input.val());
	// console.log(codigoGenerado);
	localStorage.setItem("id", $input.val());
	// localStorage.setItem("code", codigoGenerado);
}

function almacenarDatosUsuario() {
	localStorage.setItem('nombre', $nombre.val());
	localStorage.setItem('correo', $correo.val());
	localStorage.setItem('password', $clave.val());

	enviarDatos();
}
function cargarSigPantalla() {
	setTimeout($(location).attr('href', 'registroTarjeta.html'), 8000);
}

function leerDatos() {
	// console.log(localStorage.getItem("id"));
	$txtNum.append("<b>" + localStorage.getItem("id") + "</b>");
	timer();
	setTimeout(alert("Tu código de verificación es: " + localStorage.getItem("code"), 2000));
	$inputCodigo.on("keyup", verificarCodigo);
}

function verificarFormulario() {
	console.log("Hola Usuario");
	$nombre.on('change', datosUsuario);
	$correo.on('change', datosUsuario);
	$clave.on('change', datosUsuario);
}

function datosUsuario() {
	if($nombre.val(), $correo.val(), $clave.val() != ""){
		if ($clave.val().length == 6 ) {
			$btnCuenta.removeClass('disabled');
			$btnCuenta.on('change', almacenarDatosUsuario);
		}
		else{
			alert("Tu contraseña debe contener 6 dígitos ");
		}
	}
	else{
		$btnCuenta.addClass('disabled');
	}

}

function verificarCodigo() {
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
			$inputCodigo.val("");
			// localStorage.setItem("code", " ");
			validarCodigo();
			setTimeout(function () {
				alert("Tu nuevo código de verificación es: " + localStorage.getItem("code"));
			}, 1000);
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
		almacenar();
		generarCodigo();
		console.log("->" + localStorage.getItem('id'));
		// validarCodigo();
		$btn.click(function () {
			validarCodigo();
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
		"phone": localStorage.getItem("id"),
		"terms": 'true'
	}).then(function (response) {
		console.log(response);
	}).fail(function (error) {
		console.log(error);
	});

}

function validarCodigo(){
	$.post(url.resendCode,{
		"phone": localStorage.getItem('id')
	}).then(function (response) {
		console.log(response);
		codigoGenerado = response.data;
		console.log(codigoGenerado);
		localStorage.setItem("code", codigoGenerado);
		return codigoGenerado;
	}).then(function () {
	// alert("Tu nuevo código de verificación es: " + localStorage.getItem("code"));
	});
}

function enviarDatos() {
	$.post(url.createUser,{
		'phone': localStorage.getItem("id"),
		'name': localStorage.getItem('nombre'),
		'email': localStorage.getItem('correo'),
		'password': localStorage.getItem('password')
	}).then(function (response) {
		console.log(response);
	});
}

$(document).ready( cargarFunciones);
