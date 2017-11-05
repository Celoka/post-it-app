/**
 * Import module dependcies
 */
import chaiHttp from 'chai-http';
import chai from 'chai';
import server from '../server/server';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('Group routes', () => {
  const groupTest = {
    groupname: 'Andela Group',
  };
  before((done) => {
    chai.request(server)
        .post('/user/signin')
        .send({
          email: 'eloka.chima@gmail.com',
          password: 'Asorock1'
        })
        .end(() => {
          done();
        });
  });
  it('should create a group successfully and return 200', (done) => {
    chai.request(server)
    .post('/group')
    .send(groupTest)
    .end((err, res) => {
      expect(res.statusCode).to.equal(201);
      expect(res.res.statusMessage).to.equal('Created');
      expect(res.req.path).to.equal('/group');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.an('object');
      res.body.message.should.equal('User group created successfully');
      res.body.groupname.should.equal('Andela Group');
      if (err) return done();
      done();
    });
  });
  it('should require text for group name', (done) => {
    chai.request(server)
    .post('/group')
    .send('')
    .end((err, res) => {
      expect(res.statusCode).to.equal(400);
      expect(res.res.statusMessage).to.equal('Bad Request');
      expect(res.req.path).to.equal('/group');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.an('object');
      res.body.message.should.equal('Groupname is required');
      if (err) return done();
      done();
    });
  });
  it('should add a member to a group and successfully return 201', (done) => {
    chai.request(server)
    .post('/group/groupId/user')
    .send({
      groupId: '-Ky24zneu7LlYn13dgfP',
      newUser: 'PostIt App',
      userId: 'wNIypTsx91aWWRpJ1T5X5HAX11S2'
    })
    .end((err, res) => {
      expect(res.statusCode).to.equal(201);
      expect(res.res.statusMessage).to.equal('Created');
      expect(res.req.path).to.equal('/group/groupId/user');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('User added successfully');
      if (err) return done(err);
      done();
    });
  });
  it('should successfully post a message to a group and return 201', (done) => {
    const groupId = '-Ky24zneu7LlYn13dgfP';
    chai.request(server)
    .post(`/groups/${groupId}/message`)
    .send({
      message: 'Hello world',
      priority: 'Normal'
    })
    .end((err, res) => {
      expect(res.statusCode).to.equal(201);
      expect(res.res.statusMessage).to.equal('Created');
      expect(res.req.path).to.equal('/groups/-Kwz6LQ8P66M25GfxlNQ/message');
      expect(res.req.method).to.equal('POST');
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('Message posted successfully');
      expect(res.body.message).to.equal('Hello world');
      expect(res.body.priority).to.equal('Normal');
      if (err) return done(err);
      done();
    });
  });
  it(
    'should get all the groups of a user belongs to and return 200', (done) => {
      chai.request(server)
      .get('/groups')
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.res.statusMessage).to.equal('OK');
        expect(res.req.path).to.equal('/groups');
        expect(res.req.method).to.equal('GET');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('Message retrieved successfully');
        expect(res.body.userGroups[0].groupId).to.equal('-Ky24zneu7LlYn13dgfP');
        expect(res.body.userGroups[0].groupname).to.equal('Andela');
        expect(res.body.userGroups[0]).to.haveOwnProperty('groupId');
        expect(res.body.userGroups[0]).to.haveOwnProperty('groupname');
        if (err) return done(err);
        done();
      });
    });
  it('should fetch all the group message', (done) => {
    const groupId = '-Ky24zneu7LlYn13dgfP';
    chai.request(server)
    .get(`/group/${groupId}`)
    .send()
    .end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.res.statusMessage).to.equal('OK');
      expect(res.req.path).to.equal('/group/-Ky24zneu7LlYn13dgfP');
      expect(res.req.method).to.equal('GET');
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('Message retrived succcessfully');
      expect(res.body.groupMessage[0].messageId).to.equal(
        '-Kx-bhNDZLmYclETVJUc'
      );
      expect(res.body.groupMessage[0].message).to.equal(
        'Humanity is the oldest religion.'
      );
      expect(res.body.groupMessage[0].time).to.equal(
        'Sat Oct 21 2017 21:27:51 GMT+0100 (WAT)'
      );
      expect(res.body.groupMessage[0].priority).to.equal('Critical');
      expect(res.body.groupMessage[0].user).to.equal(
        'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1'
      );
      if (err) return done(err);
      done();
    });
  });
  it('should get users in a particular group', (done) => {
    const groupId = 'Ky24zneu7LlYn13dgfP';
    chai.request(server)
    .get(`/group/${groupId}/users`)
    .send()
    .end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.res.statusMessage).to.equal('OK');
      expect(res.req.path).to.equal('/group/-Ky24zneu7LlYn13dgfP/users');
      expect(res.req.method).to.equal('GET');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('User retrieved successfully');
      expect(res.body.users[0].userName).to.equal('West');
      expect(res.body.users[0].userId).to.equal('HIBpkdz7IfTSyOyLbevWasL78HD3');
      if (err) return done(err);
      done();
    });
  });
  it('should fetch all registered user and return 200', (done) => {
    chai.request(server)
    .get('/user/allusers')
    .send()
    .end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.res.statusMessage).to.equal('OK');
      expect(res.req.path).to.equal('/user/allusers');
      expect(res.req.method).to.equal('GET');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Users retrieved successfully');
      expect(res.body.usersDetails[0].userId).to.equal(
        '0A4ynsbZ1tVLhcuOx1arNR6UBK33'
      );
      expect(res.body.usersDetails[0].userNames).to.equal('Keanu59');
      if (err) return done(err);
      done();
    });
  });
  it('should names of members added to a group and return 200', (done) => {
    const groupId = '-Ky24zneu7LlYn13dgfP';
    chai.request(server)
    .get(`/groups/${groupId}/members`)
    .send()
    .end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.res.statusMessage).to.equal('OK');
      expect(res.req.path).to.equal('/groups/-Ky24zneu7LlYn13dgfP/members');
      expect(res.req.method).to.equal('GET');
      expect(res.body).to.be.an('object');
      expect(res.body.users[0].userNames).to.equal('West');
      if (err) done(err);
      done();
    });
  });
});

