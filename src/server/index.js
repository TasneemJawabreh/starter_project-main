const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});
console.log(`Your API key is ${process.env.API_KEY}`);
const weatherbitAPIKey=process.env.API_KEY;
app.post('/api', async (req, res) => {
    const { formText: city } = req.body;
    const geonamesUsername = 'tasneem01'; // Replace with your Geonames username

    try {
        const response = await axios.get('http://api.geonames.org/searchJSON', {
            params: {
                q: city,
                maxRows: 1,
                username: geonamesUsername,
            },
        });

        const data = response.data;
        console.log(data);
        const lat= data.geonames[0].lat;
        const lng= data.geonames[0].lng;
       


        const weatherResponse = await axios.get('https://api.weatherbit.io/v2.0/current', {
            params: {
                lat:lat,
                lon: lng,
                key: weatherbitAPIKey,
            },
        });

        const weatherData = weatherResponse.data.data[0];


        // Respond with both location and weather data
         console.log("data",weatherData);
         const pixabayAPIKey = process.env.PIXABAY_KEY;
         const response1 = await axios.get('https://pixabay.com/api/', {
            params: {
                key: pixabayAPIKey,
                q: encodeURIComponent(weatherData.weather.description),
                image_type: 'photo',
            },
        });
        const imageUrl = response1.data.hits[0].webformatURL;
        console.log(imageUrl);

        res.json({
            temperature: weatherData.temp,
            weatherDescription: weatherData.weather.description,
           });


      
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to fetch coordinates", details: error.message });
    }
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});
