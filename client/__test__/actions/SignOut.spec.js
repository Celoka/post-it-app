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

  it('Should call the action creator with the expected details ', () => {
    const logOutSpy = jest.spyOn(AppActions, 'logOut');
    expect(logOutSpy).toBeCalled();
  });

  it('should successfully return a promise after API call', () => {
    AppActions.logOut('/user/signout')
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(0);
      });
  });
});
