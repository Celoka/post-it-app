import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import { credentials } from '../actions/seeders';
import AppConstants from '../../src/constants/AppConstants.js';


describe('action RegisterUser.js ', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('Should call the action creator with the expected details ', () => {
    const registerUserSpy = jest.spyOn(AppActions, 'registerUser');
    expect(registerUserSpy).toBeCalledWith(credentials);
  });

  it('should return a matching action type and payload', () => {
    AppActions.registerUser('/api/v1/user/signup')
      .then(() => {
        const messageResult = dispatch.mock.calls[0][0];
        expect(messageResult.actionType).toEqual(AppConstants.NEW_USER);
      });
  });
});
