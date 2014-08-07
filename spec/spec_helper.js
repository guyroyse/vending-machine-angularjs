var when = function(description, callback) {
  describe('when '.concat(description), callback);
};

var and = function(description, callback) {
  describe('and '.concat(description), callback);
};
