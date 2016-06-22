'use strict';

describe('myApp', function() {
  beforeEach(module('myApp'));

  var colorManager;

  describe('ColorManager provider', function() {

    beforeEach(function() {
      inject(function(_ColorManager_) {
        colorManager = _ColorManager_
      })
    });

    it('should create valid color', function() {
      var color1 = colorManager.getColor('AA');
      expect(colorManager.getColor('AA')).toMatch(/#[01-9A-F]{6}/);
    });

    it('should create a new color with a new key', function() {
      var color1 = colorManager.getColor('AA');
      var color2 = colorManager.getColor('AB');
      expect(color1).not.toEqual(color2);
    });

    it('should return same color with same key', function() {
      var color1 = colorManager.getColor('AA');
      var color2 = colorManager.getColor('AA');
      expect(color1).toEqual(color2);
    });
  });
});