'use strict';

angular.module('calcFilters', [])
  .filter('zero', function() {
    return function(input) {
      if (!input){
        return '0.';
      } else {
        return input;
      }
      };
  });
