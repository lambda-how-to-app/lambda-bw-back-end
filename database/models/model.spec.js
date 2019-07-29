const db = require('../dbConfig');
const userModel = require('./model');

beforeEach(async () => {
  await db('authenticatedUsers').truncate();
});
describe('Test case for database', () => {
  it('should return no user if database is empty', async () => {
    let users = await userModel.findAuthUser();
    expect(users).toMatchObject({});
  });
  it('should create a new user', async () => {
    let users = await userModel.findAuthUser();
    expect(users).toMatchObject({});

    await userModel.addUser({
      username: 'pascal',
      email: 'pascal@.gov',
      password: '$2y$12$eY9IzXa96Qfaar61tOHnT.27ExyCJhlFnk4jR2ZOUzTaeEDO2D.46',
      guide: true
    });
    let user = await userModel.findAuthUser();
    expect(user).toHaveLength(1);
    expect(user).toMatchObject([
      {
        username: 'pascal',
        email: 'pascal@.gov',
        password:
          '$2y$12$eY9IzXa96Qfaar61tOHnT.27ExyCJhlFnk4jR2ZOUzTaeEDO2D.46',
        guide: true
      }
    ]);
  });
});
