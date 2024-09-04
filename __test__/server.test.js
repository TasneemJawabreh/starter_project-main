// server.test.js
const request = require('supertest');
const app = require('../src/server/index'); // Adjust the path to your Express server

describe('Express Server', () => {
    it('should respond with JSON data', async () => {
        const response = await request(app)
            .post('/api')
            .send({ formText: 'Nablus', date: '2024-09-05' })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('country');
        expect(response.body).toHaveProperty('temperature');
        expect(response.body).toHaveProperty('weatherDescription');
        expect(response.body).toHaveProperty('imageUrl');
    });
});
