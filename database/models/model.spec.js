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
  it('should return a single user by email,username or id', async () => {
    let usersByUsername = await userModel.findSingleUser({
      username: createdUser.username
    });
    let usersById = await userModel.findSingleUser({ id: createdUser.id });
    let usersByEmail = await userModel.findSingleUser({
      email: createdUser.email
    });
    expect(usersByUsername).toMatchObject(usersByUsername);
    expect(usersById).toMatchObject(usersById);
    expect(usersByEmail).toMatchObject(usersByEmail);
  });
  it('should get all users profile by type', async () => {
    let type1 = 'users';
    let type2 = 'guides';
    let allusers = await userModel.findAllProfile();
    let users = await userModel.findAllProfile(type1);
    let guides = await userModel.findAllProfile(type2);
    expect(allusers).toMatchObject(allusers);
    expect(users).toMatchObject(users);
    expect(guides).toMatchObject(guides);
  });
});
