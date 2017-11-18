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
    AppActions.googleLogin('/api/v1/user/googlesignin')
      .then(() => {
        const checkVariable = dispatch.mock.calls[0][0];
        expect(checkVariable.actionType).toEqual('GOOGLE_LOGIN');
        expect(checkVariable.actionType).toHaveProperty('googleData')
          .toEqual({
            isConfirmed: false,
            jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJDQnJYS05mSFdZUVZUa2wyMlkwRzZNWWFyMHQxIiwiZGlzcGxheU5hbWUiOiJFbG9rYSBjaGltYSIsImVtYWlsIjoiZWxva2FjaGltYUBnbWFpbC5jb20iLCJpYXQiOjE1MTA4Mjk2MDMsImV4cCI6MTUxMDgzMzIwM30.V6ECaccJ3lR0gwc3y2bzb2psjMT7JFddWiQTRODp_MM',
            message: 'Another step is required '
          });
        expect(checkVariable.actionType).toEqual(AppConstants.GOOGLE_LOGIN);
      });
  });
});
