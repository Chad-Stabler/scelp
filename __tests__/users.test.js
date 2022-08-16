const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// const UserService = require('../lib/services/UserService');

const mockUser = {
  email: 'thisdude@thatguy.com',
  password: 'ayyoo',
  first_name: 'Jimmy',
  last_name: 'Kristo'
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should create user, return token', async () => {
    const resp = await request(app).post('/api/v1/users').send(mockUser);
    expect(resp.status).toBe(200);
    expect(resp.body.message).toBe('Account created successfully');
  });
  it('sign in user should sign a user in', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ first_name: mockUser.first_name, last_name: mockUser.last_name ,email: mockUser.email, password: mockUser.password });
    expect(res.status).toEqual(200);
  });
  it('sign out should delete session', async () => {
    const user = await request(app).post('/api/v1/users').send(mockUser);
    expect(user.status).toBe(200);
    expect(user.body.message).toBe('Account created successfully');

    const resp = await request(app).delete('/api/v1/users/sessions');
    expect(resp.status).toBe(204);
  });
  afterAll(() => {
    pool.end();
  });
});
