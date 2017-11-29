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

  it('should make a call to the end point and resolve the response', () => {
    AppActions.googleUpdate('/api/v1/user/googleupdate')
      .then(() => {
        const checkVariable = dispatch.mock.calls[0][0];
        expect(checkVariable.actionType).toEqual('GOOGLE_UPDATE');
        expect(checkVariable.actionType).toHaveProperty('userData').toEqual({
          isConfirmed: true,
          jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJEYmdRTWpzWjVCVkptRW43RG1ZVzJQbGdVdXoyIiwiZGlzcGxheU5hbWUiOiJFbG9rYSBjaGltYSIsImVtYWlsIjoiZWxva2FjaGltYUBnbWFpbC5jb20iLCJpYXQiOjE1MTA4MzA1MTIsImV4cCI6MTUxMDgzNDExMn0.np2HOTEgliKNpO__GDYD3XWQ1ncVl9phbEi5uVXGiXk',
          message: 'Login successful'
        });
        expect(checkVariable.actionType).toEqual(AppConstants.GOOGLE_UPDATE);
      });
  });

  it('should dispatch actiontype GOOGLE_UPDATE successfully', () => {
    AppActions.googleUpdate('/api/v1/user/googleupdate')
      .then(() => {
        const userData = dispatch.mock.calls[0][0];
        expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
          actionType: AppConstants.GOOGLE_UPDATE,
          userData
        });
      });
  });
});
