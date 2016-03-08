'use strict';

var CalcServices = angular.module('CalcServices', []);
CalcServices.factory('calculate',[calculate]);

// shortcat for getting last item in array
Object.defineProperty(Array.prototype, "last", {
    enumerable: false,
    get: function (){return this[this.length-1];},
    set: function (val){this[this.length-1] = val;}
});

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
          numbers.last = strN.toString();
          if (strN === '.'){numbers.last = '0.';}
          evaluated = false;
        } else {
          if (!numbers.last && strN==='.'){numbers.last='0';}
          var hasDot = (numbers.last.split('.').length-1)===1;
          if (hasDot && strN==='.'){ // it can be only one dot in number
            strN = '';
          }
          numbers.last += strN.toString();
        }
        // we can input operator if there is number in numbers array
        // every operator input creates new cell in numbers and operators arrays
      } else if (numbers.last){
        operators.last += strN;
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
      if (!str){return [numbers,operators,false,err];}
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
      if (numbers && numbers.last){
        if (numbers.last.charAt(0)!=='-'){
          numbers.last = '-' + numbers.last;
        } else {
          numbers.last = numbers.last.replace("-","");
        }

      }
      return [numbers,operators];
    },
    // memory button saves last number
    memoryInput:function(memory, numbers){
      memory = parseFloat(memory);
      if (numbers && numbers.last){
        memory += parseFloat(numbers.last);
        return memory;
      } else {return memory;}
    },
    //memory output overwrites last number
    memotyOutput:function (memory, numbers) {
      if (memory){
        numbers.last = memory.toString();
        return numbers;
      } else {
        return numbers;
      }
    }
    };
}
