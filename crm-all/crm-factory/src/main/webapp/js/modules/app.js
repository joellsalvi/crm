'use strict';

//MODULO PRINCIPAL DO ANGULAR
var app = angular.module('MainApp', ['ngTable', 'ngRoute', 'ngSanitize', 'angularMoment', 'ui.mask', 'ui.filters',
                                     'checklist-model', 'ui.utils.masks', 'ui.bootstrap']);

/**
 * Controller principal para o modulo app
 */
app.controller('AppCtrl', function ($scope, $rootScope) {
    $scope.tituloApp = "CRM Empresa Comercial";
    
});