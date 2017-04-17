// Private
// var userCount = 0;
var response;
var builtResponse = {};

function QPXResponse(response) {
  this.response = response;
}

QPXResponse.prototype.getTotalNumberOfTrip = function() {
    this.builtResponse.numberOfTrips = this.response.trips.tripOption.length;
    return this.builtResponse.numberOfTrips;
};

QPXResponse.prototype.getResponse = function () {
  return JSON.stringify(this.builtResponse);
} ;




module.exports = QPXResponse;