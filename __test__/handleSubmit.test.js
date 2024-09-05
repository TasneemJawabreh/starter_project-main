// Import the function to test
import { handleSubmit } from '../src/client/js/formHandler';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      temperature: 25,
      weatherDescription: "Clear sky",
      imageUrl: "https://example.com/image.jpg",
      country: "France"
    }),
  })
);

describe("handleSubmit", () => {
  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = `
      <input id="name" value="Paris" />
      <input id="date" value="2024-09-10" />
      <div id="country"></div>
      <div id="temperature"></div>
      <div id="weatherDescription"></div>
      <div id="image-container"></div>
    `;
  });

  test("should update the DOM elements with the server response", async () => {
    const event = { preventDefault: jest.fn() }; // Mock event

    // Await the handleSubmit call to ensure async execution completes
    await handleSubmit(event);

    // Check that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formText: "Paris", date: "2024-09-10" })
    }));

    // Verify DOM updates
    expect(document.getElementById('country').innerHTML).toBe('My trip to: France,Paris');
    expect(document.getElementById('temperature').innerHTML).toBe('temperature: 25');
    expect(document.getElementById('weatherDescription').innerHTML).toBe('weather Description: Clear sky');

    // Check that the image is added to the DOM
    const img = document.querySelector('#image-container img');
    expect(img).not.toBeNull();
    expect(img.src).toBe("https://example.com/image.jpg");
    //expect(img.width).toBe(300);
  });
});
