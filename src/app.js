const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geoCode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 5050

//Define paths for express Config
const publicDirPath = path.join(__dirname, '../public')
const ViewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handle bars engine 
app.set('view engine', 'hbs')
app.set('views', ViewPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather-app',
        name: 'Shreyash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shreyash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        HelpText: 'This is helpText',
        title: 'Help',
        name: 'Shreyash'
    });
})

app.get('/route', (req, res) => {
    res.send('<h1>ROUTE PAGE!!!!</h1>');
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "Address must be provided!!"
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                Error: error
            })
        }

        forecast(data.latitude, data.longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    Error:error
                })
            }
            res.send({
                Location:data.location,
                Forecast: forecastdata
            })

        })


    });


})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!!"
        })
    }
    console.log(req.query.search)

    res.send({
        product: []
    })
})



app.get('*', (req, res) => {
    res.send("My 404 Page")
})



app.listen(port, () => {
    console.log("Server is Up and running on " + port);
})