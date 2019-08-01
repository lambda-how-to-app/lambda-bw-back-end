const app = require('../server/server');
const request = require('supertest')(app);
const mock = require('../database/mock/signup.mock');
const baseUrl = '/api/v1';
describe('User Controller routes', () => {
  it('should signup user as guide', async () => {
    const res = await request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.validInput1);
    expect(201);
    expect(res.body.success).toEqual(true);
    expect(res.body.body.token);
    expect(res.body.body.email).toEqual('banner@yahoo.com');
    expect(res.body.body.userName).toEqual('Banner');
    expect(res.body.body.guide).toEqual(true);
  });
  it('should signup user as regular user', async () => {
    const res = await request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.validInput2);
    expect(201);
    expect(res.body.success).toEqual(true);
    expect(res.body.body.token);
    expect(res.body.body.email).toEqual('mk@yahoo.com');
    expect(res.body.body.userName).toEqual('Owen');
    expect(res.body.body.guide).toEqual(false);
  });
  it('should throw an error if the username has already been used by another user', async () => {
    const res = await request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.existingUsername);
    expect(res.status).toEqual(409);
    expect(res.body.success).toEqual(false);
    expect(res.body.message).toEqual('User with username Owen already exist');
  });
  it('should throw an error if the email has already been used by another user', async () => {
    const res = await request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.existingEmail);
    expect(409);
    expect(res.body.success).toEqual(false);
    expect(res.body.message).toEqual(
      'User with email banner@yahoo.com already exist'
    );
  });
  it('should throw an error if any field is empty', async () => {
    const res = await request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.emptyData);
    expect(res.body.check).toMatchObject({
      email: 'email field can not be blank',
      fullname: 'fullname field can not be blank',
      password: 'password field can not be blank',
      username: 'username field can not be blank'
    });
  });
  it('should throw an error if any email is invalid', async () => {
    const res = await request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.improperData);
    expect(res.body.success);
  });
});
