'use strict';

var CalcControllers = angular.module('CalcControllers',[]);

CalcControllers.controller('CalcCtrl', ['$scope', 'calculate', CalcCtrl]);

function CalcCtrl ($scope, calculate){
  // The array of buttons
  this.row = [7,8,9,'/',4,5,6,'*',1,2,3,'-','0','.','=','+'];
  //The string which evaluated
  this.numb = "";
  this.plusMinus = calculate.plusMinus;
  //Value in memory
  this.memory = 0;
  this.memoryInput = calculate.memoryInput;
  this.resetCalc = function(){
    this.numb = "";
    evaluated = false;
    return this.numb;
  };
  //Indecates if '=' was pressed
  var evaluated = false;
  this.getN = function(index) {
    //Array [0] is the string for calculation, [1] is evaluated boolean
    var res = calculate.input(this.numb,this.row[index],evaluated);
    this.numb = res[0];
    evaluated = res[1];
    return this.numb;
  };


}
