const supertest = require('supertest');
const server = require('../server/server');

// UNIT test begin for Sign Up route
describe('API route unit test for SignUp route', () => {
  it('should create a new user', (done) => {
// Calling Signup API
    supertest(server)
    .post('/user/signup')
    .send({
      email: 'andela@yahoo.com',
      password: 'Andela',
      username: 'ElokaC' })
    .expect('Content-type', /json/)
    .expect(200);
    done();
  });
  it('should return error message for invalid email and password', (done) => {
    supertest(server)
    .post('/signUp')
    .send({
      email: 'andelayahoo.com',
      password: 'Andela',
      username: 'ElokaC' })
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      done();
    });
  });
});
// Test for SignUp route ends.//

// Unit Test for SignIn route begins//
describe('API route unit test for SignIn route', () => {
  it('should sign in a user', (done) => {
    supertest(server)
    .post('user/signin')
    .send({
      email: 'andela@yahoo.com',
      password: 'Andela'
    })
    .expect('Content-type', /json/)
    .expect(200);
    done();
  });
  it('should return an error message for wrong login details', (done) => {
    supertest(server)
    .post('user/signin')
    .send({
      email: 'andelahdhhdh',
      password: 'hshhdhsh'
    })
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      done();
    });
  });
});
// Test for SignIn ends//

// Test for Sign Out begins
describe('API route unit test for SignOut route', () => {
  it('should sign out a user from account', (done) => {
    supertest(server)
     .post('user/signout')
     .expect('Content-type', /json/)
     .expect(200);
    done();
  });
});
