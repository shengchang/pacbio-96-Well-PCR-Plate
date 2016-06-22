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
