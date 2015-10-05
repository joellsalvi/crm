angular.module('MainApp').controller('ModalConfirmacaoCtrl', function($scope, $modalInstance, $modal, params) {
//app.controller('ModalConfirmacaoCtrl', [ '$scope', '$modalInstance', '$modal', 'params',
		//function($scope, $modalInstance, $modal, params) {

			$scope.titulo = 'Confirme exclus&atilde;o';
			$scope.mensagem = 'Tem certeza que deseja excluir?';
			$scope.botaoConfirma = 'Excluir';
			$scope.botaoConfirmaClass = 'btn btn-danger btn-mesmo-tamanho';

			/**
			 * Parametros para alterar os campos da tela
			 */
			if (params != {}) {
				if (params.titulo != undefined)
					$scope.titulo = params.titulo;
				if (params.mensagem != undefined)
					$scope.mensagem = params.mensagem;
				if (params.botaoConfirma != undefined)
					$scope.botaoConfirma = params.botaoConfirma;
				if (params.botaoConfirmaClass != undefined)
					$scope.botaoConfirmaClass = params.botaoConfirmaClass;
			}

			/**
			 * Fecha o modal e passa um valor referente a confirmacao do modal
			 */
			$scope.confirma = function() {
				$modalInstance.close(true);
			};

			/**
			 * Fecha o modal e passa um valor referente a rejeicao do modal
			 */
			$scope.fechar = function() {
				$modalInstance.close(false);
			};

		});
