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
        expect(messageResult.actionType).toEqual('ADD_USER_TO_GROUP');
        expect(messageResult.actionType)
          .toHaveProperty('userData')
          .toEqual({
            message: 'User added successfully'
          });
        expect(messageResult.actionType)
          .toEqual(AppConstants.ADD__TO_GROUP);
      });
  });

  it('should dispatch actiontype ADD_MEMBER_TO_GROUP successfully', () => {
    AppActions.addUserToGroup('/api/v1/group/groupId/user')
      .then(() => {
        const userData = dispatch.mock.calls[0][0];
        expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
          actionType: AppConstants.ADD_MEMBER_TO_GROUP,
          userData
        });
      });
  });
});
