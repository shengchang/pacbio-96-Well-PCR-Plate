'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', []);

function Well(letter, column) {
  this.letter = letter;
  this.column = column;
}

var ColorManager = function() {
  var colors = {};

  var letters = '0123456789ABCDEF'.split('');
  var generateColor = function() {
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return {
    getColor: function(key) {
      if(colors.hasOwnProperty(key)) return colors[key];
      var color = generateColor();
      colors[key] = color;
      return color;
    }
  }
};

myApp.controller("main", ["$scope", function($scope) {
  var colorManager = ColorManager();

  $scope.getColor = function(well) {
    if(!well.name) return "#fff";
    return colorManager.getColor(well.name);
  };

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

  /**
   * Get the well and set it in the form
   * @param well
   */
  $scope.getWell = function(well) {
    $scope.editedWell = angular.copy(well);
  };

  /**
   * Save the well defined in the for at the right location in the plate
   */
  $scope.setWell = function() {
    $scope.plate[$scope.editedWell.letter][$scope.editedWell.column] = $scope.editedWell;
  };

  /**
   * Clear and save the well at the plate location
   */
  $scope.clearWell = function() {
    $scope.editedWell.time = undefined;
    $scope.editedWell.name = undefined;
    $scope.setWell();
  }
  
}]);
