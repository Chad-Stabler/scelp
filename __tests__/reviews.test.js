const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const agent = request.agent(app);

// const UserService = require('../lib/services/UserService');

const mockUser = {
  email: 'admin@scelp.net',
  password: 'ayyoo',
  first_name: 'Jimmy',
  last_name: 'Kristo'
};

const mockReview = {
  stars: 4,
  detail: 'wooo'
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should post new review to restaurant', async () => {
    await agent.post('/api/v1/users').send(mockUser);

    const resp = await agent.post('/api/v1/restaurants/1/reviews').send(mockReview);
    
    expect(resp.status).toBe(200);
    expect(resp.body).toHaveProperty('stars', 4);
    expect(resp.body).toHaveProperty('detail', 'wooo');
  });
  it('should delete a review', async () => {
    await agent.post('/api/v1/users').send(mockUser);

    await agent.post('/api/v1/restaurants/1/reviews').send(mockReview);

    const resp = await agent.delete('/api/v1/reviews/6');

    expect(resp.status).toBe(200);
  });
  afterAll(() => {
    pool.end();
  });
});
