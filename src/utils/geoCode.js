const request = require("request")

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hyZXlhc2hkaGFuZ2FyZSIsImEiOiJja29vNmp1ODEwNzVoMnBtb2h4c2JqdjViIn0.Z3644PcZ_mgs9mYwKx4Z3Q&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services');
        }
        else if (response.body.features.length === 0) {
            callback('Location not FOUND!!!!');
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;