/**
 * Import module dependcies
 */
import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import server from '../server';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('Group routes', () => {
  const groupTest = {
    group: faker.name.findName(),
    userId: 'vip1gjkZVKePtQcAMKgzrAy2qbk1',
    displayName: 'Lester_bode'
  };
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'Dereck.Maggio@yahoo.com',
        password: '1f5wZ6vA73ikks6'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should require group name', (done) => {
    chai.request(server)
      .post('/api/v1/group')
      .set('x-access-token', token)
      .send({
        group: '',
        userId: 'vip1gjkZVKePtQcAMKgzrAy2qbk1',
        displayName: 'Lester_bode'
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('Group name is required');
        if (err) return done();
        done();
      });
  });
  it('should require group name to be atleast 3 characters', (done) => {
    chai.request(server)
      .post('/api/v1/group')
      .set('x-access-token', token)
      .send({
        group: 'ee',
        userId: 'vip1gjkZVKePtQcAMKgzrAy2qbk1',
        displayName: 'Lester_bode'
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message)
          .to.eql('Group name should be at least 3 characters');
        if (err) return done();
        done();
      });
  });
  it('should create a group successfully and return 200', (done) => {
    chai.request(server)
      .post('/api/v1/group')
      .set('x-access-token', token)
      .send(groupTest)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).to.eql('User group created successfully');
        expect(res.body).to.have.property('dateCreated');
        expect(res.body).to.have.property('groupId');
        expect(res.body).to.have.property('groupName');
        if (err) return done();
        done();
      });
  });
  it('should prompt the user that the group name already exists', (done) => {
    chai.request(server)
      .post('/api/v1/group')
      .set('x-access-token', token)
      .send({
        group: 'Andela group',
        userId: 'vip1gjkZVKePtQcAMKgzrAy2qbk1',
        displayName: 'Lester_bode'
      })
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body.message).to.eql('Groupname already exists');
        if (err) return done();
        done();
      });
  });
  describe('Add member route', () => {
    const credentials = {
      groupId: '-KzDbXdaFYGVW3AsfTyM',
      newUser: 'Hal3',
      userId: 'ROdMlALHZ7Q3b8FqIUcuoySXfpD2'
    };
    it('should add a member to a group and successfully return 201',
      (done) => {
        chai.request(server)
          .post('/api/v1/group/groupId/user')
          .set('x-access-token', token)
          .send(credentials)
          .end((err, res) => {
            res.should.have.status(201);
            expect(res.body.message).to.equal('User added successfully');
            if (err) return done(err);
            done();
          });
      });
  });
});

describe('Post message route', () => {
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'Dereck.Maggio@yahoo.com',
        password: '1f5wZ6vA73ikks6'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  const messageTest = {
    message: 'Hello World',
    priority: 'Normal',
    displayName: 'displayName'
  };
  it('should post message to a group succesfully', (done) => {
    const groupId = '-Kz9uVqCi63UlH-nbkPN';
    chai.request(server)
      .post(`/api/v1/groups/${groupId}/message`)
      .set('x-access-token', token)
      .send(messageTest)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.status).to.eql('Message posted successfully');
        expect(res.body.message).to.eql('Hello World');
        expect(res.body.priority).to.eql('Normal');
        expect(res.body.displayName).to.eql('displayName');
        if (err) return done(err);
        done();
      });
  });
  it('should post an urgent message to a group and send an email notification',
    (done) => {
      const groupId = '-Kz9uVqCi63UlH-nbkPN';
      chai.request(server)
        .post(`/api/v1/groups/${groupId}/message`)
        .set('x-access-token', token)
        .send({
          message: 'Hello World',
          priority: 'Urgent',
          displayName: 'displayName'
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.status).to.eql('Message posted successfully');
          expect(res.body.message).to.eql('Hello World');
          expect(res.body.priority).to.eql('Urgent');
          expect(res.body.displayName).to.eql('displayName');
          if (err) return done(err);
          done();
        });
    });
  it('should post an critical message to a group and send an sms notification',
    (done) => {
      const groupId = '-Kz9uVqCi63UlH-nbkPN';
      chai.request(server)
        .post(`/api/v1/groups/${groupId}/message`)
        .set('x-access-token', token)
        .send({
          message: 'Hello World',
          priority: 'Critical',
          displayName: 'displayName'
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.status).to.eql('Message posted successfully');
          expect(res.body.message).to.eql('Hello World');
          expect(res.body.priority).to.eql('Critical');
          expect(res.body.displayName).to.eql('displayName');
          if (err) return done(err);
          done();
        });
    });
});


describe('Get user group', () => {
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'Augustus_Rolfson@yahoo.com',
        password: 'KNarQgaGsafd8JX'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch the groups of the registered user ', (done) => {
    const userId = 'syIZmlNJIVTMc2YGT6ecHSrRNFL2';
    chai.request(server)
      .get(`/api/v1/${userId}/groups`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.status).to.eql('User groups retrived succcessfully');
        res.body.should.have.property('userGroups').to.eql([{
          groupId: '-Kz9sQBRDEMaoDtDAoAP',
          displayName: 'Laurine_yost',
          groupName: 'Andela group'
        }]);
        if (err) return done(err);
        done();
      });
  });
});

describe('Get group message', () => {
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'Augustus_Rolfson@yahoo.com',
        password: 'KNarQgaGsafd8JX'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch the messages in a particular user group', (done) => {
    const groupId = '-Kz9sQBRDEMaoDtDAoAP';
    chai.request(server)
      .get(`/api/v1/group/${groupId}`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.status).to.eql('Message retrived succcessfully');
        res.body.should.have.property('groupMessage').to.eql([{
          messageId: '-KzARUY0LT8uiLsQxl-S',
          message: 'jd',
          timeStamp: 'Friday, November 17, 2017 8:26 PM',
          priority: 'Normal',
          displayName: 'displayName'
        }]);
        if (err) return done(err);
        done();
      });
  });
});


describe('Get users in group', () => {
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'Augustus_Rolfson@yahoo.com',
        password: 'KNarQgaGsafd8JX'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch the users in a particular group', (done) => {
    const groupId = '-Kz9sQBRDEMaoDtDAoAP';
    chai.request(server)
      .get(`/api/v1/group/${groupId}/users`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('User retrieved successfully');
        res.body.should.have.property('users')
          .to.eql([
            { userName: 'Lester_bode' },
            { userName: 'Laurine_yost' },
            { userName: 'Eulalia.yost17' },
            { userName: 'Antonietta_cormier48' }
          ]);
        if (err) return done(err);
        done();
      });
  });
});
describe('Fetch all users ', () => {
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'Augustus_Rolfson@yahoo.com',
        password: 'KNarQgaGsafd8JX'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should successfully fetch all users', (done) => {
    chai.request(server)
      .get('/api/v1/allusers')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('Users retrieved successfully');
        res.body.should.have.property('usersDetails');
        if (err) return done(err);
        done();
      });
  });
});
describe('Fetch new users', () => {
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'Augustus_Rolfson@yahoo.com',
        password: 'KNarQgaGsafd8JX'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch new users', (done) => {
    const groupId = '-Kz9sQBRDEMaoDtDAoAP';
    chai.request(server)
      .get(`/api/v1/groups/${groupId}/members`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('users')
          .to.eql([{ displayName: 'Lester_bode' },
          { displayName: 'Laurine_yost' },
          { displayName: 'Eulalia.yost17' },
          { displayName: 'Antonietta_cormier48' }]);
        if (err) return done(err);
        done();
      });
  });
});
