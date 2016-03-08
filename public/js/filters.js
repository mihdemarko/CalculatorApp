'use strict';

angular.module('calcFilters', [])
  .filter('zero', function() { //shows '0.' instead of empty space
    return function(input) {
      if (!input){
        return '0.';
      } else {
        return input;
      }
      };
  });
