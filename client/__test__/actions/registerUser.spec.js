import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';


describe('RegisterUser.js ', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should return a matching action type and payload', () => {
    AppActions.registerUser('/api/v1/user/signup')
      .then(() => {
        const messageResult = dispatch.mock.calls[0][0];
        expect(messageResult.actionType).toEqual(AppConstants.NEW_USER);
      });
  });

  it('should dispatch actiontype NEW_USER successfully', () => {
    AppActions.registerUser('/api/v1/user/signup')
      .then(() => {
        const userData = dispatch.mock.calls[0][0];
        expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
          actionType: AppConstants.NEW_USER,
          userData
        });
      });
  });
});
