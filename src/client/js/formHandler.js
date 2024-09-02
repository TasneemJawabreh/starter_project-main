import { checkForUrl } from './urlChecker';

const serverURL = 'http://localhost:8000/api';

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL or city name from the input field
    const formText = document.getElementById('name').value;

    // If you want to check for a valid URL, uncomment the line below and use checkForUrl
    // if (!checkForUrl(formText)) {
    //     alert("Please enter a valid URL");
    //     return;
    // }

    // Send the data to the server
    fetch(serverURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formText })
    })
    .then(response => response.json())  // Properly handling the response
    .then(data => {
        console.log("Server response:", data);

        // Handle the response data
        document.getElementById('results').innerHTML = `Latitude: ${data.temperature}`;
        document.getElementById('results1').innerHTML = `Longitude: ${data.weatherDescription}`;


        
        // Clear the input field
        document.getElementById('name').value = "";
    })
    .catch(error => console.error("Error:", error));
}

// Export the handleSubmit function
export { handleSubmit };
