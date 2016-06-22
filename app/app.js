'use strict';

var myApp = angular.module('myApp', ['ngMessages']);

/**
 * Object representing a Well
 * @param letter
 * @param column
 * @constructor
 */
function Well(letter, column) {
  this.letter = letter;
  this.column = column;
  this.time = undefined;
  this.name = undefined;
}

/**
 * Color manager to generate random color for each new key
 * @returns {{getColor: getColor}}
 * @constructor
 */
var ColorManager = function() {
  var colors = {};

  // Chars of the Hexadecimal
  var letters = '0123456789ABCDEF'.split('');

  /**
   * Generate a random color
   * @returns {string} color formatted "#XXXXXX" where X is hexadecimal character
   */
  var generateColor = function() {
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return {
    /**
     * Return the color associated to the key if exist, or generate a new one
     * @param key
     * @returns {string} Color formatted "#XXXXXX"
     */
    getColor: function(key) {
      if(colors.hasOwnProperty(key)) return colors[key];
      var color = generateColor();
      colors[key] = color;
      return color;
    }
  }
};

myApp.provider('ColorManager', function() {
  this.$get = ColorManager;
});

/**
 * Main and only controller of this simple app
 */
var MainController = function($scope, ColorManager) {

  /**
   * Give the color to display for a Well
   * @param well
   * @returns {string} Color formatted "#XXXXXX"
   */
  $scope.getColor = function(well) {
    if(!well.name) return "#fff";
    return ColorManager.getColor(well.name);
  };

  // The restriction on the plate
  $scope.form = {
    letters: ['A','B','C','D','E','F','G','H'],
    columns: [1,2,3,4,5,6,7,8,9,10,11,12],
    time: {min:5, max:90},
    name: {max:64}
  };

  $scope.editedWell = new Well('A',1);

  // Watch the updates of editedWell to select the right Well in the plate
  $scope.$watch("editedWell", function(newValue, oldValue) {
    $scope.plate[oldValue.letter][oldValue.column].selected = false;
    $scope.plate[newValue.letter][newValue.column].selected = true;
  }, true);

  // Init the plate based on the form data
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
    $scope.editedWell.selected = true;
    $scope.plate[$scope.editedWell.letter][$scope.editedWell.column] = angular.copy($scope.editedWell);
  };

  /**
   * Clear and save the well at the plate location
   */
  $scope.clearWell = function() {
    $scope.editedWell = new Well($scope.editedWell.letter, $scope.editedWell.column);
    $scope.setWell();
  }

};


myApp.controller("main", ["$scope", "ColorManager", MainController]);
