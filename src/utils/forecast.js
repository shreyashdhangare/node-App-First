const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=36b16a27bf0166b398d6ad64bdef7e0b&query='+latitude+','+longitude;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the internet!!");
        }
        else if (response.body.error) {
            callback(response.body.error.info);
        }
        else {
            callback(undefined, 
                 response.body.current.weather_descriptions[0]+
                 "current temp : " +  response.body.current.temperature+
                 " feelsLike : " + response.body.current.feelslike
            )
        }
    })

}

module.exports = forecast