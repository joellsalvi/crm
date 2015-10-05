'use strict';
/**
 * @autor joelsalvi
 */

angular.module('MainApp').controller('ClienteCtrl', function($scope, $rootScope, $http, $location, $routeParams, $filter, $modal, utilsFactory, ngTableParams) {

	var SERVICE_NAME = 'http://localhost:8080/service/public/cliente';
	var SERVICE_NAME_CONTATO = 'http://localhost:8080/service/public/contato';

	$scope.cliente = {};
	$scope.filtroNmCliente = null;
	$scope.clientes = [];
    $scope.dadosAux = {};
    
    if($rootScope.cliente != undefined && $rootScope.acaoForm == 'Editar') {
    	$scope.cliente = $rootScope.cliente;
    }

    /**
     * Lista clientes do sistema
     */
	$scope.listarClientes = function() {
		if($scope.clientes.length == 0) {
		    $http.get(SERVICE_NAME+'/listar')
		    .success(function(data) {
		    	$scope.clientes = angular.copy(data);
		    })
		    .error(function() {
		    	ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Email corretamente.');
		    });
		}
	};
	$scope.listarClientes();

	/**
	 * Pesquisa Clientes
	 */
	$scope.pesquisar = function() {
		$http.post(SERVICE_NAME+'/pesquisar', $scope.filtroNmCliente)
	    .success(function(data) {
	    	$scope.clientes = angular.copy(data);
	    	if(data.length === 0) {
	    		ShowMessagePattern({tipo : 'warning'}, 'Não foram encontrados registros para a Pesquisa.');
	    	} else {
	    		ShowMessagePattern({tipo : 'success'}, 'Pesquisa realizada com sucesso.');
	    	}
	    })
	    .error(function() {
	    	ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Email corretamente.');
	    });
	};
	
    /**
     * Salva novo Cliente
     */
	$scope.salvarNovoCliente = function() {

		if(!$scope.validarCamposNovoCliente()) {
			return false;
		}

        var d = new Date();
		$scope.cliente.dtCadastro = d.getTime();
        
		$http.post(SERVICE_NAME+'/salvarCliente', $scope.cliente)
	        .success(function(data) {
            	if(data) {
                    $location.path('/novoCliente');
                    $rootScope.cliente = data;
                    $rootScope.acaoForm = "Editar";
                    if($scope.cliente.id == null) {
                    	ShowMessagePattern({tipo : 'success'}, 'Cliente cadastrado com Sucesso!');
                    } else {
                    	ShowMessagePattern({tipo : 'success'}, 'Cliente alterado com Sucesso!');
                    }
                    $scope.cliente = data;
                } else {
                    ShowMessagePattern({
                        tipo : 'warning'
                    }, 'Não foi possível registrar o cliente. Por favor, tente novamente.');
                }
	        })
	        .error(function() {
	            ShowMessagePattern({
                    tipo : 'danger'
                }, 'Erro ao tentar cadastrar novo Cliente!');
	    });
		
	};

    /**
     * Excluir Cliente
     */
	$scope.excluir = function(cliente) {
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
					$http.post(SERVICE_NAME+'/excluirCliente', cliente)
			        .success(function(data) {
			        	var index = $scope.clientes.map(function(e)
			            { return e.id;
			            }).indexOf(cliente.id);
			            $scope.clientes.splice(index, 1);
		                $location.path('/clientes');
		                ShowMessagePattern({
		                    tipo : 'success'
		                }, 'Cliente excluído com Sucesso!');
			        })
			        .error(function() {
			            ShowMessagePattern({
		                    tipo : 'danger'
		                }, 'Erro ao tentar excluir Cliente!');
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
		$location.path('/novoCliente');
		$rootScope.cliente = undefined;
	};

	/**
	 * Modo de exibição Editar
	 */
	$scope.modoEditar = function(cliente) {
		$rootScope.acaoForm = 'Editar';
		$location.path('/novoCliente');
		$rootScope.cliente = cliente;
	};

	/**
	 * Ir para tela Listar Contatos
	 */
	$scope.contatos = function() {
		$rootScope.acaoForm = 'novo';
		$location.path('/contatos');
		$rootScope.cliente = $scope.cliente;
	};
	
	/**
	 * Trata direcionamento do sistema
	 */
	$scope.direcionamento = function(acao, cliente) {
		switch (acao) {
		    case 'novo':
		        $scope.modoNovo();
		        break;
		    case 'editar':
		        $scope.modoEditar(cliente);
		        break;
		    default:
		        $scope.voltar();
		}
	};
	
    /**
     * Retorna a pagina de Login
     */
    $scope.voltar = function (){
        $location.path('/clientes');
    };

    /**
     * Monta a tabela para exibicao do resultado da
     * pesquisa
     */
    $scope.tableClientes = new ngTableParams(
    {
        page : 1,
        count : 10
    },
    {
        total : $scope.clientes.length,
        getData : function($defer, params) {
            var orderedData = params.sorting() ? $filter(
                    'orderBy')($scope.clientes,
                    params.orderBy())
                    : $scope.clientes;

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
     * Transforma timestamp em formato de Data para visualização
     */
    $scope.dateToString = function(objDate, pattern) {
        return $filter('date')(objDate, pattern);
    };
    
    /**
     * Atualizar tabela
     */
	$scope.$watch("clientes", function() {
		var i = 0;
        for (; i < $scope.clientes.length; i++) {
            if (null !== $scope.clientes[i].dtCadastro) {
                //$scope.clientes[i].dtCadastro = $scope.dateToString($scope.clientes[i].dtCadastro, 'dd/MM/yyyy');
            }
        }
        $scope.tableClientes.reload();
        $scope.tableClientes.total($scope.clientes.length);
        $scope.tableClientes.reloadPages();
        $scope.tableClientes.$params.page = 1;
	});

    /**
     * Valida regra de negócio dos campos
     */
	$scope.validarCamposNovoCliente = function() {
			$scope.resetarCorDosCampos();
			var camposValidos = true;
			if($scope.cliente.nmCliente === null || $scope.cliente.nmCliente === '') {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Nome corretamente.');
                $scope.class_cliente_nmCliente = "red";
                camposValidos = false;
			}
			if($scope.cliente.estado === null || $scope.cliente.estado === '') {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Estado corretamente.');
                $scope.class_cliente_estado = "red";
                camposValidos = false;
			}
			if($scope.cliente.cidade === null || $scope.cliente.cidade === '') {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Cidade corretamente.');
                $scope.class_cliente_cidade = "red";
                camposValidos = false;
			}
			if($scope.cliente.logradouro === null || $scope.cliente.logradouro === '') {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Logradouro corretamente.');
                $scope.class_cliente_logradouro = "red";
                camposValidos = false;
			}
			if($scope.cliente.nrEndereco === null || $scope.cliente.nrEndereco === '') {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Número do Endereço corretamente.');
                $scope.class_cliente_nrEndereco = "red";
                camposValidos = false;
			}
			if($scope.cliente.porte === null || $scope.cliente.porte === '') {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Porte do Cliente corretamente.');
                $scope.class_cliente_porte = "red";
                camposValidos = false;
			}
			if($scope.cliente.limiteCredito === null || $scope.cliente.limiteCredito === '') {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Limite de Crédito corretamente.');
                $scope.class_cliente_limiteCredito = "red";
                camposValidos = false;
			}
			
			if(($scope.cliente.porte === "1" || $scope.cliente.porte === 1) && $scope.cliente.limiteCredito !== undefined) {
				ShowMessagePattern({tipo : 'warning'}, 'Empresa de Micro Porte, não deverá existir limite de crédito, pois não é permitido vendas à prazo.');
				$scope.cliente.limiteCredito = undefined;
                $scope.class_cliente_limiteCredito = "red";
                camposValidos = false;
			} else if(($scope.cliente.porte === "2" || $scope.cliente.porte === 2) && $scope.cliente.limiteCredito > 10000) {
				ShowMessagePattern({tipo : 'warning'}, 'Empresa de Pequeno Porte, o limite de crédito não deve ser maior que R$ 10.000,00.');
                $scope.class_cliente_limiteCredito = "red";
                camposValidos = false;
			} else if(($scope.cliente.porte === "3" || $scope.cliente.porte === 3) && $scope.cliente.limiteCredito > 50000) {
				ShowMessagePattern({tipo : 'warning'}, 'Empresa de Médio Porte, o limite de crédito não deve exceder R$ 50.000,00.');
                $scope.class_cliente_limiteCredito = "red";
                camposValidos = false;
			} else if(($scope.cliente.porte === "4" || $scope.cliente.porte === 4) && $scope.cliente.limiteCredito > 500000) {
				ShowMessagePattern({tipo : 'warning'}, 'Empresa de Grande Porte, o limite de crédito não deve exceder R$ 500.000,00.');
                $scope.class_cliente_limiteCredito = "red";
                camposValidos = false;
			}
			
			if($scope.cliente.telefone === null || $scope.cliente.telefone === '') {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Telefone corretamente.');
                $scope.class_cliente_telefone = "red";
                camposValidos = false;
			}
			if(!$scope.cliente.tpCliente === null || $scope.cliente.tpCliente === '') {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Tipo de Cliente corretamente.');
                $scope.class_cliente_tpCliente = "red";
                camposValidos = false;
			}
			if($scope.cliente.cpfCnpj === null || $scope.cliente.cpfCnpj === '') {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo CPF/CNPJ corretamente.');
                $scope.class_cliente_cpfCnpj = "red";
                camposValidos = false;
			}
			if($scope.cliente.email === null || $scope.cliente.email === '' || !$scope.isEmail($scope.cliente.email)) {
                ShowMessagePattern({tipo : 'warning'}, 'Por favor, preencha o campo Email corretamente.');
                $scope.class_cliente_email = "red";
                camposValidos = false;
			}
			if(!$scope.dadosAux.confirmarEmail === $scope.cliente.email) {
                ShowMessagePattern({tipo : 'warning'}, 'Email e Confirmar Email não estão iguais!');
                $scope.class_cliente_email = "red";
                camposValidos = false;
			}
			return camposValidos;
	};

	/**
	 * Retorna cor das labels para preto
	 */
	$scope.resetarCorDosCampos = function() {
			$scope.class_cliente_nmCliente = "black";
	        $scope.class_cliente_estado = "black";
	        $scope.class_cliente_cidade = "black";
	        $scope.class_cliente_logradouro = "black";
	        $scope.class_cliente_nrEndereco = "black";
	        $scope.class_cliente_porte = "black";
	        $scope.class_cliente_limiteCredito = "black";
	        $scope.class_cliente_telefone = "black";
	        $scope.class_cliente_tpCliente = "black";
	        $scope.class_cliente_cpfCnpj = "black";
	        $scope.class_cliente_email = "black";
	        $scope.class_cliente_email = "black";
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
