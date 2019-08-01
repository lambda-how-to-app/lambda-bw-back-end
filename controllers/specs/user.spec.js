const app = require('../../server/server');
const request = require('supertest')(app);
const mock = require('../../database/mock/auth.mock');
const hacks = require('../../database/mock/lifehack.mock');
const baseUrl = '/api/v1';

// eslint-disable-next-line no-unused-vars
let steps = {};
let user1Token = { data: [] };
let hack1 = {};
let hack2 = {};

let user2Token = { data: [] };
let user3Token = { data: [] };
let emptyToken = [];

describe('User Controller routes', () => {
  it('should signup user as guide', async () => {
    const res = await request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.validInput1);
    expect(res.statusCode).toBe(201);
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
    expect(res.statusCode).toBe(201);
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
    expect(res.statusCode).toBe(409);
    expect(res.body.success).toEqual(false);
    expect(res.body.message).toEqual('User with username Owen already exist');
  });
  it('should throw an error if the email has already been used by another user', async () => {
    const res = await request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.existingEmail);
    expect(res.statusCode).toBe(409);
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
    expect(res.statusCode).toBe(400);
    expect(res.body.check).toEqual({
      email: 'email field can not be blank',
      fullname: 'fullname field can not be blank',
      password: 'password field can not be blank',
      username: 'username field can not be blank'
    });
  });
  it('should throw an error if some fields are empty', async () => {
    const res = await request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.incompleteData);
    expect(res.statusCode).toBe(400);
    expect(res.body.check).toEqual({
      password: 'password field can not be blank'
    });
  });
  it('should throw an error if any email is invalid', async () => {
    const res = await request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.improperData);
    expect(res.statusCode).toBe(400);
    expect(res.body.check).toEqual({
      email: 'Invalid email',
      fullname: 'fullname can only be alphabetical',
      password: 'password must between 8 and 50 characters',
      username: 'username must be between 3 to 50 characters'
    });
  });
  it('it should login a registered guide', async () => {
    return request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.validInput1)
      .then(async () => {
        const res = await request
          .post(`${baseUrl}/auth/login`)
          .set('Content-Type', 'application/json')
          .send(mock.userOneLogin);
        user1Token.data = res.body.body.token;
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.body.token);
        expect(res.body.body.email).toEqual('banner@yahoo.com');
        expect(res.body.body.userName).toEqual('Banner');
        expect(res.body.body.guide).toEqual(true);
      });
  });
  it('it should login a registered user', async () => {
    return request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.validInput2)
      .then(async () => {
        const res = await request
          .post(`${baseUrl}/auth/login`)
          .set('Content-Type', 'application/json')
          .send(mock.userTwoLogin);
        user2Token.data = res.body.body.token;
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.body.token);
        expect(res.body.body.email).toEqual('mk@yahoo.com');
        expect(res.body.body.userName).toEqual('Owen');
        expect(res.body.body.guide).toEqual(false);
      });
  });
  it('it should register and login another guide ', async () => {
    return request
      .post(`${baseUrl}/auth/signup`)
      .set('Content-Type', 'application/json')
      .send(mock.validInput3)
      .then(async () => {
        const res = await request
          .post(`${baseUrl}/auth/login`)
          .set('Content-Type', 'application/json')
          .send(mock.guideLogin);
        user3Token.data = res.body.body.token;
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.body.token);
        expect(res.body.body.email).toEqual('frod@yahoo.com');
        expect(res.body.body.userName).toEqual('Bagins');
        expect(res.body.body.guide).toEqual(true);
      });
  });
  it('should not let unregistered users login', async () => {
    const res = await request
      .post(`${baseUrl}/auth/login`)
      .set('Content-Type', 'application/json')
      .send({ ...mock.unregisteredEmail, ...mock.newPassword });
    expect(res.statusCode).toBe(400);
  });
  it('should throw an error when email or username fields are empty', async () => {
    const res = await request
      .post(`${baseUrl}/auth/login`)
      .set('Content-Type', 'application/json')
      .send(mock.noEmail);
    expect(res.statusCode).toBe(400);
    expect(res.body.check).toEqual({
      input: 'input field can not be blank'
    });
  });

  it('should throw an error when password is empty', async () => {
    const res = await request
      .post(`${baseUrl}/auth/login`)
      .set('Content-Type', 'application/json')
      .send(mock.noPassword);
    expect(res.statusCode).toBe(400);
    expect(res.body.check).toEqual({
      password: 'password field can not be blank'
    });
  });

  it('should allow logged in users get all users', async () => {
    const res = await request
      .get(`${baseUrl}/users`)
      .set('Content-Type', 'application/json')
      .set('Authorization', user1Token.data);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Successfully retrieved all users');
  });

  it('should allow only logged in users get all lifehacks', async () => {
    const res = await request
      .get(`${baseUrl}/lifehack`)
      .set('Authorization', user1Token.data);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('LifeHacks retrieved Successfully');
  });
  it('should not allow unauthenticated users get all lifehacks', async () => {
    const res = await request
      .get(`${baseUrl}/lifehack`)
      .set('Authorization', emptyToken);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Access denied. You are not logged in');
  });
  it('should allow only logged in guides create lifehacks', async () => {
    const res = await request
      .post(`${baseUrl}/lifehack`)
      .set('Authorization', user1Token.data)
      .send(hacks.validInput1);
    hack1 = res.body.body;
    expect(res.statusCode).toBe(201);
  });
  it('should allow another logged in guide create lifehacks', async () => {
    const res = await request
      .post(`${baseUrl}/lifehack`)
      .set('Authorization', user3Token.data)
      .send(hacks.validInput3);
    hack2 = res.body.body;
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('LifeHack Created Successfully');
  });
  it('should not allow regular users create lifehacks', async () => {
    const res = await request
      .post(`${baseUrl}/lifehack`)
      .set('Authorization', user2Token.data)
      .send(hacks.validInput2);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('You Are Not Authorized');
  });
  it('should allow only logged in guides edit lifehacks', async () => {
    const res = await request
      .put(`${baseUrl}/lifehack/${hack1.id}`)
      .set('Authorization', user1Token.data)
      .send(hacks.validInput2);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Lifehack Updated Successfully');
  });
  it('should allow only logged in guides delete lifehacks', async () => {
    const res = await request
      .delete(`${baseUrl}/lifehack/${hack1.id}`)
      .set('Authorization', user1Token.data);
    expect(res.statusCode).toBe(200);
  });
  it('should allow other users delete guides they didnt create', async () => {
    const res = await request
      .delete(`${baseUrl}/lifehack/${hack2.id}`)
      .set('Authorization', user1Token.data);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('You Are Not Authorized');
  });
  it('should allow only logged in users get all steps for hacks', async () => {
    const res = await request
      .get(`${baseUrl}/steps`)
      .set('Authorization', user3Token.data);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Steps retrieved Successfully');
  });
  it('should allow only logged in guides add steps for hacks they created', async () => {
    const res = await request
      .post(`${baseUrl}/step/${hack2.id}/lifehack`)
      .set('Authorization', user3Token.data)
      .send(hacks.validStep1);
    steps = res.body;
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Step Added Successfully To Lifehack');
  });
  it('should get step for lifehacks', async () => {
    const res = await request
      .get(`${baseUrl}/step/${hack2.id}/lifehack`)
      .set('Authorization', user3Token.data);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(
      'Succesfully retrieved steps for selected hack'
    );
  });
});

module.exports = user1Token;
