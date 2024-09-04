// Import the js file to test
import { handleSubmit } from "../src/client/js/formHandler";

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Server response" }),
  })
);

describe("Testing the submit functionality", () => {
  // Set up the DOM before each test
  beforeEach(() => {
    // Create a form and input elements for testing
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" type="text" value="https://example.com" />
      </form>
    `;

    // Clear previous mock calls before each test
    fetch.mockClear();
  });
  afterEach(() => {
   
    jest.clearAllMocks();
});

  test("should be defined", () => {
    // Check if the handleSubmit function is defined
    expect(handleSubmit).toBeDefined();
  });

  test('should call fetch with the correct URL and method when a valid URL is provided', async () => {
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

    // Assert fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formText: 'https://example.com' }),
    });

    // Clean up mock
    global.fetch.mockClear();
});


});
