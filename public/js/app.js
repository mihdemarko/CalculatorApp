'use strict';

var CalcApp = angular.module('CalcApp',[
  'ngRoute',
  'CalcControllers',
  'CalcServices',
  'calcFilters'
  ]);

CalcApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/',{
      templateUrl:'partials/calc-small.html',
      controller:'CalcCtrl',
      controllerAs:'ctrl'
      }).
      otherwise({
        redirectTo:'/'
      });

}]);
