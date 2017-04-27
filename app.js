const express = require('express');
const superagent = require('superagent');
const QPX = require('./controllers/qpx/qpxResponse');

const output = require('./controllers/qpx/yy');
// const app = express();
// const PORT = 3000;


// app.get('/', function (req, res) {
//   res.send('yay, it\s working !');
// });

// app.post('/search', (req, res)=> {
//     // query the Google API
    // const bodyPost = {
    //     "request": {
    //         "slice": [
    //         {
    //             "origin": "ZRH",
    //             "destination": "DUS",
    //             "date": "2017-05-01"
    //         }
    //         ],
    //         "passengers": {
    //         "adultCount": 1,
    //         "infantInLapCount": 0,
    //         "infantInSeatCount": 0,
    //         "childCount": 0,
    //         "seniorCount": 0
    //     },
    //         "solution": 2,
    //         "refundable": false
    //     }
    // };
    
    // console.log('start procesing ...');


    // superagent.post('https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyANy1H2BotEqR7QyeSqSfpgX3svOB08wHc')
    //     .send(bodyPost)
    //     .then((output) => {
            // console.log(JSON.stringify(output.body));
            
            
            // const flights = QPX(output);





//          console.log(flights.getAirports());
//             console.log(flights.getAirportByCode('DUB').name);                                    
// console.log(flights.getAirports());
//             console.log(flights.getAirportByCode('DUB').name);            



            // console.log(flights.getTotalNumberOfTrip()); // .getResponse());

            // res.status(200);
            // res.send(output.body);
            // res.end();
        // })
        // .catch((err) => {
        //     console.log('An error had occured : ' + err);
        //     res.end(err);
            
        // });

// });

// app.listen(PORT, () => {
//     console.log('Server is up and running on http://localhost:' + PORT);
// });

            
            // console.log(QPX.getAirports());
            // console.log(QPX.getAirportByCode('DUB').name);
            // console.log(QPX.getCities());
            // console.log(QPX.getCityByCode('FRA').name);
            // console.log(QPX.getTaxes());
            // console.log(QPX.getTaxByCode('UB_001').name);

function startApp() {
    try {
        QPX.init(output);
        QPX.parseResponse();
        // console.log(QPX.getAirports());
        console.log(QPX.getAirportByCode('DUB').name);
        // console.log(QPX.getCities());
        console.log(QPX.getCityByCode('FRA').name);
        // console.log(QPX.getTaxes());
        console.log(QPX.getTaxByCode('UB_001').name);
        // console.log(QPX.getCarriers());
        console.log(QPX.getCarrierByCode('BA').name);
        // console.log(QPX.getAircrafts());
        console.log(QPX.getAircraftByCode('321').name);

    } catch (error) {
        console.log(error.message);
    }    
}


startApp();
console.log('end processing');