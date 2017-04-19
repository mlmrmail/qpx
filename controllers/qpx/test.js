const _ = require('lodash');
const input = require('./outpout');
const superagent = require('superagent');

// function getTotalNumberOfSolutions(response) {
//   return response.trips.tripOption.length;
// }

// function getDetailsOfSolution(response, solutionNumber) {
//   let tripDetails = {};
//   let currentTrip = response.trips.tripOption[solutionNumber];
//   tripDetails.totalPrice = currentTrip.saleTotal;
//   _.forEach(currentTrip.slice, slice => {
//     console.log(
//       'new segment : ' +
//         slice.segment[0].leg[0].origin +
//         ' to ' +
//         slice.segment[slice.segment.length - 1].leg[
//           slice.segment[slice.segment.length - 1].leg.length - 1
//         ].destination +
//         ' duration = ' +
//         slice.duration,
//     );
//     _.forEach(slice.segment, segment => {
//       _.forEach(segment.leg, leg => {
//         console.log(
//           leg.origin +
//             ' time = ' +
//             leg.departureTime +
//             ' --> ' +
//             leg.destination +
//             ' time = ' +
//             leg.arrivalTime +
//             ' duration = ' +
//             leg.duration +
//             ' cnx = ' +
//             (leg.connectionDuration || ''),
//         );
//       });
//       console.log('time in between segment' + segment.connectionDuration);
//     });
//   });

//   return '';
// }

// function isOneWay(response) {
//   return response.trips.tripOption[20].slice.length;
// }

// function getTotalNumberOfStop(response, solutionNumber, sliceNumber) {
//   const slices = response.trips.tripOption[solutionNumber].slice[sliceNumber];
//   if (slices.segment.length > 2) {
//     return slices.segment.length - 2;
//   } else if (slices.segment.length === 2) {
//     return 1;
//   } else {
//     return 0;
//   }
// }

function getSliceDetails(response, solutionNumber, sliceNumber) {
  const slice = response.trips.tripOption[solutionNumber].slice[sliceNumber];
  let sliceDetails = {};
  let currentSegment = [];
  let tempObj = {};

  sliceDetails.totalTripDuration = slice.duration;
  sliceDetails.origin = slice.segment[0].leg[0].origin;
  sliceDetails.destination = slice.segment[slice.segment.length - 1].leg[
    slice.segment[slice.segment.length - 1].leg.length - 1
  ].destination;
  sliceDetails.baseFareTotal = response.trips.tripOption[solutionNumber].pricing[0].baseFareTotal;
  sliceDetails.saleFareTotal = response.trips.tripOption[solutionNumber].pricing[0].saleFareTotal;
  sliceDetails.saleTaxTotal = response.trips.tripOption[solutionNumber].pricing[0].saleTaxTotal;
  sliceDetails.saleTotal = response.trips.tripOption[solutionNumber].pricing[0].saleTotal;
  sliceDetails.passengers = response.trips.tripOption[solutionNumber].pricing[0].passengers;
  delete sliceDetails.passengers.kind;
  sliceDetails.fareCalculation = response.trips.tripOption[solutionNumber].pricing[0].fareCalculation;
  _.forEach(slice.segment, segment => {
    _.forEach(segment.leg, leg => {
      tempObj.flight = getDataEntitytPropertyValue(response, dataType.properties[dataType.CARRIER].name, segment.flight.carrier).name + ' ' + segment.flight.carrier + ' ' + segment.flight.number;
      tempObj.segmentId = segment.id;
      tempObj.origin = leg.origin;
      tempObj.originFull = getDataEntitytPropertyValue(response, dataType.properties[dataType.CITIES].name, leg.origin).name;
      tempObj.departureTime = leg.departureTime;
      tempObj.originTerminal = leg.originTerminal;
      tempObj.destination = leg.destination;
      tempObj.destinationFull = getDataEntitytPropertyValue(response, dataType.properties[dataType.CITIES].name, leg.destination).name;
      tempObj.arrivalTime = leg.arrivalTime;
      tempObj.destinationTerminal = leg.destinationTerminal;
      tempObj.duration = leg.duration;
      tempObj.mileage = leg.mileage;
      tempObj.changePlane = leg.changePlane || false;
      tempObj.connectionDuration = leg.connectionDuration ||
        segment.connectionDuration;
      tempObj.meal = leg.meal;
      tempObj.secure = leg.secure || false;
      tempObj.id = leg.id;
      tempObj.aircraft = getDataEntitytPropertyValue(response, dataType.properties[dataType.AIRCRAFT].name, leg.aircraft).name;
      tempObj.cabin = segment.cabin;
      tempObj.baggages = getBaggagesDetails(response, solutionNumber, segment.id);
    });
    currentSegment.push(tempObj);
    tempObj = {};
  });

  // console.log(currentSegment);
  sliceDetails.flightSteps = currentSegment;
  console.log(sliceDetails);
  console.log('\n\n\n\n');
  return sliceDetails;
}

