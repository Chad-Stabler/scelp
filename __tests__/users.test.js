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
  });
  afterAll(() => {
    pool.end();
  });
});
