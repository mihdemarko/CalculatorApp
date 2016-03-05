'use strict';

var CalcControllers = angular.module('CalcControllers',[]);

CalcControllers.controller('CalcCtrl', ['$scope', 'calculate', CalcCtrl]);

function CalcCtrl ($scope, calculate){
  this.row = [7,8,9,'/',4,5,6,'*',1,2,3,'-','0','.','=','+'];
  this.numb = "";
  this.style = {};
  this.plusMinus = calculate.plusMinus;
  this.memory = 0;
  this.memoryInput = calculate.memoryInput;
  this.resetCalc = function(){
    this.numb = "";
    evaluated = false;
    return this.numb;
  };
  var evaluated = false;
  this.getN = function(index) {
    console.log(evaluated);
    var res = calculate.input(this.numb,this.row[index],evaluated);
    this.numb = res[0];
    evaluated = res[1];
    return this.numb;
  };


}
