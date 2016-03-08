'use strict';

var CalcControllers = angular.module('CalcControllers',[]);

CalcControllers.controller('CalcCtrl', ['$scope', 'calculate', CalcCtrl]);

function CalcCtrl ($scope, calculate){
  // The array of buttons
  this.row = [7,8,9,'/',4,5,6,'*',1,2,3,'-','0','.','=','+'];
  //The string which evaluated
  this.numb = "";
  // Add plus or minus with +/- button
  this.plusMinus = function(){
    res = calculate.plusMinus(numbers,operators);
    numbers = res[0];
    operators = res[1];
    this.numb = calculate.createString(numbers,operators);
  };
  //Value in memory
  this.memory = 0;
  this.memoryInput = calculate.memoryInput;
  this.memoryOutput = function(memory,numbs){
    numbers = calculate.memotyOutput(memory,numbs);
    this.numb = calculate.createString(numbers,operators);
  };
  // Reset button reset all except memory
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
    //Array [0] is array of numbers, [1] is array of operators, [3] is evaluated boolean
    //if = pressed call the evaluate service
    if (this.row[index]==='='){
      res = calculate.evaluate(this.numb,numbers,operators);
      numbers = res[0];
      operators = res[1];
      evaluated = res[2];
    }else{
      // call input service
      res = calculate.input(this.numb,this.row[index],evaluated, numbers,operators);
      numbers = res[0];
      operators = res[1];
      evaluated = res[2];
    }
    // join numbers and operators into string
    this.numb = calculate.createString(numbers,operators);
    this.numbers = numbers;
    // return this.numb;
  };


}