function getBaggagesDetails(response, solutionNumber, id) {
  let baggages = {};
  const pricing = response.trips.tripOption[solutionNumber].pricing[0];

  _.forEach(pricing.segmentPricing, baggage => {
    if (baggage.segmentId === id) {
      if (
        !_.isEmpty(baggage.freeBaggageOption) &&
        !_.isUndefined(baggage.freeBaggageOption) &&
        _.isArray(baggage.freeBaggageOption)
      ) {
        baggages.kilos = baggage.freeBaggageOption[0].kilos;
        baggages.kilosPerPiece = baggage.freeBaggageOption[0].kilosPerPiece;
        baggages.pieces = baggage.freeBaggageOption[0].pieces;
        baggages.pounds = baggage.freeBaggageOption[0].pounds;
        return false;
      }
    }
  });

  return baggages;
}

const dataType = {
  AIRPORTS: 1,
  CITIES: 2,
  AIRCRAFT: 3,
  TAX: 4,
  CARRIER: 5,
  properties: {
    1: {name: 'airport'},
    2: {name: 'city'},
    3: {name: 'aircraft'},
    4: {name: 'tax'},
    5: {name: 'carrier'},
  },
};

function getDataEntity(response, entityType) {
  if (!_.isEmpty(entityType) || !_.isUndefined(entityType)) {
    if (
      !_.isEmpty(response.trips.data[entityType]) &&
      (!_.isUndefined(response.trips.data[entityType]) &&
        _.isArray(response.trips.data[entityType]))
    ) {
      return response.trips.data[entityType];
    }
  } else {
    return {};
  }
}

function getDataEntitytPropertyValue(response, entityType, entitySearch) {
  const dataEntity = getDataEntity(response, entityType);
  let found = false;
  let matchedEntity;
  let key = 'code';
  let keyVal;

  _.forEach(dataEntity, entity => {
    if (entityType === 'tax') {
      keyVal = entity.id.toUpperCase();
    } else {
      keyVal = entity.code.toUpperCase();
    }

    if (keyVal === entitySearch.toUpperCase()) {
      found = true;
      matchedEntity = entity;
      return false;
    }
  });

  if (!found) {
    // console.log('Not found!!!');
    return {};
  } else {
    // console.log(matchedEntity[returnProperty]);
    return matchedEntity;
  }
}

function getStarted(request) {
//   const bodyPost = {
//     request: {
//       slice: [
//         {
//           origin: 'ZRH',
//           destination: 'DUS',
//           date: '2017-05-01',
//         },
//       ],
//       passengers: {
//         adultCount: 1,
//         infantInLapCount: 0,
//         infantInSeatCount: 0,
//         childCount: 0,
//         seniorCount: 0,
//       },
//       solutions: 20,
//       refundable: false,
//     },
//   };
  superagent
    .post('https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyANy1H2BotEqR7QyeSqSfpgX3svOB08wHc')
    .send(request)
    .then(output => {
      const response = output.body;
      console.log(JSON.stringify(response));
      // res.end(output);
      console.log('\n\n\n\n');
      let solPos = 0;
      let slicePos = 0;
      let arr = [];
      _.forEach(response.trips.tripOption, solution => {
        _.forEach(solution.slice, slice => {
          arr.push(getSliceDetails(response, solPos, slicePos));
          slicePos += 1;
        });
        slicePos = 0;
        solPos += 1;
      });

      console.log(arr);
    })
    .catch(err => {
      // res.end(err);
      console.log('An error had occured : ' + err);
    });
}


// function getStarted() {

//       let solPos = 0;
//       let slicePos = 0;
//       let arr = [];
//       _.forEach(res.trips.tripOption, (solution) => {
//         _.forEach(solution.slice, slice => {
//           arr.push(getSliceDetails(res, solPos, slicePos));
//           slicePos += 1;
//         });
//         slicePos = 0;
//         solPos += 1;
//       });

//        console.log(arr);
// }


// console.log( getSliceDetails(input.jsonOutputTwoWay(),0,0));
// console.log(getTotalNumberOfSolutions(input.jsonOutputOneWay()));
// console.log(JSON.stringify(getDetailsOfSolution(input.jsonOutputTwoWay(),0)));
const req = {
  request: {
    slice: [
      {
        origin: 'MSY',
        destination: 'BOS',
        date: '2017-04-18',
      },
      {
        origin: 'BOS',
        destination: 'LAS',
        date: '2017-04-19',
      },
    ],
    passengers: {
      adultCount: 1,
      infantInLapCount: 0,
      infantInSeatCount: 0,
      childCount: 0,
      seniorCount: 0,
    },
    solutions: 1,
    refundable: false,
  },
};


getStarted(req);
// console.log(input.jsonOutputOneWay());
