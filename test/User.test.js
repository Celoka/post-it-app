/**
 * Import module dependcies
 */

import chaiHttp from 'chai-http';
import faker from 'faker';
import chai from 'chai';
import server from '../server/server';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

const newUser = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  username: faker.internet.userName(),
  phonenumber: faker.phone.phoneNumber()
};


describe('Sign up route', () => {
  it('should create a new user', (done) => {
    chai.request(server)
      .post('/api/v1/user/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Registration success');
        expect(res.body.userDetails[0]).to.haveOwnPropertyDescriptor('email');
        expect(res.body.userDetails[0]).to.haveOwnPropertyDescriptor('uid');
        expect(res.body).to.have.property('token');
        expect(res.req.method).to.equal('POST');
        expect(res.req.path).to.equal('/api/v1/user/signup');
        expect(res.body).to.be.an('object');
        if (err) return done();
        done();
      });
  });

  it('should require an email', (done) => {
    const userTest = {
      email: '',
      password: 'andela24344',
      username: 'Andelan',
      phonenumber: '090335425425'
    };
    chai.request(server)
    .post('/api/v1/user/signup')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.path).to.equal('/api/v1/user/signup');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.a('object');
      expect(res.text).to.equal('{"message":"Email is required"}');
      expect(res.body.message).to.equal('Email is required');
      if (err) return done();
      done();
    });
  });

  xit('should require a password', (done) => {
    const userTest = {
      email: 'test@test.com',
      password: '',
      username: 'Andelan',
      phonenumber: '090335425425'
    };
    chai.request(server)
    .post('/api/v1/user/signup')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.path).to.equal('/api/v1/user/signup');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.a('object');
      expect(res.text).to.equal('{"message":"Password is required"}');
      expect(res.body.message).to.equal('Password is required');
      if (err) return done();
      done();
    });
  });
  it('should require password character not to be less than 5', (done) => {
    const userTest = {
      email: 'test@test.com',
      password: 'jhh',
      username: 'Andelan',
      phonenumber: '090335425425'
    };
    chai.request(server)
    .post('/api/v1/user/signup')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.path).to.equal('/api/v1/user/signup');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.a('object');
      expect(res.text).to.equal(
        '{"message":"Password must be at least 6 character and contain number"}'
      );
      expect(res.body.message).to.equal(
        'Password must be at least 6 character and contain number'
      );
      if (err) return done();
      done();
    });
  });

  it('should require a valid email input', (done) => {
    const userTest = {
      email: 'test',
      password: 'andela24344',
      username: 'Andelan',
      phonenumber: '090335425425'
    };
    chai.request(server)
    .post('/api/v1/user/signup')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.path).to.equal('/api/v1/user/signup');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.a('object');
      expect(res.text).to.equal('{"message":"Bad email format"}');
      expect(res.body.message).to.equal('Bad email format');
      if (err) return done();
      done();
    });
  });

  it('should should require a username input', (done) => {
    const userTest = {
      email: 'andela2@yahoo.com',
      password: 'andela24344',
      username: '',
      phonenumber: '090335425425'
    };
    chai.request(server)
    .post('/api/v1/user/signup')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.path).to.equal('/api/v1/user/signup');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.a('object');
      expect(res.text).to.equal('{"message":"Username is required"}');
      expect(res.body.message).to.equal('Username is required');
      if (err) return done();
      done();
    });
  });

  it('should not create a user with existing email', (done) => {
    const userTest = {
      email: 'ebuka@yahoo.com',
      password: 'Asorock1',
      username: 'Ebuka',
      phonenumber: '+2347032337154'
    };
    chai.request(server)
    .post('/api/v1/user/signup')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(401);
      expect(res.res.statusMessage).to.equal('Unauthorized');
      expect(res.req.path).to.equal('/api/v1/user/signup');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.a('object');
      expect(res.text).to.equal('{"message":"Email already in use"}');
      expect(res.body.message).to.equal('Email already in use');
      if (err) return done();
      done();
    });
  });
});

describe('Sign in route', () => {
  it('should successfully sign in a resgistered user', (done) => {
    const userTest = {
      email: 'eloka.chima@gmail.com',
      password: 'Asorock1',
    };
    chai.request(server)
    .post('/api/v1/user/signin')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.res.statusMessage).to.equal('OK');
      expect(res.req.path).to.equal('/api/v1/user/signin');
      expect(res.req.method).to.equal('POST');
      expect(res.body.message).to.equal('User Signed in!');
      res.body.userDetails[0].email.should.equal('ebuka@yahoo.com');
      res.body.userId.should.equal('f9TGDZzckNhTxr4KakHiChiAVYP2');
      expect(res.body.userDetails[0]).to.haveOwnProperty('uid');
      expect(res.body.userDetails[0]).to.haveOwnProperty('email');
      expect(res.body.userDetails[0]).to.haveOwnProperty('phoneNumber');
      expect(res.body.userDetails[0]).to.haveOwnProperty('providerId');
      expect(res.body).to.have.property('userId');
      expect(res.body).to.have.property('token');
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
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.path).to.equal('/api/v1/user/signin');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Email is required');
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
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.path).to.equal('/api/v1/user/signin');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.an('object');
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
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.path).to.equal('/api/v1/user/signin');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Password is required');
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
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.path).to.equal('/api/v1/user/signin');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal(
        'Password must be at least 6 character and contain number'
      );
      if (err) return done();
      done();
    });
  });
});

describe('Reset password route', () => {
  it('should successfully send a rest link password to a user', (done) => {
    const userTest = {
      email: 'ebuka@yahoo.com'
    };
    chai.request(server)
    .post('/api/v1/user/passwordreset')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.res.statusMessage).to.equal('OK');
      expect(res.req.method).to.equal('POST');
      expect(res.req.path).to.equal('/api/v1/user/passwordreset');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Mail sent succesfully');
      if (err) return done();
      done();
    });
  });

  it('should require an email input', (done) => {
    const userTest = {
      email: ''
    };
    chai.request(server)
    .post('/api/v1/user/passwordreset')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.method).to.equal('POST');
      expect(res.req.path).to.equal('/api/v1/user/passwordreset');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Email is required');
      if (err) return done();
      done();
    });
  });
  it('should require a valid email format', (done) => {
    const userTest = {
      email: 'test@yahoo'
    };
    chai.request(server)
    .post('/api/v1/user/passwordreset')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.method).to.equal('POST');
      expect(res.req.path).to.equal('/api/v1/user/passwordreset');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Invalid email format');
      if (err) return done();
      done();
    });
  });
  it('should not send a link to an unauthenticated email', (done) => {
    const userTest = {
      email: 'test2333@yahoo.com'
    };
    chai.request(server)
    .post('/api/v1/user/passwordreset')
    .send(userTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(404);
      expect(res.res.statusMessage).to.equal('Not Found');
      expect(res.req.method).to.equal('POST');
      expect(res.req.path).to.equal('/api/v1/user/passwordreset');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Email does not exist');
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
      email: 'eloka.chima@gmail.com',
      password: 'Asorock1'
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
      expect(res.statusCode).to.equal(200);
      expect(res.res.statusMessage).to.equal('OK');
      expect(res.req.method).to.equal('POST');
      expect(res.req.path).to.equal('/api/v1/user/signout');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Signed out!');
      if (err) return done();
      done();
    });
  });
});

