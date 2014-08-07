var app = angular.module('vendingMachineApp', []);

app.factory('storage', function() {

  var key = 'total';

  var self = {};

  self.set = function(value) {
    window.localStorage[key] = value;
  };

  self.get = function() {
    return window.localStorage[key] ? Number(window.localStorage[key]) : 0;
  };

  self.clear = function() {
    delete window.localStorage[key];
  }

  return self;

});

app.factory('machine', function(storage) {

  var coins = { NICKEL : 5, DIME : 10, QUARTER : 25 };

  var machine = {};

  machine.display = function() {
    return storage.get() === 0 ? "INSERT COIN" : (storage.get() / 100).toFixed(2);
  };

  machine.insertCoin = function(coin) {
    var value = coins[coin];
    if (value) storage.set(storage.get() + value);
  };

  machine.reset = function() {
    storage.clear();
  };

  return machine;

});

app.controller('VendingMachineController', function ($scope, machine) {

  $scope.display = machine.display();

  var insertCoin = function(coin) {
    machine.insertCoin(coin);
    $scope.display = machine.display();
  };

  $scope.nickelInserted = function() {
    insertCoin('NICKEL');
  };

  $scope.dimeInserted = function() {
    insertCoin('DIME');
  };

  $scope.quarterInserted = function() {
    insertCoin('QUARTER');
  };

  $scope.reset = function() {
    machine.reset();
    $scope.display = machine.display();
  }

});
