import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';
import mockApiCall from '../../__mocks__/axios';


describe('AddUser.js', () => {
  let dispatch;
  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should successfully return new user details', () => {
    AppActions.addUserToGroup('/api/v1/group/groupId/user')
    .then(() => {
      const messageResult = dispatch.mock.calls[0][0];
      console.log(messageResult, ' from add user')
      expect(messageResult.actionType)
      .toEqual(AppConstants.ADD_MEMBER_TO_GROUP);
    });
  });
});
