'use strict';
var CalcServices = angular.module('CalcServices', []);
CalcServices.factory('calculate',[calculate]);


function calculate () {
  return {
    input:function (result, strN){
        if (!result && isNaN(strN)){result="0" + strN;}
        if (result === "0" && !isNaN(strN)){result= '';}
        if (result !== 'Error'){
          if (strN == '=') {
            isNaN(result.charAt(result.length-1)) ? result = eval(result + '0') : result = eval(result);
            } else {
              if (isNaN(result.charAt(result.length - 1)) && isNaN(strN)){
                result = result.slice(0, result.length - 1) + strN;
              } else {
                result += strN;
              }
            }
            return result === Infinity || result !== result ? 'Error' : result.toString();
        } else {
          return 'Error';
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
