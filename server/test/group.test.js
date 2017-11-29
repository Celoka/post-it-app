/**
 * Import module dependcies
 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('Group routes', () => {
  const groupTest = {
    group: 'New Group 00',
    userId: '35KlmtIB5Fg1WJ8gaD7F4jNdvRg2',
    displayName: 'Post-it'
  };
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'post-it@yahoo.com',
        password: 'Asorock1'
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
        userId: 'C7nMvV0P2PgeovFTZijuru8IIOq2',
        displayName: 'Johno'
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
        displayName: 'Johno'
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message)
          .to.eql('Group name should be at least 3 characters');
        if (err) return done();
        done();
      });
  });
  it('should create a group successfully', (done) => {
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
        group: 'Test Group 8',
        userId: '35KlmtIB5Fg1WJ8gaD7F4jNdvRg2',
        displayName: 'Post-it'
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
      groupId: '-KzTN5kSLI8pR_Mwa9Zn',
      newUser: 'Kenedy',
      userId: 'mBVyMfPsLZRrsjvAK1vbkYVOQ6X2'
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
        email: 'west@yahoo.com',
        password: 'Asorock1'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  const messageTest = {
    groupMessage: 'Hello World',
    priority: 'Normal',
    displayName: 'displayName'
  };
  it('should post message to a group succesfully', (done) => {
    const groupId = '-KzTAy-TocmHSIwxvg2u';
    chai.request(server)
      .post(`/api/v1/groups/${groupId}/message`)
      .set('x-access-token', token)
      .send(messageTest)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.status).to.eql('Message posted successfully');
        expect(res.body.groupMessage).to.eql('Hello World');
        expect(res.body.priority).to.eql('Normal');
        expect(res.body.displayName).to.eql('displayName');
        if (err) return done(err);
        done();
      });
  });
  it('should post an urgent message to a group and send an email notification',
    (done) => {
      const groupId = '-KzTAy-TocmHSIwxvg2u';
      chai.request(server)
        .post(`/api/v1/groups/${groupId}/message`)
        .set('x-access-token', token)
        .send({
          groupMessage: 'Hello World',
          priority: 'Urgent',
          displayName: 'Johno'
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.status).to.eql('Message posted successfully');
          expect(res.body.groupMessage).to.eql('Hello World');
          expect(res.body.priority).to.eql('Urgent');
          expect(res.body.displayName).to.eql('Johno');
          if (err) return done(err);
          done();
        });
    });
  it('should post an critical message to a group and send an sms notification',
    (done) => {
      const groupId = '-KzTAy-TocmHSIwxvg2u';
      chai.request(server)
        .post(`/api/v1/groups/${groupId}/message`)
        .set('x-access-token', token)
        .send({
          groupMessage: 'Hello World',
          priority: 'Critical',
          displayName: 'Johno'
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.status).to.eql('Message posted successfully');
          expect(res.body.groupMessage).to.eql('Hello World');
          expect(res.body.priority).to.eql('Critical');
          expect(res.body.displayName).to.eql('Johno');
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
        email: 'west@yahoo.com',
        password: 'Asorock1'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch the groups of the registered user ', (done) => {
    const userId = 'po9DB2rZMzVW3KiLeYJMK0zjBeh1';
    chai.request(server)
      .get(`/api/v1/${userId}/groups`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.status).to.eql('User groups retrived succcessfully');
        res.body.should.have.property('userGroups').to.eql([
          {
            groupId: '-KzTAy-TocmHSIwxvg2u',
            displayName: 'West',
            groupName: 'Test group 1'
          },
          {
            groupId: '-KzTCuWtIwpbwuOOxIbD',
            displayName: 'West',
            groupName: 'Group 1'
          },
          {
            groupId: '-KzTD6g2QBtzr8Wm5B4f',
            displayName: 'West',
            groupName: 'Group 2'
          },
          {
            groupId: '-KzTD9uQbyF-yolojZJ2',
            displayName: 'West',
            groupName: 'Group 3'
          },
          {
            groupId: '-KzTDCOqNrlArBA0PWr7',
            displayName: 'West',
            groupName: 'Group 4'
          },
          {
            groupId: '-KzTDF6X-2Evg6pi913P',
            displayName: 'West',
            groupName: 'Group 5'
          },
          {
            groupId: '-KzTDHcMI5nzTh3dZBs8',
            displayName: 'West',
            groupName: 'Group 6'
          },
          {
            groupId: '-KzTDKQcWp75QBfILn4r',
            displayName: 'West',
            groupName: 'Group 7'
          },
          {
            groupId: '-KzTDMmDes3FEWTJLh2O',
            displayName: 'West',
            groupName: 'Group 8'
          },
          {
            groupId: '-KzTDP8VaPA957ikdi2o',
            displayName: 'West',
            groupName: 'Group 9'
          },
          {
            groupId: '-KzTDRboLnQ5CoPnzMPF',
            displayName: 'West',
            groupName: 'Group 10'
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
        email: 'west@yahoo.com',
        password: 'Asorock1'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch the messages in a particular user group', (done) => {
    const groupId = '-KzTDP8VaPA957ikdi2o';
    chai.request(server)
      .get(`/api/v1/group/${groupId}`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.status).to.eql('Message retrived succcessfully');
        res.body.should.have.property('groupMessage').to.eql([
          {
            messageId: '-KzTFqlynSqgREqZXYDN',
            groupMessage: 'Hello World',
            timeStamp: 'Tuesday, November 21, 2017 12:08 PM',
            priority: 'Normal',
            displayName: 'displayName'
          },
          {
            messageId: '-KzTFqww4_atsITewvVA',
            groupMessage: 'Hello World',
            timeStamp: 'Tuesday, November 21, 2017 12:08 PM',
            priority: 'Urgent',
            displayName: 'Johno'
          },
          {
            messageId: '-KzTFr-tiMVCecjnBU9E',
            groupMessage: 'Hello World',
            timeStamp: 'Tuesday, November 21, 2017 12:08 PM',
            priority: 'Critical',
            displayName: 'Johno'
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
        email: 'west@yahoo.com',
        password: 'Asorock1'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch the users in a particular group', (done) => {
    const groupId = '-KzTDCOqNrlArBA0PWr7';
    chai.request(server)
      .get(`/api/v1/group/${groupId}/users`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('User retrieved successfully');
        res.body.should.have.property('users')
          .to.eql([
            { userName: 'West' },
            { userName: 'Emmason' },
            { userName: 'Jane' },
            { userName: 'John mann' },
            { userName: 'Cyndyx' },
            { userName: 'Jasmine' },
            { userName: 'Kawthar' },
            { userName: 'Zuma' },
            { userName: 'James' }]);
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
        email: 'west@yahoo.com',
        password: 'Asorock1'
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
        email: 'west@yahoo.com',
        password: 'Asorock1'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch new users', (done) => {
    const groupId = '-KzTDCOqNrlArBA0PWr7';
    chai.request(server)
      .get(`/api/v1/groups/${groupId}/members`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('users')
          .to.eql([
            { displayName: 'West' },
            { displayName: 'Emmason' },
            { displayName: 'Jane' },
            { displayName: 'John mann' },
            { displayName: 'Cyndyx' },
            { displayName: 'Jasmine' },
            { displayName: 'Kawthar' },
            { displayName: 'Zuma' },
            { displayName: 'James' }]);
        if (err) return done(err);
        done();
      });
  });
});
