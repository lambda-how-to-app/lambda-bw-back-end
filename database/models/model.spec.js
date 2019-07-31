const db = require('../dbConfig');
const userModel = require('./model');
const hackModel = require('./lifeHackModel');

// const duplicateHack = {
//   guide_id: 12,
//   title: 'Legal Assistant',
//   banner_image:
//     'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
// };

let createdHack = {};

const user = {
  username: 'john',
  email: 'john@gmail.com',
  password: '$2y$12$eY9IzXa96Qfaar61tOHnT.27ExyCJhlFnk4jR2ZOUzTaeEDO2D.46',
  guide: true
};

let createdUser = {};
let newGuide = {};

beforeAll(async () => {
  await db.raw(
    'TRUNCATE TABLE authenticatedusers,lifehacks, hacksteps CASCADE'
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
  it('should create guides profile', async () => {
    const guideProfile = {
      fullname: 'Averill Giddons',
      auth_id: createdUser.id,
      location_id: 6,
      profileimage:
        'https://image.shutterstock.com/image-photo/passport-photo-portrait-asian-smiling-260nw-1045734418.jpg'
    };
    let newGuide = await userModel.addProfile(guideProfile, createdUser.id);
    expect(newGuide).toMatchObject(guideProfile);
  });

  it('Should create new hack', async () => {
    let guide = await db('guides');
    expect(guide).toMatchObject(guide);
    const validHack = {
      guide_id: guide[0].id,
      title: 'Python',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    createdHack = await hackModel.addHack(validHack);
    expect(createdHack).toMatchObject(validHack);
  });

  it('should return all lifehacks', async () => {
    let hacks = await hackModel.getAllHacks();
    expect(hacks).toMatchObject(hacks);
  });
});
