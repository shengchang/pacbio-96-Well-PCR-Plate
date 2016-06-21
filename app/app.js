'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', []);

function Well(letter, column) {
  this.letter = letter;
  this.column = column;
}

myApp.controller("main", ["$scope", function($scope) {

  $scope.form = {
    letters: ['A','B','C','D','E','F','G','H'],
    columns: [1,2,3,4,5,6,7,8,9,10,11,12],
    time: {min:5, max:90},
    name: {max:64}
  };

  $scope.editedWell = new Well('A',1);

  // Init the plate
  var plate = {};
  $scope.form.letters.forEach(function(letter) {
    plate[letter] = {};
    $scope.form.columns.forEach(function(column) {
      plate[letter][column] = new Well(letter,column);
    });
  });
  $scope.plate = plate;

  $scope.getWell = function(well) {
    $scope.editedWell = angular.copy(well);
  };

  $scope.setWell = function() {
    $scope.plate[$scope.editedWell.letter][$scope.editedWell.column] = $scope.editedWell;
  }
  
}]);
