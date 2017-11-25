import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import { resetEmail } from '../actions/seeders';


describe('ResetPassWordAction.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('Should call the action creator with the expected details ', () => {
    const resetPasswordSpy = jest.spyOn(AppActions, 'resetPassword');
    expect(resetPasswordSpy).toBeCalledWith(resetEmail);
  });

  it('should successfully return a promise after API call', () => {
    AppActions.resetPassword('/user/passwordreset')
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(0);
      });
  });
});
