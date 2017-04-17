const express = require('express');
const superagent = require('superagent');
const QPX = require('./controllers/qpx/qpxResponse');

const app = express();
const PORT = 3000;


app.get('/', function (req, res) {
  res.send('yay, it\s working !');
});

app.post('/search', (req, res)=> {
    // query the Google API
    const bodyPost = {
        "request": {
            "slice": [
            {
                "origin": "ZRH",
                "destination": "DUS",
                "date": "2017-05-01"
            }
            ],
            "passengers": {
            "adultCount": 1,
            "infantInLapCount": 0,
            "infantInSeatCount": 0,
            "childCount": 0,
            "seniorCount": 0
            },
            "refundable": false
        }
    };
    
    // superagent.post('https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyANy1H2BotEqR7QyeSqSfpgX3svOB08wHc')
    //     .send(bodyPost)
    //     .then((output) => {
    //         // console.log(JSON.stringify(output.body));
            
            
    //         var flights = new QPX(output.body);
    //         console.log(flights.getTotalNumberOfTrip()); // .getResponse());

    //         res.status(200);
    //         res.send(output.body);
    //         res.end();
    //     })
    //     .catch((err) => {
    //         console.log('An error had occured : ' + err);
    //         res.end(err);
            
    //     });


    
    



});

app.listen(PORT, () => {
    console.log('Server is up and running on http://localhost:' + PORT);
});

