import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' }); // make sure you have this if using a test .env

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});

  const user = await User.create({
    username: 'ReminderTester',
    email: 'reminder@example.com',
    password: 'password123' // should already be hashed by pre-save hook, or hash manually if needed
  });

  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Reminder Routes', () => {
  it('should send a reminder email', async () => {
    const res = await request(app)
      .post('/api/reminders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        jobTitle: 'Software Developer',
        date: '2025-08-10',
        note: 'Follow up with recruiter.'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Reminder email sent/i);
  });
});
