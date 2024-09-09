# Weather-Journal App Project
## Table of Contents

- [description](#description)
- [usage](#usage)
- [Dependencies](#Dependencies)
- [License](#License)
## description
This project is a web application that integrates multiple APIs to retrieve geographical, weather, and image data for a travel planning tool. The app allows users to input a city name and travel date, then fetches the latitude, longitude, and country information using the Geonames API. Additionally, it pulls weather data from the Weatherbit API, offering both current and forecasted weather based on the travel date. An image representing the destination or weather is retrieved from the Pixabay API.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: Version 20.11.0

## usage
### 1-run the project
By using package.json to install and start the project.use `npm i` then `npm run build-dev ` open another terminal and run `npm run build-prod` then ` npm run start`. 
### 2-Open the Project in a Browser
you can access the Web App usining this url `http://localhost:8000` 
### 3-test the project
you can test the app using different urls or by runing  `npm run test`.


## Dependencies
This project is built using JavaScript, HTML, and CSS, and the following Dependencies: 
### 1-Webpack
### 2-Express
### 3-Jest
### 4-Dotenv
### 5-Babel
### 6-Cors

## API Credentials

This project requires API credentials to interact with the Geonames, Weatherbit, and Pixabay APIs. You will need to sign up for each service, obtain the API keys, and update them in the project before running the application.

### 1. Geonames API
- Sign up at [Geonames](https://www.geonames.org/) to get your API key (username).
- Update the `GEONAME_USERNAME` variable in your `.env` file with your Geonames username.

### 2. Weatherbit API
- Create an account at [Weatherbit](https://www.weatherbit.io/) to get your API key.
- Update the `API_KEY` variable in your `.env` file with your Weatherbit API key.

### 3. Pixabay API
- Register at [Pixabay](https://pixabay.com/api/docs/) to obtain your API key.
- Update the `PIXABAY_KEY` variable in your `.env` file with your Pixabay API key.

## License
This project is licensed under the MIT License - see the `LICENSE.txt` file for details.

