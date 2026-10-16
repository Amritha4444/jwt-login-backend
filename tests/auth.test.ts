
const request = require('supertest');
const app = require('../src/app').default;
const { describe, it, expect } = require('@jest/globals');

describe('JWT Authentication API', () => {
  const uniqueEmail = `test-${Date.now()}@example.com`;
  const password = 'test123';

  it('should reject an invalid email with 400', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'wrong-email', password });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should reject a short password with 400', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ email: uniqueEmail, password: '123' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should register a new user with 201', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ email: uniqueEmail, password });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(uniqueEmail);
  });

  it('should reject a duplicate email with 409', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ email: uniqueEmail, password });

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
  });

  it('should reject login with an incorrect password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: uniqueEmail, password: 'wrong123' });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('should reject /me without a token', async () => {
    const response = await request(app).get('/api/auth/me');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('should allow /me with a valid token', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: uniqueEmail, password });

    expect(loginResponse.status).toBe(200);

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});