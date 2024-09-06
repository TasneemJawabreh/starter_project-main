// Import the function to test
import { handleSubmit } from '../src/client/js/formHandler';

// Mock the fetch API globally
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

  afterEach(() => {
    // Clean up mocks
    jest.clearAllMocks();
  });

  test("should be defined", () => {
    // Check if the handleSubmit function is defined
    expect(handleSubmit).toBeDefined();
  });

  test('should call fetch with ', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ text: 'Mocked response text' }),
        })
    );

    // Mock event to prevent page reload
    const mockEvent = {
        preventDefault: jest.fn(),
    };

    // Call handleSubmit
    await handleSubmit(mockEvent);


  // Check that fetch was called with the correct arguments
  expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api', expect.objectContaining({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formText: "Paris", date: "2024-09-10" })
  }));

    // Clean up mock
    global.fetch.mockClear();
});
});
