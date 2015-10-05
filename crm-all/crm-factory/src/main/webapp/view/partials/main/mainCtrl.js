'use strict';
/**
 * @autor joelsalvi
 */

angular.module('MainApp').controller('MainCtrl', function($scope) {
  $scope.tituloApp = 'CRM Empresa Comercial';
})
.directive('dirHead', function() {
	return {
		restrict: 'E',
		templateUrl: '/view/partials/main/_dir-head.html'
	};
});
