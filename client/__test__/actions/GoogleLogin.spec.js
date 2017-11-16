import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';

describe('GoogleLogin.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });
  it('should should match the api response', () => {
    AppActions.googleLogin()
      .then(() => {
        const checkVariable = dispatch.mock.calls[0][0];
        expect(checkVariable.actionType).toEqual(AppConstants.GOOGLE_LOGIN);
      });
  });
});
