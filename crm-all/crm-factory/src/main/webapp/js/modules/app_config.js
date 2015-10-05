//var app = angular.module('MainApp');

app.config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {

    var URL_PATH_PARTIALS = '/view/partials/';

	$routeProvider
	//Initial Page
	.when('/', {
		templateUrl: URL_PATH_PARTIALS+'cliente/clientes.html',
		controller: 'ClienteCtrl'
	})
	//Lista de Clientes
	.when('/clientes', {
		templateUrl: URL_PATH_PARTIALS+'cliente/clientes.html',
		controller: 'ClienteCtrl'
	})
	//Lista de Contatos
	.when('/contatos', {
		templateUrl: URL_PATH_PARTIALS+'contato/contatos.html',
		controller: 'ContatoCtrl'
	})
	//Cadastro de Cliente
	.when('/novoCliente', {
		templateUrl: URL_PATH_PARTIALS+'cliente/cadastroCliente.html',
		controller: 'ClienteCtrl'
	})
	//Cadastro de Contato
	.when('/novoContato', {
		templateUrl: URL_PATH_PARTIALS+'contato/cadastroContato.html',
		controller: 'ContatoCtrl'
	})
    //Outras URLS
	.otherwise({
		templateUrl: URL_PATH_PARTIALS+'cliente/clientes.html',
		controller: 'ClienteCtrl'
	});
}]);
