describe("VendingMachineApp", function() {

  beforeEach(function() {
    module('vendingMachineApp')
  });

  describe("Controller", function() {

    beforeEach(inject(function ($controller) {
      this.scope = {};
      this.machine = jasmine.createSpyObj('machine', ['display', 'insertCoin']);
      this.machine.display.and.returnValue('foo');
      this.controller = $controller('VendingMachineController', { '$scope': this.scope, machine: this.machine });
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

});
