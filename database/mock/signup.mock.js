module.exports = {
  validInput1: {
    fullname: 'Bruce',
    username: 'Banner',
    email: 'banner@yahoo.com',
    password: 'bruce banner',
    profileimage: 'bruce.png',
    guide: true
  },
  validInput2: {
    fullname: 'Mike',
    username: 'Owen',
    email: 'mk@yahoo.com',
    password: 'ulor mike',
    profileimage: 'mybro.png',
    guide: false
  },
  existingUsername: {
    fullname: 'Dave',
    username: 'Owen',
    email: 'dave@yahoo.com',
    password: 'dave 1234',
    profileimage: 'mybro.png',
    guide: true
  },

  existingEmail: {
    fullname: 'Barry',
    username: 'Allen',
    email: 'banner@yahoo.com',
    password: 'theFlash',
    profileimage: 'Barry.png'
  },
  incompleteData: {
    fullname: 'Anna',
    username: 'Jones',
    email: 'annie@yahoo.com'
  },
  emptyData: {
    fullname: '',
    username: '',
    email: '',
    password: '',
    profileimage: ''
  },
  improperData: {
    fullname: '23BruceBanner',
    username: 'J',
    email: 'bannery',
    password: 'bruce',
    profileimage: 'Mike'
  },
  unregisteredEmail: {
    email: 'notreg@getMaxListeners.com'
  },
  registeredEmail: {
    email: 'banner@yahoo.com'
  },
  newPassword: {
    password: 'abcdefghij'
  },
  userOneLogin: { email: 'banner@yahoo.com', password: 'bruce banner' },
  userTwoLogin: { email: 'mk@yahoo.com', password: 'ulor mike' },
  adminLogin: { email: 'admin@andela.com', password: '12345' },
  emptyLoginData: { email: '', password: '' },
  noEmail: { email: '', password: 'bruce banner' },
  noPassword: { email: 'mk@yahoo.com', password: '' },
  invalidEmail: { email: 'wrongEmail', password: 'bruce banner' },
  invalidPassword: { email: 'Bruce Banner', password: 'wrongPassword' },
  invalidEmailPassword: { email: 'wrongEmail', password: 'wrongPassword' }
};
