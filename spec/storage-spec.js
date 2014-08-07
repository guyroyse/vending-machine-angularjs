describe("Vending Machine", function() {

  beforeEach(function() {
    module('vendingMachineApp')
  });

  describe("Storage", function() {

    beforeEach(inject(function(storage) {
      this.storage = storage;
    }));

    when("set to a value", function() {

      beforeEach(function() {
        this.storage.set(50);
      });

      it("retains that value", function() {
        expect(this.storage.get()).toBe(50);
      });

      when("cleared", function() {

        beforeEach(function() {
          this.storage.clear();
        });

        it("has a value of 0", function() {
          expect(this.storage.get()).toBe(0);
        });

      });

    })

  });

});
