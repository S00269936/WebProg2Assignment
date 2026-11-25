import request from 'supertest';
import { app } from '../../src/app';
import { connectDB } from '../../src/config/database';

beforeAll(async () => {
  await connectDB();
});

describe('User Integration Tests', () => {

  it('GET /users returns all users', async () => {
    const response = await request(app).get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /users rejects an invalid email', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John',
        email: 'invalidemail',
        password: 'Password123'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });

  it('POST /users rejects a short password', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John',
        email: 'john@example.com',
        password: '123'
      });

    expect(response.status).toBe(400);
  });

  it('PUT /users/:id rejects an invalid email', async () => {
    const response = await request(app)
      .put('/api/v1/users/507f1f77bcf86cd799439011')
      .send({
        email: 'invalidemail'
      });

    expect(response.status).toBe(400);
  });

});
