import AppConstants from '../../src/constants/AppConstants';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import AppStore from '../../src/stores/AppStore';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/AppStore');

const callback = AppDispatcher.register.mock.calls[0][0];
const listenerCb = () => {
  'listenerCB';
};
const googleLogin = {
  source: 'VIEW_ACTION',
  actions: {
    actionType: AppConstants.GOOGLE_LOGIN,
    payload: {
      isConfirmed: false,
      jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJDQnJYS05mSFdZUVZUa2wyMlkwRzZNWWFyMHQxIiwiZGlzcGxheU5hbWUiOiJFbG9rYSBjaGltYSIsImVtYWlsIjoiZWxva2FjaGltYUBnbWFpbC5jb20iLCJpYXQiOjE1MTA4Mjk2MDMsImV4cCI6MTUxMDgzMzIwM30.V6ECaccJ3lR0gwc3y2bzb2psjMT7JFddWiQTRODp_MM',
      message: 'Another step is required '
    }
  }
};

describe('AppStore', () => {
  it('should have an empty initial array for google update', () => {
    expect(AppStore.getNewGoogleUser.length).toEqual(0);
  });
  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
  it('initializes with no google user item in the store', () => {
    const all = AppStore.getNewGoogleUser();
    expect(all).toEqual([]);
  });

  it('should call getNewGoogleUser method when data is received', () => {
    callback(googleLogin);
    const emitchange = jest.fn();
    emitchange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitchange).toHaveBeenCalled();
  });
  it('should call the event listener when store receives data', () => {
    AppStore.addChangeListener(listenerCb);
    const events =AppStore._events;
    expect(Object.keys(events).length).toEqual(1);
  });
  it('should remove listener when data change has been emitted', () => {
    AppStore.removeChangeListener(listenerCb);
    const events = AppStore._events;
    expect(Object.keys(events).length).toEqual(0);
  });
});
