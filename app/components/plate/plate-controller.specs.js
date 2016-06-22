describe('myApp.PlateController', function() {

  beforeEach(module('myApp'));

  var PlateController;
  var scope;
  // Initialize the controller and a mock scope.
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    PlateController = $controller('PlateController', {
      $scope: scope
    });
  }));

  it('should init the plate', function() {
    expect(scope.plate).toBeDefined();
    expect(angular.isObject(scope.plate)).toBe(true);
  });

  it('should init the form to the first item in the plate', function() {
    expect(scope.editedWell).toBeDefined();
    expect(angular.isObject(scope.editedWell)).toBe(true);
    expect(scope.editedWell.letter).toBe('A');
    expect(scope.editedWell.column).toBe(1);
  });

  it('should save the data in the right Well', function() {
    setWell(scope, 'B', 3, 40, "AA");
    expect(scope.plate['B'][3].time).toBe(40);
    expect(scope.plate['B'][3].name).toBe('AA');
  });

  it('should select the Well currently in the form', function() {
    setWell(scope, 'B', 8);
    scope.$digest();
    expect(scope.plate['A'][1].selected).toBeFalsy();
    expect(scope.plate['B'][8].selected).toBeTruthy();
  });

  it('should get the Well and put it in the form', function() {
    scope.getWell(scope.plate['C'][5]);
    expect(scope.editedWell).toEqual(scope.plate['C'][5]);
    // It's a copy not a reference
    expect(scope.editedWell).not.toBe(scope.plate['C'][5]);
  });

  it('should remove all values of the Well when clear', function() {
    setWell(scope, 'D', 10, 10, "CC");
    scope.clearWell();
    expect(scope.plate['D'][10].time).toBeFalsy();
    expect(scope.plate['D'][10].name).toBeFalsy();
  });

  it('should return white color for empty Well', function() {
    expect(scope.getColor(scope.plate['D'][3])).toBe('#fff');
  });

  it('should return a random color a Well with a sample name', function() {
    setWell(scope, 'B', 4, 56, "AC");
    expect(scope.getColor(scope.plate['B'][4])).toMatch(/#[0-9A-F]{6}/);
  });

  function setWell(scope, letter, column, time, name) {
    scope.editedWell.letter = letter;
    scope.editedWell.column = column;
    scope.editedWell.time = time;
    scope.editedWell.name = name;
    scope.setWell();
  }
});