import request from 'supertest';
import { app } from '../../src/app';
import { connectDB } from '../../src/config/database';

beforeAll(async () => {
  await connectDB();
});

describe('Bike Integration Tests', () => {

  it('GET /bikes returns all bikes', async () => {
    const response = await request(app).get('/api/v1/bikes');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /bikes creates a valid bike', async () => {
    const response = await request(app)
      .post('/api/v1/bikes')
      .send({
        bikeName: 'Test Bike',
        type: 'Mountain',
        pricePerHour: 5,
        pricePerDay: 20
      });

    expect(response.status).toBe(201);
    expect(response.body.bikeName).toBe('Test Bike');
  });

  it('POST /bikes rejects missing bikeName', async () => {
    const response = await request(app)
      .post('/api/v1/bikes')
      .send({
        type: 'Mountain',
        pricePerHour: 5,
        pricePerDay: 20
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });

  it('POST /bikes rejects invalid price', async () => {
    const response = await request(app)
      .post('/api/v1/bikes')
      .send({
        bikeName: 'Test Bike',
        type: 'Mountain',
        pricePerHour: 'invalid',
        pricePerDay: 20
      });

    expect(response.status).toBe(400);
  });

});
