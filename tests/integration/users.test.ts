import request from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/database";

beforeAll(async () => {
await connectDB();
});

describe('GET /users', () => {
    it('returns all users', async () => {
        const response = await request(app)
            .get('/api/v1/users');
            expect(response.status).toBe(200);
        });
    });