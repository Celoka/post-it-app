import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';

describe('ResetPassWordAction.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should successfully return a promise after API call', () => {
    AppActions.resetPassword('/user/passwordreset')
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(0);
      });
  });
});
