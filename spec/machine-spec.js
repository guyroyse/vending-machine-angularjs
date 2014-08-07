describe("Vending Machine", function() {

  beforeEach(function() {
    module('vendingMachineApp')
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

    });

  });

});
