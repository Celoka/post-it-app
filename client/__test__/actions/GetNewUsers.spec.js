import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';


describe('GetNewUsers.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should return the details of added member', () => {
    AppActions.getNewUsers('groups/test/members')
    .then(() => {
      const messageResult = dispatch.mock.calls[0][0];
      expect(messageResult.actionType).toEqual(AppConstants.GET_NEW_USERS);
    });
  });
});
