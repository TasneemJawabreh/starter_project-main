const request = require('supertest');
const { app, server } = require('../src/server/index'); // Adjust path as needed

describe('POST /api', () => {
    afterAll((done) => {
        server.close(done); // Close the server after tests are done
    });

    it('should respond with weather data', async () => {
        const response = await request(app)
            .post('/api')
            .send({ formText: 'New York', date: '2024-09-10' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('temperature');
        expect(response.body).toHaveProperty('weatherDescription');
        expect(response.body).toHaveProperty('imageUrl');
        expect(response.body).toHaveProperty('country');
    });
});
