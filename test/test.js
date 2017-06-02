const supertest = require('supertest');
const server = require('../dist/server');

// UNIT test begin

describe('API route unit test', () => {
  it('should create a new user', (done) => {
// Calling Signup API
    supertest(server)
    .post('/user/signup')
    .set('Accept', 'application/json')
    .expect(200)
     .end((err) => {
       if (err) return done(err);
       done();
     });
  });

  it('should sign in a user', (done) => {
    supertest(server)
      .post('user/signin')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should sign out a user from account', (done) => {
    supertest(server)
     .post('user/signout')
     .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return version number', (done) => {
    supertest(server)
      .get('/')
      .end((err, res) => {
        res.body.version.to.be.ok;
        res.statusCode.to.equal(200);
        done();
      });
  });
});
