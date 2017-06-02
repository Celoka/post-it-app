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
      .send({ email: 'andela@yahoo.com', password: 'Luska1' })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.status.error.should.equal(false);
        res.body.data.should.equal(email, password);
        if (err) return done(err);
        done();
      });
  });

  it('should sign out a user from account', (done) => {
    supertest(server)
     .post('user/signout')
      .expect('Signed out!')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
