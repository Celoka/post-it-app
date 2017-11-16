
import AppConstants from '../../src/constants/AppConstants';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import AppStore from '../../src/stores/AppStore';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/AppStore');

const callback = AppDispatcher.register.mock.calls[0][0];
const listenerCb = () => {
  'listenerCB';
};
const getGoogleUpdate = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.GOOGLE_UPDATE,
    payload: {
      isConfirmed: true,
      jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJEYmdRTWpzWjVCVkptRW43RG1ZVzJQbGdVdXoyIiwiZGlzcGxheU5hbWUiOiJFbG9rYSBjaGltYSIsImVtYWlsIjoiZWxva2FjaGltYUBnbWFpbC5jb20iLCJpYXQiOjE1MTA4MzA1MTIsImV4cCI6MTUxMDgzNDExMn0.np2HOTEgliKNpO__GDYD3XWQ1ncVl9phbEi5uVXGiXk',
      message: 'Login successful'
    }
  }
};
describe('AppStore', () => {
  it('should have an empty initial array for google update', () => {
    expect(AppStore.getGoogleUpdate.length).toEqual(0);
  });
  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
  it('initializes with no google user item in the store', () => {
    const all = AppStore.getGoogleUpdate();
    expect(all).toEqual([]);
  });

  it('should call getGoogleUpdate method when data is received', () => {
    callback(getGoogleUpdate);
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
  it('should call the event listentener when store receives data', () => {
    AppStore.addChangeListener(listenerCb);
    const events = AppStore._events;
    expect(Object.keys(events).length).toEqual(1);
  });
  it('should remove change listener when data change has been emitted', () => {
    AppStore.removeChangeListener(listenerCb);
    const events = AppStore._events;
    expect(Object.keys(events).length).toEqual(0);
  });
});
