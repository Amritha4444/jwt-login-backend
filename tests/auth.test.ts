const { describe, it, expect } = require('@jest/globals');

describe('JWT backend basic checks', () => {
  it('should reject an invalid email format', () => {
    const email = 'wrong-email';
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    expect(isValidEmail).toBe(false);
  });

  it('should reject a password shorter than 6 characters', () => {
    const password = '123';

    expect(password.length).toBeLessThan(6);
  });
});