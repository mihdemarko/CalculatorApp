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
    return this.numb;
  };
  this.getN = function(index) {
    this.numb = calculate.input(this.numb,this.row[index]);
    this.numb === "Error" ? this.style={'color':'red'}:this.style={'color':'black'};
    return this.numb;
  };


}
