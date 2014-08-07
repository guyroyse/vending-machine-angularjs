describe("VendingMachineApp", function() {

  beforeEach(function() {
    module('vendingMachineApp')
  });

  describe("Controller", function() {

    beforeEach(inject(function ($controller, machine) {
      this.scope = {};
      this.machine = machine;
      spyOn(machine, 'display').and.returnValue('foo');
      spyOn(machine, 'insertCoin');
      this.controller = $controller('VendingMachineController', { '$scope': this.scope, machine: machine });
    }));

    it("adds machine display to the scope", function() {
      expect(this.scope.display).toBe('foo');
      expect(this.machine.display.calls.count()).toBe(1);
    });

    when("inserting coins", function() {

      beforeEach(function() {
        this.machine.display.and.returnValue('bar');
        this.scope.nickelInserted();
        this.scope.dimeInserted();
        this.scope.quarterInserted();
      });

      it("updates the display from the machine", function() {
        expect(this.scope.display).toBe('bar');
        expect(this.machine.display.calls.count()).toBe(4);
      });

    });

    when("inserting a NICKEL", function() {

      beforeEach(function() {
        this.scope.nickelInserted();
      });

      it("inserts a NICKEL in the this.machine", function() {
        expect(this.machine.insertCoin).toHaveBeenCalledWith('NICKEL');
      });

    });

    when("inserting a DIME", function() {

      beforeEach(function() {
        this.scope.dimeInserted();
      });

      it("inserts a DIME in the machine", function() {
        expect(this.machine.insertCoin).toHaveBeenCalledWith('DIME');
      });

    });

    when("inserting a QUARTER", function() {

      beforeEach(function() {
        this.scope.quarterInserted();
      });

      it("inserts a QUARTER in the machine", function() {
        expect(this.machine.insertCoin).toHaveBeenCalledWith('QUARTER');
      });

    });

  });

  describe("Machine", function() {

    beforeEach(inject(function(storage, machine) {
      this.storage = storage;
      this.machine = machine;
    }));

    when("there is no balance", function() {

      beforeEach(function() {
        spyOn(this.storage, 'get').and.returnValue(0);
      });

      it("displays INSERT COIN", function() {
        expect(this.machine.display()).toBe('INSERT COIN');
      });

    });

    when("there is a balance", function() {

      beforeEach(function() {
        spyOn(this.storage, 'get').and.returnValue(50);
      });

      it("displays the balance", function() {
        expect(this.machine.display()).toBe('0.50');
      });

    });

    when("reset", function() {

      beforeEach(function() {
        spyOn(this.storage, 'clear');
        this.machine.reset();
      });

      it("clears the balance", function() {
        expect(this.storage.clear).toHaveBeenCalledWith();
      });

    });

    when("a coin is inserted", function() {

      var STARTING_BALANCE = 5;

      beforeEach(function() {
        spyOn(this.storage, 'set');
        spyOn(this.storage, 'get').and.returnValue(STARTING_BALANCE);
      });

      and("it is a NICKEL", function() {

        beforeEach(function() {
          this.machine.insertCoin('NICKEL');
        });

        it("adds a NICKEL to the balance", function() {
          expect(this.storage.set).toHaveBeenCalledWith(STARTING_BALANCE + 5);
        });

      });

      and("it is a DIME", function() {

        beforeEach(function() {
          this.machine.insertCoin('DIME');
        });

        it("adds a DIME to the balance", function() {
          expect(this.storage.set).toHaveBeenCalledWith(STARTING_BALANCE + 10);
        });

      });

      and("it is a QUARTER", function() {

        beforeEach(function() {
          this.machine.insertCoin('QUARTER');
        });

        it("adds a QUARTER to the balance", function() {
          expect(this.storage.set).toHaveBeenCalledWith(STARTING_BALANCE + 25);
        });

      });

      and("it is invalid", function() {

        beforeEach(function() {
          this.machine.insertCoin('QUARTER');
        });

        it("adds nothing to the balance", function() {
          expect(this.storage.set).not.toHaveBeenCalledWith();
        });

      });

    });

  });

});
