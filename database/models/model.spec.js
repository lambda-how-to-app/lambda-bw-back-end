const db = require('../dbConfig');
const userModel = require('./model');

const user = {
  username: 'john',
  email: 'john@gmail.com',
  password: '$2y$12$eY9IzXa96Qfaar61tOHnT.27ExyCJhlFnk4jR2ZOUzTaeEDO2D.46',
  guide: true
};

let createdUser = {};

beforeAll(async () => {
  await db.raw(
    'TRUNCATE TABLE authenticatedusers, users, guides, locations CASCADE'
  );
});

describe('Test case for user table', () => {
  it('Should create new user', async () => {
    createdUser = await userModel.addUser(user);
    expect(createdUser).toMatchObject(user);
  });

  it('should return all users', async () => {
    let users = await userModel.findAuthUser();
    expect(users).toMatchObject(users);
  });
  it('should return a single user by username or id', async () => {
    let usersByUsername = await userModel.findByUsername(createdUser.username);
    let usersById = await userModel.findById(createdUser.id);
    expect(usersByUsername).toMatchObject(usersByUsername);
    expect(usersById).toMatchObject(usersById);
  });
});
