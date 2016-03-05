'use strict';
var CalcServices = angular.module('CalcServices', []);
CalcServices.factory('calculate',[calculate]);


function calculate () {
  return {
    //Handles all input and calculation
    input:function (result, strN, evaluated){
        //'=' was pressed and number is pressed now
        if (evaluated && !isNaN(strN)) {
          result = '';
          evaluated = false;
        } else {
          evaluated = false;
        }
        //There was no input and operation button was pressed, add operation to zero
        if (!result && isNaN(strN)){result="0" + strN;}
        //It is zero and number pressed, remove zero and display number
        if (result === "0" && !isNaN(strN)){result= '';}
        //IF we get error we can only press reset
        if (result !== 'Error'){
          if (strN == '=') { //if '=' is pressed
            evaluated = true;
            //if the last character is not number
            isNaN(result.charAt(result.length-1)) ? result = eval(result + '0') : result = eval(result);
            } else {
              if (isNaN(result.charAt(result.length - 1)) && isNaN(strN)){
                result = result.slice(0, result.length - 1) + strN;
              } else {
                console.log(result.split('.').length-1);
                if (result.split('.').length-1===1 && strN==='.'){strN='';}
                result += strN;
              }
            }
            result = result === Infinity || result !== result ? 'Error' : result.toString();
            return [result, evaluated];
        } else {
          return ['Error',evaluated];
        }
      },
    plusMinus:function (string){
      var oper = ['*','/','+','-'];
      var res = -1;
        for (var i in oper){
          if (string.lastIndexOf(oper[i])>res){res=string.lastIndexOf(oper[i]);}
        }
      if (res!==-1){
        if (string.charAt(res) !== '-' && string.charAt(res) !== '+'){
          string = string.substr(0,res+1)+'-'+string.substr(res+1,string.length);
          } else if (string.charAt(res) ==='+'){
            string = string.substr(0,res)+'-'+string.substr(res+1,string.length);
          }else if (!isNaN(string.charAt(res-1))){
            string = string.substr(0,res)+'+'+string.substr(res+1,string.length);
          } else {
            string = string.substr(0,res)+string.substr(res+1,string.length);
          }
      }else{
        string = '-' + string;
      }
      return string === '-' ? '':string;
    },
    memoryInput:function(memory, string){
      if (!string){
        string = 0;
      }
      if (!isNaN(string)){
        return parseFloat(memory) + parseFloat(string);
      }
    }
    };
}
