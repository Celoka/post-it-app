/**
 * Import module dependencies
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;


describe('Sign up route', () => {
  it('should create a new user successfully', (done) => {
    const newUser = {
      email: 'telon56@yahoo.com',
      password: 'Asorock1',
      userName: 'TelonXXX',
      phoneNumber: '2347045112430'
    };
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).to.eql('Registration success');
        expect(res.body.isConfirmed).to.eql(true);
        expect(res.body).to.have.property('jwtToken');
        if (err) return done();
        done();
      });
  });

  it('should require an email when its not provided', (done) => {
    const userTest = {
      email: '',
      password: 'andela24344',
      userName: 'Andelan',
      phoneNumber: '23490335425425'
    };
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Email is required');
        if (err) return done();
        done();
      });
  });

  it('should require a password when its not provided', (done) => {
    const userTest = {
      email: 'test@test.com',
      password: '',
      userName: 'Andelan',
      phoneNumber: '090335425425'
    };
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Password is required');
        if (err) return done();
        done();
      });
  });
  it('should require password character not to be less than 5', (done) => {
    const userTest = {
      email: 'test@test.com',
      password: 'jhh',
      userName: 'Andelan',
      phoneNumber: '090335425425'
    };
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message)
          .to.eql('Password must be at least 6 character and contain number');
        if (err) return done();
        done();
      });
  });

  it('should require a valid email input', (done) => {
    const userTest = {
      email: 'test',
      password: 'andela24344',
      userName: 'Andelan',
      phoneNumber: '090335425425'
    };
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Invalid email format');
        if (err) return done();
        done();
      });
  });

  it('should require a username input', (done) => {
    const userTest = {
      email: 'andela2@yahoo.com',
      password: 'andela24344',
      userName: '',
      phoneNumber: '090335425425'
    };
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Username is required');
        if (err) return done();
        done();
      });
  });

  it('should not register an existing user', (done) => {
    const userTest = {
      email: 'johnholt@yahoo.com',
      password: 'Asorock1',
      userName: 'Johndf',
      phoneNumber: '2347032337153'
    };
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body.message).to.eql('Email is already in use');
        if (err) return done();
        done();
      });
  });
  it('should not register user with username conflict', (done) => {
    chai.request(server)
      .post('/api/v1/user/signup')
      .send({
        email: 'johndoee@yahoo.com',
        password: 'Asorock1',
        userName: 'John',
        phoneNumber: '2347032337155'
      })
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body.message).to.eql('Username already exists');
        if (err) return done();
        done();
      });
  });
  it('should not register duplicate phone number', (done) => {
    chai.request(server)
      .post('/api/v1/user/signup')
      .send({
        email: 'johnhofdddlt@yahoo.com',
        password: 'Asorock1',
        userName: 'Johnn',
        phoneNumber: '2347034224614'
      })
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body.message).to.eql('Phone number already exists');
        if (err) return done();
        done();
      });
  });
  it('should require a phone number', (done) => {
    const userTest = {
      email: 'lurline_windler@hotmail.com',
      password: 'vsZdfjNe7RG1JHC',
      userName: 'Hiram_ondricka',
      phoneNumber: ''
    };
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Phone number is required');
        if (err) return done();
        done();
      });
  });
});
describe('Sign in route', () => {
  it('should successfully sign in a resgistered user', (done) => {
    const userTest = {
      email: 'west@yahoo.com',
      password: 'Asorock1',
    };
    chai.request(server)
      .post('/api/v1/user/signin')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('User Signed in!');
        expect(res.body.user.uid).to.eql('po9DB2rZMzVW3KiLeYJMK0zjBeh1');
        expect(res.body.user.email).to.eql('west@yahoo.com');
        expect(res.body.isConfirmed).to.eql(true);
        if (err) return done();
        done();
      });
  });
  it('should require an email to sign in', (done) => {
    const userTest = {
      email: '',
      password: 'Asorock1'
    };
    chai.request(server)
      .post('/api/v1/user/signin')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Email is required');
        if (err) return done();
        done();
      });
  });
  it('should require a valid email format', (done) => {
    const userTest = {
      email: 'test@..',
      password: 'Asorock1'
    };
    chai.request(server)
      .post('/api/v1/user/signin')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('Invalid email format');
        if (err) return done();
        done();
      });
  });
  it('should require a password', (done) => {
    const userTest = {
      email: 'test@yahoo.com',
      password: ''
    };
    chai.request(server)
      .post('/api/v1/user/signin')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Password is required');
        if (err) return done();
        done();
      });
  });
  it('should require password not to be less than 5', (done) => {
    const userTest = {
      email: 'test@yahoo.com',
      password: 'erty'
    };
    chai.request(server)
      .post('/api/v1/user/signin')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message)
          .to.eql('Password must be at least 6 character and contain number');
        if (err) return done();
        done();
      });
  });
  it('should require a correct password', (done) => {
    const userTest = {
      email: 'johnholt@yahoo.com',
      password: 'Asorock11',
    };
    chai.request(server)
      .post('/api/v1/user/signin')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Wrong password');
        if (err) return done();
        done();
      });
  });
  it('should require a valid input credentials', (done) => {
    const userTest = {
      email: 'keneddy@yahoo.com',
      password: 'Asorock1',
    };
    chai.request(server)
      .post('/api/v1/user/signin')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message)
          .to.eql('The email or password you entered is incorrect');
        if (err) return done();
        done();
      });
  });
});

describe('Google SignIn Route', () => {
  it('should redirect a first time google user for update', (done) => {
    const googleUser = {
      email: 'andelaTest@yahoo.com',
      uid: '4hceOknjZ1eZvYhYgidCaP09erh5',
      userName: 'Andela Test'
    };
    chai.request(server)
      .post('/api/v1/user/googlesignin')
      .send(googleUser)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('Another step is required ');
        expect(res.body.isConfirmed).to.eql(false);
        expect(res.body).to.have.property('jwtToken');
        if (err) return done();
        done();
      });
  });
  it('should sign in a user in successfully', (done) => {
    const googleUser = {
      email: 'west@yahoo.com',
      uid: 'po9DB2rZMzVW3KiLeYJMK0zjBeh1',
      userName: 'West'
    };
    chai.request(server)
      .post('/api/v1/user/googlesignin')
      .send(googleUser)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('Login successful');
        expect(res.body.isConfirmed).to.eql(true);
        expect(res.body).to.have.property('jwtToken');
        if (err) return done();
        done();
      });
  });
  it('should require email of a google user', (done) => {
    const googleUser = {
      email: '',
      uid: '4hceOknjZ1eZvYhYgidCaP09edH2',
      userName: 'John'
    };
    chai.request(server)
      .post('/api/v1/user/googlesignin')
      .send(googleUser)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Email is required');
        if (err) return done();
        done();
      });
  });
  it('should require a valid email of a google user', (done) => {
    const googleUser = {
      email: 'hhfhfhh@hf',
      uid: 'JK5rSTmxjRMf5nBTUi008oKx95k2',
      userName: 'Hiram_ondricka'
    };
    chai.request(server)
      .post('/api/v1/user/googlesignin')
      .send(googleUser)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Invalid email format');
        if (err) return done();
        done();
      });
  });
  it('should require Id of a google user', (done) => {
    const googleUser = {
      email: 'Lurline_Windler@hotmail.com',
      uid: '',
      userName: 'Hiram_ondricka'
    };
    chai.request(server)
      .post('/api/v1/user/googlesignin')
      .send(googleUser)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('This field cannot be empty');
        if (err) return done();
        done();
      });
  });
  it('should require user name of a google user', (done) => {
    const googleUser = {
      email: 'Lurline_Windler@hotmail.com',
      uid: 'JK5rSTmxjRMf5nBTUi008oKx95k2',
      userName: ''
    };
    chai.request(server)
      .post('/api/v1/user/googlesignin')
      .send(googleUser)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Username is required');
        if (err) return done();
        done();
      });
  });
});

describe('Google Update Route', () => {
  it('should sign in a google user successfully after phonenumber update',
    (done) => {
      const googleUser = {
        phoneNumber: '2347032337234',
        uid: 'MBoDQwaBXOQzXQYw0mh6374Q2R5try',
        displayName: 'CyndyX',
        email: 'cyndyfg@gmail.com',
      };
      chai.request(server)
        .post('/api/v1/user/googleupdate')
        .send(googleUser)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.eql('Update was succcessful');
          expect(res.body.isConfirmed).to.eql(true);
          expect(res.body).to.have.property('jwtToken');
          if (err) return done();
          done();
        });
    });
  it('should require a google user phone number', (done) => {
    const googleUser = {
      phoneNumber: '',
      uid: 'yryyrt773664',
      displayName: 'Cyndy',
      email: 'cyndycrawford@yahoo.com',
    };
    chai.request(server)
      .post('/api/v1/user/googleupdate')
      .send(googleUser)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Phone number is required');
        if (err) return done();
        done();
      });
  });
  it('should require a google user username ', (done) => {
    const googleUser = {
      phoneNumber: '2347032337154',
      uid: 'yryyrt773664',
      displayName: '',
      email: 'email@yahoo.com',
    };
    chai.request(server)
      .post('/api/v1/user/googleupdate')
      .send(googleUser)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Displayname is required');
        if (err) return done();
        done();
      });
  });
  it('should require a google user user name not to be less than 3', (done) => {
    const googleUser = {
      phoneNumber: '2347032337154',
      uid: 'yryyrt773664',
      displayName: 'ee',
      email: 'email@yahoo.com'
    };
    chai.request(server)
      .post('/api/v1/user/googleupdate')
      .send(googleUser)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message)
          .to.eql('Display name should be at least 3 characters');
        if (err) return done();
        done();
      });
  });
  it('should require a google user email', (done) => {
    const googleUser = {
      phoneNumber: '2347032337154',
      uid: 'yryyrt773664',
      displayName: 'eeee',
      email: '',
    };
    chai.request(server)
      .post('/api/v1/user/googleupdate')
      .send(googleUser)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Email is required');
        if (err) return done();
        done();
      });
  });
});

describe('Password reset route', () => {
  it('should send a password reset link to a registered member',
    (done) => {
      const userTest = {
        email: 'post-it@yahoo.com'
      };
      chai.request(server)
        .post('/api/v1/user/passwordreset')
        .send(userTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.message).to.eql('Reset link sent succesfully');
          if (err) return done();
          done();
        });
    });
  it('should not send a link to an unregistered user', (done) => {
    const userTest = {
      email: 'test2333@yahoo.com'
    };
    chai.request(server)
      .post('/api/v1/user/passwordreset')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message)
          .to.eql('User email not found');
        if (err) return done();
        done();
      });
  });
  it('should not send a link to an invalid email address', (done) => {
    const userTest = {
      email: 'test2333com'
    };
    chai.request(server)
      .post('/api/v1/user/passwordreset')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Invalid email format');
        if (err) return done();
        done();
      });
  });
  it('should require an email address', (done) => {
    const userTest = {
      email: ''
    };
    chai.request(server)
      .post('/api/v1/user/passwordreset')
      .send(userTest)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Email is required');
        if (err) return done();
        done();
      });
  });
});

describe('Sign out route', () => {
  before((done) => {
    chai.request(server)
      .post('api/v1/users/signin')
      .send({
        email: 'johndoe@yahoo.com',
        password: 'Asorock1',
      })
      .end(() => {
        done();
      });
  });
  it('should successfully signout a logged in user', (done) => {
    chai.request(server)
      .post('/api/v1/user/signout')
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('Signed out!');
        if (err) return done();
        done();
      });
  });
});
