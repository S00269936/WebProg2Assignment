import request from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/database";

beforeAll(async () => {
await connectDB();
});

describe('GET /rentals', () => {
    it('returns all rentals', async () => {
        const response = await request(app)
            .get('/api/v1/rentals');
            expect(response.status).toBe(200);
        });
    });