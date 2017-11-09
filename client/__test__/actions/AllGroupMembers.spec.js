import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';


describe('AllGroupMembers.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should get all group messages', () => {
    AppActions.getUsersInGroup('/user/allusers')
    .then(() => {
      const messageResult = dispatch.mock.calls[0][0];
      expect(messageResult.actionType).toEqual(AppConstants.GET_ALL_USERS);
    });
  });
});
