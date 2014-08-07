var app = angular.module('vendingMachineApp', []);

app.factory('machine', function() {

  var coins = { NICKEL : 5, DIME : 10, QUARTER : 25 };

  var total = function() {
    return window.localStorage.total ? new Number(window.localStorage.total) : 0;
  };

  var addToTotal = function(value) {
    window.localStorage.total = total() + value;
  };

  var machine = {};

  machine.display = function() {
    return total() === 0 ? "INSERT COIN" : (total() / 100).toFixed(2);
  };

  machine.insertCoin = function(coin) {
    var value = coins[coin];
    if (value) addToTotal(value);
  };

  machine.reset = function() {
    delete localStorage.total;
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
