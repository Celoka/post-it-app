import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';
import { newUserDetails } from '../actions/seeders';
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

  it('Should call the action creator with the expected details ', () => {
    const addUserToGroupSpy = jest.spyOn(AppActions, 'addUserToGroup');
    expect(addUserToGroupSpy).toBeCalledWith(newUserDetails);
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
          .toEqual(AppConstants.ADD_MEMBER_TO_GROUP);
      });
  });
});
