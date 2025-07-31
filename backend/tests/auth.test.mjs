import request from 'supertest';
import mongoose from 'mongoose';
import { createServer } from 'http';
import app from '../app.js'; // 
import User from '../models/User.js';

let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  server = createServer(app).listen(4001); // 
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close(); //
});

describe('Auth API', () => {
  test('registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('logs in an existing user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
