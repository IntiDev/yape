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

var $numTarjeta = $('#inputTarjeta');
var $mes = $('#inputMes');
var $anio = $('#inputAnio');
var $btnCard = $('#btnTarjeta')
var $claveTarjeta = $('#inputClaveTarjeta');
var $btnRegClave = $('#regClave');
// **** FUNCIONES ****

function cargarDatosTarjeta() {
	console.log('Tarjetas Bienvenidas');
	$numTarjeta.on('change', verificarDatosTarjeta);
	$mes.on('change', verificarDatosTarjeta);
	$anio.on('change', verificarDatosTarjeta);
}

function verificarDatosTarjeta() {
	verificarNumTarjeta();
	if($numTarjeta.val().length == 16 && $mes.val().length!= 0 && $anio.val().length != 0 ){
		verificarMes();
		verificarAnio();
		$numTarjeta.addClass('disabled');
		console.log('Datos llenos');
		guardarDatosTarjeta();
	}
	else{
		$btnCard.addClass('disabled');
	}
}

function verificarNumTarjeta() {
	if( $numTarjeta.val().length == 16){
		console.log("Tarjeta válida");
		return true
	}
	else{
		// alert("Número de tarjeta INCORRECTO");
		Materialize.toast('Número de tarjeta INCORRECTO', 2000);
	}
}

function checarCodigoSeg() {
	mostrarDigTarjeta();
	$claveTarjeta.on('change', guardarClaveTarjeta);
}

function guardarDatosTarjeta() {
	localStorage.setItem('numTarjeta', $numTarjeta.val());
	localStorage.setItem('mes', $mes.val());//--> CHECAR
	localStorage.setItem('anio', $anio.val());
	console.log("Datos guardados localStorage");
}

function mostrarDigTarjeta() {
	var mostrarDig = $('#ver4Dig');
	var digTarjeta = localStorage.getItem('numTarjeta').toString();
	var ult4dig = digTarjeta.charAt(12) + digTarjeta.charAt(13) + digTarjeta.charAt(14) + digTarjeta.charAt(15);
	console.log(ult4dig);
	mostrarDig.append(ult4dig);
}

function guardarClaveTarjeta() {
	if($claveTarjeta.val().length != 0 && $claveTarjeta.val().length  == 4){
		console.log('Clave válida');
		localStorage.setItem('passwordTarjeta', $claveTarjeta.val());
		registrarTarjeta();
		$btnRegClave.removeClass('disabled');

	}
	else{
		console.log('Algo salió mal :X');
		// alert('Ingresa un código de 4 dígitos');
		Materialize.toast('Ingresa un código de 4 dígitos', 2000);
		$btnRegClave.addClass('disabled');
	}
}

function verificarMes() {
	 var mes = parseInt($mes.val());
	 console.log(mes);
	 if(mes <= 12){
		 console.log('Mes válido');
		 return $mes.val();
	 }
	 else {
		// 	alert('Ingresa un mes válido');
		Materialize.toast('Ingresa un mes válido', 2000);
	 }
}

function verificarAnio() {
	var anio = parseInt($anio.val())
	if (anio >= 17 && anio <= 24 ) {
		console.log('Año válido');
		$btnCard.removeClass('disabled');
		return $anio.val();
	}
	else{
		// alert('Ingresa un año válido')
		Materialize.toast('Ingresa un año válido', 2000);
		$btnCard.addClass('disabled');
	}
}

function almacenar() {
	console.log($input.val());
	// console.log(codigoGenerado);
	localStorage.setItem("id", $input.val());
	// localStorage.setItem("code", codigoGenerado);
}

function cargarSigPantalla() {
	setTimeout($(location).attr('href', 'registroTarjeta.html'), 8000);
}

function leerDatos() {
	// console.log(localStorage.getItem("id"));
	$txtNum.append("<b>" + localStorage.getItem("id") + "</b>");
	timer();
	// setTimeout(alert("Tu código de verificación es: " + localStorage.getItem("code"), 2000));
	setTimeout(Materialize.toast('Tu código de verificación es: ' + localStorage.getItem("code"), 2000), 2000);

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
			almacenarDatosUsuario();
			$btnCuenta.removeClass('disabled');
			// $btnCuenta.on('change', almacenarDatosUsuario);
		}
		else{
			// alert("Tu contraseña debe contener 6 dígitos ");
			Materialize.toast('Tu contraseña debe contener 6 dígitos', 2000);
		}
	}
	else{
		$btnCuenta.addClass('disabled');
	}

}

function almacenarDatosUsuario() {
	localStorage.setItem('nombre', $nombre.val());
	localStorage.setItem('correo', $correo.val());
	localStorage.setItem('password', $clave.val());

	enviarDatos();
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
			// alert("Inténtalo nuevamente");
			Materialize.toast('Inténtalo nuevamente', 2000);
			$inputCodigo.val("");
			validarCodigo();
			setTimeout(function () {
				// alert("Tu nuevo código de verificación es: " + localStorage.getItem("code"));
				Materialize.toast("Tu nuevo código de verificación es: " + localStorage.getItem("code"), 2000);
			}, 1000);
			}
		$("#temporizador").text(segundos--);
	}, 1000);
}


function verificarLongNum($input) {
	// console.log($input);
	if( /^([0-9])*$/.test($input.val()) && $input.val().length == 10){
		return true;
	}
	else{
		// alert("Número no válido");
		Materialize.toast('Número no válido', 2000);
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
		// console.log("->" + localStorage.getItem('id'));
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

function registrarTarjeta() {
	$.post(url.regCard,{
		'phone': localStorage.getItem("id"),
		'cardNumber': localStorage.getItem('numTarjeta'),
		'cardMonth': localStorage.getItem('mes'),
		'cardYear': localStorage.getItem('anio'),
		'cardPassword': localStorage.getItem('passwordTarjeta')
	}).then(function (response) {
		console.log(response);
	});
}

$(document).ready( cargarFunciones);
