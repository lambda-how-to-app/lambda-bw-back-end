const request = require('supertest');
const app = require('./server');

describe('server running', () => {
  it('[GET] / WORKS!', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toEqual({ status: 200, message: 'Welcome' });
      });
  });
  it('[GET] / Fails!', () => {
    return request(app)
      .get('/wrong')
      .expect(404);
  });
});
