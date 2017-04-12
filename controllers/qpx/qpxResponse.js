// Private
var userCount = 0;
var response;
var builtResponse;

function depositeMinusFee(num1) {
  return num1 - 0.1;
}


function QPXResponse(response) {
  this.response = response;
}

// User.prototype.togglePaid = function() {
//   this._paid = !this._paid;
// };

// User.prototype.userType = function() {
//   if(this._paid) return 'Paid User';
//   else           return 'Free User';
// };

// User.prototype.addBalance = function(amount) {
//   this.balance += depositeMinusFee(amount);
// };




QPXResponse.prototype.getTotalNumberOfTrip = function() {
    builtResponse.numberOfTrips = this.response.trips.tripOption.length;
    return this.response.trips.tripOption.length;
};

QPXResponse.prototype.getResponse = function () {
  return JSON.stringify(this.builtResponse);
} ;




module.exports = QPXResponse;