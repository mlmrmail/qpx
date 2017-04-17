const _ = require('lodash');
const input = require('./outpout');

function getTotalNumberOfSolutions(response) {
    return response.trips.tripOption.length;
}


function getDetailsOfSolution(response, solutionNmber) {
    let tripDetails = {};
    let currentTrip =  response.trips.tripOption[solutionNmber];
    tripDetails.totalPrice = currentTrip.saleTotal;
    _.forEach(currentTrip.slice, (slice) => {

        console.log('new segment : ' + slice.segment[0].leg[0].origin + ' to ' + slice.segment[slice.segment.length-1].leg[slice.segment[slice.segment.length-1].leg.length-1].destination + ' duration = ' + slice.duration);
        _.forEach(slice.segment, (segment) => {
            
            _.forEach(segment.leg, (leg) => {
                console.log(leg.origin + ' time = ' + leg.departureTime + ' --> ' + leg.destination + ' time = ' + leg.arrivalTime  +  ' duration = ' + leg.duration + ' cnx = ' + (leg.connectionDuration || '') );
            })
            console.log('time in between segment' + segment.connectionDuration);
        })
        
    })

    return '';
}


function isOneWay(response) {
    return response.trips.tripOption[20].slice.length;
}


// console.log(getTotalNumberOfSolutions(input.jsonOutputOneWay()));
console.log(JSON.stringify(getDetailsOfSolution(input.jsonOutputTwoWay(),0)));




// console.log(input.jsonOutputOneWay());