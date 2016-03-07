'use strict';
var CalcServices = angular.module('CalcServices', []);
CalcServices.factory('calculate',[calculate]);


function calculate () {
  return {
    //Handles all input and calculation
    input:function (result, strN, evaluated,lastOper,numbers,operators){
      if (!isNaN(strN) || strN === '.'){
        if (evaluated){
          numbers[numbers.length-1] = strN.toString();
          if (strN === '.'){numbers[numbers.length-1] = '0.';}
          evaluated = false;
        } else {
          if (!numbers[numbers.length-1] && strN==='.'){numbers[numbers.length-1]='0';}
          var hasDot = (numbers[numbers.length-1].split('.').length-1)===1;
          if (hasDot && strN==='.'){
            strN = '';
          }
          numbers[numbers.length-1] += strN.toString();
        }

      } else if (numbers[numbers.length-1]){
        operators[operators.length-1] += strN;
        operators.push('');
        numbers.push('');
      } else {
        operators[operators.length-2] = strN;
      }
      console.log(numbers);
      console.log(operators);







        return [numbers, operators, evaluated];
        // } else {
        //   return ['Error',evaluated];
        // }
      },

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
      console.log(err);
      return [numbers,operators,true,err];
    },
    plusMinus:function (numbers){

      if (numbers && numbers[numbers.length-1]){
        if (numbers[numbers.length-1].charAt(0)!=='-'){
          numbers[numbers.length-1] = '-' + numbers[numbers.length-1];
        } else {
          numbers[numbers.length-1] = numbers[numbers.length-1].replace("-","");
        }

      }
      return numbers;
    },
    memoryInput:function(memory, numbers){
      if (numbers && numbers[numbers.length-1]){
        memory += parseFloat(numbers[numbers.length-1]);
        return memory;
      }
    },
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
