import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';


describe(' action SignOut.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should successfully return a promise after API call', () => {
    AppActions.logOut('/user/signout')
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(0);
      });
  });
});
