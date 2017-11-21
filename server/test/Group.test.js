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
    group: 'Test Group 8',
    userId: 'yzb9pYl92gYLJ5gruMPsc6ZFRq62',
    displayName: 'Maryj'
  };
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'maryjane@yahoo.com',
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
        group: 'Andela',
        userId: 'yzb9pYl92gYLJ5gruMPsc6ZFRq62',
        displayName: 'Maryj'
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
      groupId: '-KzP-OKFzesOXjir7WSt',
      newUser: 'John',
      userId: 'C7nMvV0P2PgeovFTZijuru8IIOq2'
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
        email: 'john-doe@yahoo.com',
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
    const groupId = '-KzQH7VB0CPixeicwV7U';
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
      const groupId = '-KzQH7VB0CPixeicwV7U';
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
      const groupId = '-KzQH7VB0CPixeicwV7U';
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
        email: 'john-doe@yahoo.com',
        password: 'Asorock1'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch the groups of the registered user ', (done) => {
    const userId = 'MBoDQwaBXOQzXQYw0mh6374Q2Rf2';
    chai.request(server)
      .get(`/api/v1/${userId}/groups`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.status).to.eql('User groups retrived succcessfully');
        res.body.should.have.property('userGroups').to.eql([
          {
            groupId: '-KzP336KF8FKlIbnT1FL',
            displayName: 'Johno',
            groupName: 'Andela'
          },
          {
            groupId: '-KzQGmESK7_yta8bFBrY',
            displayName: 'Johno',
            groupName: 'Test 4'
          },
          {
            groupId: '-KzQGrdrlEim1QtPxIIC',
            displayName: 'Johno',
            groupName: 'Test 5'
          },
          {
            groupId: '-KzQGxEsgeU0ThtndE82',
            displayName: 'Johno',
            groupName: 'Test 6'
          },
          {
            groupId: '-KzQH1uWx7eizUGlxv85',
            displayName: 'Johno',
            groupName: 'Test 7'
          },
          {
            groupId: '-KzQH7VB0CPixeicwV7U',
            displayName: 'Johno',
            groupName: 'Test 8'
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
        email: 'john-doe@yahoo.com',
        password: 'Asorock1'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch the messages in a particular user group', (done) => {
    const groupId = '-KzQGrdrlEim1QtPxIIC';
    chai.request(server)
      .get(`/api/v1/group/${groupId}`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.status).to.eql('Message retrived succcessfully');
        res.body.should.have.property('groupMessage').to.eql([{
          messageId: '-KzQZtXyz-Rf-qbDTaGj',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:36 PM',
          priority: 'Normal',
          displayName: 'displayName'
        },
        {
          messageId: '-KzQZtaODZG-W10O0pc9',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:36 PM',
          priority: 'Urgent',
          displayName: 'Johno'
        },
        {
          messageId: '-KzQZtdtzmHb9TzdX88z',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:36 PM',
          priority: 'Critical',
          displayName: 'Johno'
        },
        {
          messageId: '-KzQ_2QKWoy6ssMfCSuf',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:37 PM',
          priority: 'Normal',
          displayName: 'displayName'
        },
        {
          messageId: '-KzQ_2TjQ3tW6sqfVc1c',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:37 PM',
          priority: 'Urgent',
          displayName: 'Johno'
        },
        {
          messageId: '-KzQ_2XIm-cUoNBnvymT',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:37 PM',
          priority: 'Critical',
          displayName: 'Johno'
        },
        {
          messageId: '-KzQ_AWVtgO9A8iufzZJ',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:37 PM',
          priority: 'Normal',
          displayName: 'displayName'
        },
        {
          messageId: '-KzQ_AZqmFbZrCeB88HZ',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:37 PM',
          priority: 'Urgent',
          displayName: 'Johno'
        },
        {
          messageId: '-KzQ_AcQOmmPSaxo_lBW',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:37 PM',
          priority: 'Critical',
          displayName: 'Johno'
        },
        {
          messageId: '-KzQ_Ic3Rn2v9dfEhlO8',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:38 PM',
          priority: 'Normal',
          displayName: 'displayName'
        },
        {
          messageId: '-KzQ_Iff48mANPHSnJ_l',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:38 PM',
          priority: 'Urgent',
          displayName: 'Johno'
        },
        {
          messageId: '-KzQ_Ij3vJYHDJhTYgCc',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:38 PM',
          priority: 'Critical',
          displayName: 'Johno'
        },
        {
          messageId: '-KzQ_Qhxm3L2cS5QB4a7',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:39 PM',
          priority: 'Normal',
          displayName: 'displayName'
        },
        {
          messageId: '-KzQ_QlWRl3jtClFCKhM',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:39 PM',
          priority: 'Urgent',
          displayName: 'Johno'
        },
        {
          messageId: '-KzQ_Qp1FFwltx1yoJGj',
          groupMessage: 'Hello World',
          timeStamp: 'Monday, November 20, 2017 11:39 PM',
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
        email: 'johndoe@yahoo.com',
        password: 'Asorock1'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch the users in a particular group', (done) => {
    const groupId = '-KzP-OKFzesOXjir7WSt';
    chai.request(server)
      .get(`/api/v1/group/${groupId}/users`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('User retrieved successfully');
        res.body.should.have.property('users')
          .to.eql([
            { userName: 'John' },
            { userName: 'West' },
            { userName: 'Johno' },
            { userName: 'Jane x' },
            { userName: 'Oxenfurt' },
            { userName: 'Willaims k' },
            { userName: 'Maryj' }]);
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
        email: 'william_kaneX@yahoo.com',
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
        email: 'johndoe@yahoo.com',
        password: 'Asorock1'
      })
      .end((err, res) => {
        token = res.body.jwtToken;
        done();
      });
  });
  it('should fetch new users', (done) => {
    const groupId = '-KzP-OKFzesOXjir7WSt';
    chai.request(server)
      .get(`/api/v1/groups/${groupId}/members`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('users')
          .to.eql([
            { displayName: 'John' },
            { displayName: 'West' },
            { displayName: 'Johno' },
            { displayName: 'Jane x' },
            { displayName: 'Oxenfurt' },
            { displayName: 'Willaims k' },
            { displayName: 'Maryj' }]);
        if (err) return done(err);
        done();
      });
  });
});
