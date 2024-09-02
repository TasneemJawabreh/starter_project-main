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

       
            res.json({
                lat: data.geonames[0].lat,
                lng: data.geonames[0].lng,
            });
      
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to fetch coordinates", details: error.message });
    }
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});
