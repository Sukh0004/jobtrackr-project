import request from 'supertest';
import app from '../server.js';

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'testuser@example.com', password: 'testpass123' });

  token = res.body.token;
});

describe('Job Routes', () => {
  let jobId;

  test('POST /api/jobs - create job', async () => {
    const res = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Frontend Developer', company: 'Google', status: 'applied' });
    expect(res.statusCode).toBe(201);
    jobId = res.body._id;
  });

  test('GET /api/jobs - fetch jobs', async () => {
    const res = await request(app)
      .get('/api/jobs')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  test('DELETE /api/jobs/:id - delete job', async () => {
    const res = await request(app)
      .delete(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
