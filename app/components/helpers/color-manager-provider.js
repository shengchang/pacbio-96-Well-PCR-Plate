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