import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';


describe('AddUser.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should successfully return new user details', () => {
    AppActions.addUserToGroup('/group/groupId/user')
    .then(() => {
      const messageResult = dispatch.mock.calls[0][0];
      expect(messageResult.actionType)
      .toEqual(AppConstants.ADD_MEMBER_TO_GROUP);
    });
  });
});
