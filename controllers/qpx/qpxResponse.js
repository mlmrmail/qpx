// Private
// var userCount = 0;
'use strict';

const _ = require('lodash');

var response;
const fareDetails = '';
var builtResponse = {};

var airports = [];
var cities = [];
var aircrafts = [];
var carriers = [];
var taxes = [];

/**
 * Will initialise the object that is about to be parsed;
 * Param should be the body of the response received from the API call.
 * @param {*} response 
 */
function init(response) {
  if (_.isEmpty(response) || _.isUndefined(response) ) {
    throw new Error("The response object can't be empty");
  }
  this.response = response;
}

function getResponse() {
  return JSON.stringify(this.builtResponse);
};

function parseResponse() {
  return parseData(this.response);
};

function getAirports() {
  return airports;
}

function getAirportByCode(code) {
  let found = 0;
  _.forEach(airports, (airport) => {
    if (airport.code === code) {
      return false;
    }
    found += 1;
  });
  return airports[found];
}

function getCities() {
  return cities;
}

function getCityByCode(code) {
  let found = -1;
  let count = 0;
  _.forEach(cities, (city) => {
    if (city.code === code) {
      found = count;
      return false;
    }
    found += 1;
  });
  if (found !== -1) {
    return cities[found];
  } 
  return -1;

}

function getTaxes() {
  return taxes;
}

function getTaxByCode(code) {
  let found = -1;
  let count = 0;
  _.forEach(taxes, (tax) => {
    if (tax.id === code) {
      found = count;
      return false;
    }
    count += 1;
  });
  if (found !== -1) {
    return taxes[found]
  } 
  return -1;
}


function getCarriers() {
  return carriers;
}

function getCarrierByCode(code) {
  let found = -1;
  let count = 0;
  _.forEach(carriers, (carrier) => {
    if (carrier.code === code) {
      found = count;
      return false;
    }
    count += 1;
  });
  if (found !== -1) {
    return carriers[found]
  } 
  return -1;
}

function getAircrafts() {
  return aircrafts;
}

function getAircraftByCode(code) {
  let found = -1;
  let count = 0;
  _.forEach(aircrafts, (aircraft) => {
    if (aircraft.code === code) {
      found = count;
      return false;
    }
    count += 1;
  });
  if (found !== -1) {
    return aircrafts[found]
  } 
  return -1;
}


function parseData (response) {

  const data = response.trips.data;
  if(_.isUndefined(response) || _.isEmpty(response) || _.isUndefined(data) || _.isEmpty(data) ) {
    throw new Error('Invalid response received');
  }

  _.forEach(data.airport, (airport) => {
    delete airport.kind;
    airports.push(airport);
  }); 

  _.forEach(data.city, (city) => {
    delete city.kind;
    cities.push(city);
  }); 

  _.forEach(data.aircraft, (aircraft) => {
    delete aircraft.kind;
    aircrafts.push(aircraft);
  }); 

  _.forEach(data.tax, (tax) => {
    delete tax.kind;
    taxes.push(tax);
  });     

  _.forEach(data.carrier, (carrier) => {
    delete carrier.kind;
    carriers.push(carrier);
  });     


  return 0;
}



module.exports = {
  init,
  getAirportByCode,
  getAirports,
  getCities,
  getCityByCode,
  getTaxes,
  getTaxByCode,
  parseResponse,
  getResponse,
  getCarriers,
  getCarrierByCode,
  getAircrafts,
  getAircraftByCode,
};