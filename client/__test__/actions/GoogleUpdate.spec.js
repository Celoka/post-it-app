import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';
import { googleCredentails } from '../actions/seeders';


describe('GoogleLogin.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });
  it('Should call the action creator with the expected details ', () => {
    const googleUpdateSpy = jest.spyOn(AppActions, 'googleUpdate');
    expect(googleUpdateSpy).toBeCalledWith(googleCredentails);
  });

  it('should match the api response', () => {
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
});
