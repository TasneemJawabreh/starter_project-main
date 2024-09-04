

const serverURL = 'http://localhost:8000/api';

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL or city name from the input field
    const formText = document.getElementById('name').value;
    const date = document.getElementById('date').value;
console.log(date);


    // Send the data to the server
    fetch(serverURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formText,date })
    })
    .then(response => response.json())  // Properly handling the response
    .then(data => {
        console.log("Server response:", data);

        // Handle the response data
        document.getElementById('country').innerHTML = `My trip to: ${data.country},${formText}`;
        //document.getElementById('date1').innerHTML = `date: ${date}`;
        document.getElementById('temperature').innerHTML = `temperature: ${data.temperature}`;
        document.getElementById('weatherDescription').innerHTML = `weather Description: ${data.weatherDescription}`;
        const imageUrl = data.imageUrl;

        const container = document.getElementById('image-container');
        // Remove the existing image if there is one
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        // Create a new img element
        const img = document.createElement('img');

        img.src = imageUrl;

        img.width = 300; 

        // Append the img element to a container in your HTML
        container.appendChild(img);

        
        // Clear the input field
        document.getElementById('name').value = "";
    })
    .catch(error => console.error("Error:", error));
}

// Export the handleSubmit function
export { handleSubmit };
