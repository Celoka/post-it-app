import chaiHttp from 'chai-http';
import chai from 'chai';
import assert from 'assert';
import server from '../server/server';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

let user;

describe('POST IT', () => {
  before((done) => {
    chai.request(server)
      .post('/user/signin')
      .send({ email: 'Andela@yahoo.com', password: '1234567' })
      .end((err, res) => {
        user = res.body;
        done();
      });
  });

  describe('POST IT', () => {
    it('should show that the site exist', (done) => {
      chai.request(server)
      .get('http:127.0.0.1:8080')
      .end((err, res) => {
        res.status.should.equal(200);
        assert.equal(200, res.statusCode);
        done();
      });
    });

    it('should create a new user', (done) => {
      const userTest = {
        email: 'andela22552@yahoo.com',
        password: 'andela24344',
        username: 'Andelan',
        phonenumber: '090335425425'
      };
      chai.request(server)
      .post('/user/signup')
      .send(userTest)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.be.eql('Registration success');
        if (err) return done();
        done();
      });
    });


  //   it('should return error message for invalid email and password', (done) => {
  //     chai.request(server)
  //     .get('/')
  //     .end((err, res) => {
  //       res.status.should.equal(200);
  //       done();
  //     });
  //   });
  // });

    it('should not sign up an already registered user', (done) => {
      const userTest = {
        email: 'andela2@yahoo.com',
        password: 'andela24344',
        username: 'Andelan',
        phonenumber: '090335425425'
      };
      chai.request(server)
    .post('/user/signup')
    .send(userTest)
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('email already in use.');
      if (err) return done();
      done();
    });
    });

    it('should require an email input', (done) => {
      const userTest = {
        email: '',
        password: 'andela24344',
        username: 'Andelan',
        phonenumber: '090335425425'
      };
      chai.request(server)
    .post('/user/signup')
    .send(userTest)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Email is required');
      if (err) return done();
      done();
    });
    });

    it('should require a valid email input', (done) => {
      const userTest = {
        email: 'andela2',
        password: 'andela24344',
        username: 'Andelan',
        phonenumber: '090335425425'
      };
      chai.request(server)
    .post('/user/signup')
    .send(userTest)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Please put a valid email');
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
    .post('/user/signup')
    .send(userTest)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Username is required');
      if (err) return done();
      done();
    });
    });

    it('should require a password', (done) => {
      const userTest = {
        email: 'andela2@yahoo.com',
        password: '',
        username: 'Andelan',
        phonenumber: '090335425425'
      };
      chai.request(server)
    .post('/user/signup')
    .send(userTest)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Password is required');
      if (err) return done();
      done();
    });
    });

    it('should require a well formatted password', (done) => {
      const userTest = {
        email: 'andela2@yahoo.com',
        password: 'andel',
        username: 'Andelan',
        phonenumber: '090335425425'
      };
      chai.request(server)
    .post('/user/signup')
    .send(userTest)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Password must be a mininum of 6 character');
      if (err) return done();
      done();
    });
    });

    it('should allow a registered user sign in successfully', (done) => {
      const authenticatedUser = {
        email: 'andela2@yahoo.com',
        password: 'andela24344'
      };
      chai.request(server)
    .post('/user/signin')
    .send(authenticatedUser)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.should.have.a.property('token');
      res.body.message.should.be.equal('User Signed in!');
      if (err) return done();
      done();
    });
    });

    it('should expect user login to be unsuccessful', (done) => {
      const authenticatedUser = {
        email: 'an@yahoo.com',
        password: 'andela24344'
      };
      chai.request(server)
    .post('/user/signin')
    .send(authenticatedUser)
    .end((err, res) => {
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Wrong password or email');
      if (err) return done();
      done();
    });
    });

    it('should require a user email', (done) => {
      const authenticatedUser = {
        email: '',
        password: 'andela24344'
      };
      chai.request(server)
    .post('/user/signin')
    .send(authenticatedUser)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Email is required');
      if (err) return done();
      done();
    });
    });

    it('should require a user password', (done) => {
      const authenticatedUser = {
        email: 'andela2@yahoo.com',
        password: ''
      };
      chai.request(server)
    .post('/user/signin')
    .send(authenticatedUser)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Password is required');
      if (err) return done();
      done();
    });
    });

    it('should successfully send a password reset link to a registered user', (done) => {
      const userEmail = {
        email: 'andela2@yahoo.com',
      };
      chai.request(server)
    .post('/user/passwordreset')
    .send(userEmail)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Mail sent succesfully');
      if (err) return done();
      done();
    });
    });

    it('should require a user email', (done) => {
      const userEmail = {
        email: '',
      };
      chai.request(server)
    .post('/user/passwordreset')
    .send(userEmail)
    .end((err, res) => {
      res.status.should.equal(500);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('auth/invalid-email');
      if (err) return done();
      done();
    });
    });

    it('should require a valid user email', (done) => {
      const userEmail = {
        email: 'andela2com',
      };
      chai.request(server)
    .post('/user/passwordreset')
    .send(userEmail)
    .end((err, res) => {
      res.status.should.equal(500);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('auth/invalid-email');
      if (err) return done();
      done();
    });
    });

    it('should sign out a user from account', (done) => {
      chai.request(server)
      .post('/user/signout')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.a.property('message');
        res.body.message.should.be.equal('Signed out!');
        if (err) return done();
        done();
      });
    });

    it('should get a user in group', (done) => {
      chai.request(server)
    .get('/user/group')
    .send(user)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.a.property('message');
      res.body.should.have.a.property('result');
      res.body.message.should.be.equal('Signed out!');
      if (err) return done();
      done();
    });
    });


  // it('should get all registered users', (done) => {
  //   chai.request(server)
  //   .get('/user/getusers')
  //   .send(user)
  //   .end((err, res) => {
  //     res.status.should.equal(200);
  //     res.body.should.be.a('object');
  //     res.body.should.have.a.property('userNames');
  //     if (err) return done();
  //     done();
  //   });
  // });

    it('should allow a registered user create a user group successfully', (done) => {
      const userGroup = {
        groupName: 'Gryffindor',
        userId: '123456789'
      };
      chai.request(server)
    .post('/group')
    .send(userGroup)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.should.be.a('object');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('groupName');
      expect(res.body).to.have.property('groupKey');
      expect(res.body).to.have.property('datecreated');
      done();
    });
    });

  // it('should allow a registered user get all groups he belongs to', (done) => {
  //   const userId = {
  //     user: '123456789'
  //   };
  //   chai.request(server)
  //   .get('/groups')
  //   .send(userId)
  //   .end((err, res) => {
  //     res.status.should.equal(200);
  //     res.body.should.be.a('object');
  //     expect(res.body).to.have.property('message');
  //     expect(res.body).to.have.property('userGroups');
  //     done();
  //   });
  });
});
