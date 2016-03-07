'use strict';

var CalcControllers = angular.module('CalcControllers',[]);

CalcControllers.controller('CalcCtrl', ['$scope', 'calculate', CalcCtrl]);

function CalcCtrl ($scope, calculate){
  // The array of buttons
  this.row = [7,8,9,'/',4,5,6,'*',1,2,3,'-','0','.','=','+'];
  //The string which evaluated
  this.numb = "";
  this.plusMinus = function(numbers){
    numbers = calculate.plusMinus(numbers);
    this.numb = calculate.createString(numbers,operators);
  };
  //Value in memory
  this.memory = 0;
  this.memoryInput = calculate.memoryInput;
  this.memoryOutput = function(memory,numbs){
    numbers = calculate.memotyOutput(memory,numbs);
    this.numb = calculate.createString(numbers,operators);
  };
  this.resetCalc = function(){
    this.numb = "";
    numbers = [''];
    operators = [''];
    evaluated = false;
  };
  //Indecates if '=' was pressed
  var evaluated = false;
  var lastOper = false;
  var lastChar = 0;
  var numbers = [''];
  var operators = [''];
  var res = [];
  this.getN = function(index) {
    //Array [0] is the string for calculation, [1] is evaluated boolean
    if (this.row[index]==='='){
      res = calculate.evaluate(this.numb,numbers,operators);
      numbers = res[0];
      operators = res[1];
      evaluated = res[2];
    }else{
      res = calculate.input(this.numb,this.row[index],evaluated, lastOper,numbers,operators);
      numbers = res[0];
      operators = res[1];
      evaluated = res[2];
    }
    this.numb = calculate.createString(numbers,operators);
    this.numbers = numbers;
    // return this.numb;
  };


}
