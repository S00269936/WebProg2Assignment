import request from 'supertest';
import { app } from '../../src/app';
import { connectDB } from '../../src/config/database';

beforeAll(async () => {
  await connectDB();
});

describe('Rental Integration Tests', () => {

  it('GET /rentals returns all rentals', async () => {
    const response = await request(app).get('/api/v1/rentals');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /rentals rejects missing required fields', async () => {
    const response = await request(app)
      .post('/api/v1/rentals')
      .send({
        customerName: 'John'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });

  it('POST /rentals rejects an empty request', async () => {
    const response = await request(app)
      .post('/api/v1/rentals')
      .send({});

    expect(response.status).toBe(400);
  });

});
