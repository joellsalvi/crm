'use strict';
/**
 * @autor joelsalvi
 */

angular.module('MainApp').controller('ContatoCtrl', function($scope, $rootScope, $http, $location, $routeParams, $filter, $modal, utilsFactory, ngTableParams) {

	var SERVICE_NAME = 'http://localhost:8080/service/public/contato';
	
	$scope.contato = {};
	$scope.contatos = [];
    $scope.dadosAux = {};

    if($rootScope.contato != undefined && $rootScope.acaoForm == 'Editar') {
    	$scope.contato = $rootScope.contato;
    }

	$scope.listarContatos = function() {
		if($scope.contatos.length == 0) {
			$http.post(SERVICE_NAME+'/listar', $rootScope.cliente.id)
			.success(function(data) {
				$scope.contatos = angular.copy(data);
			})
			.error(function() {
				$scope.contatos = [];
				ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Email corretamente.');
			});
		}
	};
	$scope.listarContatos();
	
    /**
     * Salva novo Contato
     */
	$scope.salvarNovoContato = function() {

		if(!$scope.validarCamposNovoContato()) {
			return false;
		}
		
		$scope.contato.cliente = {"id": $rootScope.cliente.id};

		$http.post(SERVICE_NAME+'/salvarContato', $scope.contato)
	        .success(function(data) {
            	if(data) {
                    $location.path('/contatos');
                    if($scope.contato.id == null) {
                    	ShowMessagePattern({tipo : 'success'}, 'Contato cadastrado com Sucesso!');
	                } else {
	                	ShowMessagePattern({tipo : 'success'}, 'Contato alterado com Sucesso!');
	                }
                } else {
                    ShowMessagePattern({
                        tipo : 'warning'
                    }, 'Não foi possível registrar o contato. Por favor, tente novamente.');
                }
	        })
	        .error(function() {
	            ShowMessagePattern({
                    tipo : 'danger'
                }, 'Erro ao tentar cadastrar novo Contato!');
	    });
		
	};

    /**
     * Excluir Contato
     */
	$scope.excluir = function(contato) {
		var modalInstanceOther = $modal
        .open({
            templateUrl: 'view/modals/comum/_modalConfirmacao.html',
            controller: 'ModalConfirmacaoCtrl',
            backdrop: 'static',
            resolve: {
                params: function () {
                    return {};
                }
            }
        });
		modalInstanceOther.result.then( function (confirma) {
				if (confirma) {
					$http.post(SERVICE_NAME+'/excluirContato', contato)
			        .success(function(data) {
			        	var index = $scope.contatos.map(function(e)
			            { return e.id;
			            }).indexOf(contato.id);
			            $scope.contatos.splice(index, 1);
		                $location.path('/contatos');
		                ShowMessagePattern({
		                    tipo : 'success'
		                }, 'Contato excluído com Sucesso!');
			        })
			        .error(function() {
			            ShowMessagePattern({
		                    tipo : 'danger'
		                }, 'Erro ao tentar excluir Contato!');
			        });
				}
		}, function () {
		});
	};

	/**
	 * Modo de exibição Novo
	 */
	$scope.modoNovo = function() {
		$rootScope.acaoForm = 'Novo';
		$location.path('/novoContato');
		$rootScope.contato = undefined;
	};

	/**
	 * Modo de exibição Editar
	 */
	$scope.modoEditar = function(contato) {
		$rootScope.acaoForm = 'Editar';
		$location.path('/novoContato');
		$rootScope.contato = contato;
	};
	
	/**
	 * Trata direcionamento do sistema
	 */
	$scope.direcionamento = function(acao, contato) {
		switch (acao) {
		    case 'novo':
		        $scope.modoNovo();
		        break;
		    case 'editar':
		        $scope.modoEditar(contato);
		        break;
		    default:
		        $scope.voltar();
		}
	};
	
    /**
     * Retorna a pagina de Login
     */
    $scope.voltar = function (){
        $location.path('/contatos');
    };
	
    /**
     * Retorna a pagina de Login
     */
    $scope.voltarParaCliente = function (){
        $location.path('/novoCliente');
        $rootScope.acaoForm = "Editar";
    };

    /**
     * Monta a tabela para exibicao do resultado da
     * pesquisa
     */
    $scope.tableContatos = new ngTableParams(
    {
        page : 1,
        count : 10
    },
    {
        total : $scope.contatos.length,
        getData : function($defer, params) {
            var orderedData = params.sorting() ? $filter(
                    'orderBy')($scope.contatos,
                    params.orderBy())
                    : $scope.contatos;

            $defer.resolve(orderedData.slice(
                    (params.page() - 1)
                            * params.count(),
                    params.page()
                            * params.count()));
        },
        $scope : {
            $data : {}
        }
    });

    /**
     * Atualizar tabela
     */
	$scope.$watch("contatos", function() {
		$scope.tableContatos.reload();
		$scope.tableContatos.total($scope.contatos.length);
		$scope.tableContatos.reloadPages();
		$scope.tableContatos.$params.page = 1;
	});

    /**
     * Valida regra de negócio dos campos
     */
	$scope.validarCamposNovoContato = function() {
		$scope.resetarCorDosCampos();
		var camposValidos = true;
		if($scope.contato.nmContato === null || $scope.contato.nmContato === '') {
            ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Nome corretamente.');
            $scope.class_contato_nmContato = "red";
            camposValidos = false;
		}
		if($scope.contato.telefone === null || $scope.contato.telefone === '') {
            ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Telefone corretamente.');
            $scope.class_contato_telefone = "red";
            camposValidos = false;
		}
		if(!$scope.contato.cargo === null || $scope.contato.cargo === '') {
            ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Cargo corretamente.');
            $scope.class_contato_cargo = "red";
            camposValidos = false;
		}
		if($scope.contato.departamento === null || $scope.contato.departamento === '') {
            ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Departamento corretamente.');
            $scope.class_contato_departamento = "red";
            camposValidos = false;
		}
		if($scope.contato.email === null || $scope.contato.email === '' || !$scope.isEmail($scope.contato.email)) {
            ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Email corretamente.');
            $scope.class_contato_email = "red";
            camposValidos = false;
		}
		if(!$scope.dadosAux.confirmarEmail === $scope.contato.email) {
            ShowMessagePattern({tipo : 'warning'}, 'Email e Confirmar Email não estão iguais!');
            $scope.class_contato_email = "red";
            camposValidos = false;
		}
		return camposValidos;
	};

	/**
	 * Retorna cor das labels para preto
	 */
	$scope.resetarCorDosCampos = function() {
		$scope.class_contato_nmContato = "black";
        $scope.class_contato_telefone = "black";
        $scope.class_contato_cargo = "black";
        $scope.class_contato_departamento = "black";
        $scope.class_contato_email = "black";
        $scope.class_contato_confirmarEmail = "black";
	};

	/**
	 * Valida formado de Email
	 */
	$scope.isEmail = function(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  		return regex.test(email);
	}
	
	$('.onlyNumber').keypress(function(e) {
	    var a = [];
	    var k = e.which;
	    var i;
	    for (i = 48; i < 58; i++)
	        a.push(i);
	    
	    if (!(a.indexOf(k)>=0))
	        e.preventDefault();
	    
	    $('span').text('KeyCode: '+k);
	});
	
});
