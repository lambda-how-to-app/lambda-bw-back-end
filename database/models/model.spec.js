const db = require('../dbConfig');
const userModel = require('./model');
const hackModel = require('./lifeHackModel');

let createdHack = {};

const user = {
  fullname: 'Cordy Skala',
  profileimage:
    'https://image.shutterstock.com/image-photo/passport-photo-portrait-asian-smiling-260nw-1045734418.jpg',
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
    let usersByRole = await userModel.findSingleUser({
      guide: createdUser.guide
    });
    expect(usersByUsername).toMatchObject(usersByUsername);
    expect(usersById).toMatchObject(usersById);
    expect(usersByEmail).toMatchObject(usersByEmail);
    expect(usersByRole).toMatchObject(usersByRole);
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
    const newHack = {
      guide_auth_id: createdUser.id,
      title: 'Laravel',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    let Hack = await hackModel.addHack(newHack);
    const update = {
      title: 'Java',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    const updateHack = await hackModel.updateHack(update, Hack.id);
    expect(updateHack).toMatchObject(update);
  });
  it('should delete a selected lifehack', async () => {
    const newHack = {
      guide_auth_id: createdUser.id,
      title: 'Laravel',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    let Hack = await hackModel.addHack(newHack);
    const deletion = await hackModel.deleteHack(Hack.id);
    expect(deletion).toBeTruthy();
  });
  it('should create step for an existing hack', async () => {
    const newHack = {
      guide_auth_id: createdUser.id,
      title: 'Laravel',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    let Hack = await hackModel.addHack(newHack);
    expect(Hack).toMatchObject(newHack);
    const newStep = {
      steps: 'Any thing yo wanna say'
    };
    let addedStep = await hackModel.addStep({ ...newStep, hack_id: Hack.id });
    expect(addedStep).toMatchObject({ ...newStep, hack_id: Hack.id });
  });
  it('should get all steps for an existing life hack', async () => {
    const newHack = {
      guide_auth_id: createdUser.id,
      title: 'Ruby',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    let Hack = await hackModel.addHack(newHack);
    expect(Hack).toMatchObject(newHack);
    const newStep = {
      steps: 'install ruby on rails'
    };
    await hackModel.addStep({ ...newStep, hack_id: Hack.id });
    let steps = await hackModel.getStepsForSingleHack(Hack.id);
    expect(steps).toMatchObject(steps);
  });
  it('should update a step for an existing life hack', async () => {
    const newHack = {
      guide_auth_id: createdUser.id,
      title: 'Flask',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    let Hack = await hackModel.addHack(newHack);
    expect(Hack).toMatchObject(newHack);
    const newStep = {
      steps: 'install flask for python'
    };
    let addedStep = await hackModel.addStep({ ...newStep, hack_id: Hack.id });
    const stepUpdate = {
      steps: 'Update installed ruby on rails'
    };
    let steps = await hackModel.updateStep(stepUpdate, addedStep.id);
    expect(steps).toMatchObject(stepUpdate);
  });

  it('should delete a selected step', async () => {
    const newHack = {
      guide_auth_id: createdUser.id,
      title: 'PHP',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    let Hack = await hackModel.addHack(newHack);
    expect(Hack).toMatchObject(newHack);
    const newStep = {
      steps: 'install WAMP or MAMP'
    };
    let addedStep = await hackModel.addStep({ ...newStep, hack_id: Hack.id });
    const deletion = await hackModel.deleteStep(addedStep.id);
    expect(deletion).toBeTruthy();
  });
  it('should get all steps', async () => {
    let steps = await hackModel.getAllSteps();
    expect(steps).toMatchObject(steps);
  });
  it('should get a single step', async () => {
    const newHack = {
      guide_auth_id: createdUser.id,
      title: 'Baking Cake',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    let Hack = await hackModel.addHack(newHack);
    const newStep = {
      steps: 'install WAMP or MAMP'
    };
    let addedStep = await hackModel.addStep({ ...newStep, hack_id: Hack.id });
    let step = await hackModel.getSingleStep({ id: addedStep.id });
    expect(step).toMatchObject(step);
  });
  it('should save hack for a user', async () => {
    const newHack = {
      guide_auth_id: createdUser.id,
      title: 'Cake',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    let Hack = await hackModel.addHack(newHack);
    let save = await userModel.saveHack({
      user_id: createdUser.id,
      post_id: Hack.id
    });
    expect(save).toMatchObject(save);
  });
  it('should add reviews for a specific lifehack', async () => {
    const newHack = {
      guide_auth_id: createdUser.id,
      title: 'Money',
      banner_image:
        'https://static.boredpanda.com/blog/wp-content/uuuploads/life-hacks/life-hacks-1.jpg'
    };
    let Hack = await hackModel.addHack(newHack);

    let review = await userModel.addReview({
      user_id: createdUser.id,
      post_id: Hack.id,
      review: 'I love this life',
      rating: 4,
      like: true
    });
    expect(review).toMatchObject(review);
  });
});
