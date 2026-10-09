import request from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/database";

beforeAll(async () => {
await connectDB();
});

describe('GET /bikes', () => {
    it('returns all bikes', async () => {
        const response = await request(app)
            .get('/api/v1/bikes');
            expect(response.status).toBe(200);
        });
    });