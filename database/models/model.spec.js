const db = require('../dbConfig');
const userModel = require('./model');
const hackModel = require('./lifeHackModel');

let createdHack = {};

const user = {
  username: 'john',
  email: 'john@gmail.com',
  password: '$2y$12$eY9IzXa96Qfaar61tOHnT.27ExyCJhlFnk4jR2ZOUzTaeEDO2D.46',
  guide: true
};

let createdUser = {};

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
    const validHack = {
      guide_auth_id: createdUser.id,
      title: 'Python',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    createdHack = await hackModel.addHack(validHack);
    expect(createdHack).toMatchObject(validHack);
  });

  it('Should not create hack if title already exists in database', async () => {
    const validHack = {
      guide_auth_id: createdUser.id,
      title: 'Python',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    createdHack = await hackModel.addHack(validHack);
    expect(createdHack).toEqual({
      status: 409,
      mesage: 'Lifehack with this title already exist'
    });
  });

  it('should return all lifehacks', async () => {
    let hacks = await hackModel.getAllHacks();
    expect(hacks).toMatchObject(hacks);
  });
  it('should update an existing hack uniquely', async () => {
    const update = {
      guide_auth_id: createdUser.id,
      title: 'Java',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    const updateHack = await hackModel.addHack(update);
    expect(updateHack).toMatchObject(update);
  });
  it('should not update if input already exist in database', async () => {
    const update = {
      guide_auth_id: createdUser.id,
      title: 'Python',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    const updateHack = await hackModel.addHack(update);
    expect(updateHack).toMatchObject({
      status: 409,
      mesage: 'Lifehack with this title already exist'
    });
  });
});
