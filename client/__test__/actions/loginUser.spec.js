import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';

describe('LoginUser.js action ', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should successfully match the user login details', () => {
    AppActions.loginUser('/api/v1/user/signin')
      .then(() => {
        const messageResult = dispatch.mock.calls[0][0];
        expect(messageResult.actionType).toEqual(AppConstants.SET_USER);
      });
  });

  it('should dispatch actiontype SET_USER successfully', () => {
    AppActions.loginUser('/api/v1/user/signin')
      .then(() => {
        const userData = dispatch.mock.calls[0][0];
        expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
          actionType: AppConstants.SET_USER,
          userData
        });
      });
  });
});
