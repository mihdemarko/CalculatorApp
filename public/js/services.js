'use strict';
var CalcServices = angular.module('CalcServices', []);
CalcServices.factory('calculate',[calculate]);


function calculate () {
  return {
    //Handles all input and calculation
    input:function (result, strN, evaluated,numbers,operators){
      // Numbers and dot
      if (!isNaN(strN) || strN === '.'){
        // If '=' was pressed, number input replaces resent value, dot input is '0.'
        // in common case number input creates a number, dot creates a dot
        // every inpot concatenates in the numbers array current cell
        if (evaluated){
          numbers[numbers.length-1] = strN.toString();
          if (strN === '.'){numbers[numbers.length-1] = '0.';}
          evaluated = false;
        } else {
          if (!numbers[numbers.length-1] && strN==='.'){numbers[numbers.length-1]='0';}
          var hasDot = (numbers[numbers.length-1].split('.').length-1)===1;
          if (hasDot && strN==='.'){ // it can be only one dot in number
            strN = '';
          }
          numbers[numbers.length-1] += strN.toString();
        }
        // we can input operator if there is number in numbers array
        // every operator input creates new cell in numbers and operators arrays
      } else if (numbers[numbers.length-1]){
        operators[operators.length-1] += strN;
        operators.push('');
        numbers.push('');
      } else {
        operators[operators.length-2] = strN;
      }
        return [numbers, operators, evaluated];
      },
      //creates string from numbers and operators arrys
    createString: function(numbers,opers){

      var string = '';
      for (var i in numbers){
        if (numbers[i]==='Error'){
          numbers[i]='';
          return 'Error';}
        string += numbers[i]+opers[i];
      }
      return string;
    },
    // evaluates an expression (string), if we get Infinity, creates Error
    evaluate: function(str,numbers,operators){
      if (isNaN(str.charAt(str.length-1))){str +='0';}
      var res = eval(str).toString();
      var err = res === 'Infinity' || res === '-Infinity' || res === 'NaN';
      numbers = [res];
      operators = [''];
      if (err){
        numbers = ['Error'];
        operators = [''];
      }
      return [numbers,operators,true,err];
    },
    // +/- button makes a - before numbers or changes + or - operator
    plusMinus:function (numbers,operators){

      if (operators && operators[operators.length-2]){
        if (operators[operators.length-2]==='+'){
          operators[operators.length-2]= '-';
          return [numbers,operators];
        } else if (operators[operators.length-2]==='-'){

          operators[operators.length-2]= '+';
          return [numbers,operators];
        }
      }
      if (numbers && numbers[numbers.length-1]){
        if (numbers[numbers.length-1].charAt(0)!=='-'){
          numbers[numbers.length-1] = '-' + numbers[numbers.length-1];
        } else {
          numbers[numbers.length-1] = numbers[numbers.length-1].replace("-","");
        }

      }
      return [numbers,operators];
    },
    // memory button saves last number
    memoryInput:function(memory, numbers){
      if (numbers && numbers[numbers.length-1]){
        memory += parseFloat(numbers[numbers.length-1]);
        return memory;
      }
    },
    //memory output overwrites last number
    memotyOutput:function (memory, numbers) {
      if (memory){
        numbers[numbers.length-1] = memory.toString();
        return numbers;
      } else {
        return numbers;
      }
    }
    };
}
