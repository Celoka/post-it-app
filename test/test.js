const supertest = require('supertest');
const should = require('should');
// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:3000');

// UNIT test begin

describe('API route unit test', () => {
  it('should create a new user', (done) => {
    // calling ADD api
    server
    .post('/user/signup')
    .send({ email: 'andela@yahoo.com', password: 'Luska1', username: 'Eloka' })
    .expect('Content-type', /firebase/)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      res.body.data.should.equal('andela@yahoo.com', 'Luska1', 'Eloka');
      done();
    });
  });

  it('should sign in a user', (done) => {
    server
      .post('user/signin')
      .send({ email: 'andela@yahoo.com', password: 'Luska1' })
      .expect('Content-type', /firebase/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.status.error.should.equal(false);
        res.body.data.should.equal(email, password);
        done();
      });
  });
  it('should sign out a user from account', (done) => {
    server
     .post('user/signout')
     .expect('Signed out!')
     .expect(200)
     .end((err, res) => {
       res.status.should.equal(200);
       res.body.error.should.equal(false);
     });
  });
});
