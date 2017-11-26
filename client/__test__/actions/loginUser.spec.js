import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';
import { signIndetails } from '../actions/seeders';


describe('LoginUser.js action ', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('Should call the action creator with the expected details ', () => {
    const loginUserSpy = jest.spyOn(AppActions, 'loginUser');
    expect(loginUserSpy).toBeCalledWith(signIndetails);
  });

  it('should successfully match the user login details', () => {
    AppActions.loginUser('/api/v1/user/signin')
      .then(() => {
        const messageResult = dispatch.mock.calls[0][0];
        expect(messageResult.actionType).toEqual(AppConstants.SET_USER);
      });
  });
});
