import AppConstants from '../../src/constants/AppConstants';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import AppStore from '../../src/stores/AppStore';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/AppStore');

const callback = AppDispatcher.register.mock.calls[0][0];
const listenerCb = () => {
  'listenerCB';
};

const allGroupMessages = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.LOAD_NEW_USERS,
    payload: {
      data: { message: 'Users retrieved successfully',
        usersDetails: [
          {
            userId: 'AKFnhd92XHNvMGHmUSHJ2CGt1Au1',
            userNames: 'West'
          },
          {
            userId: 'HIBpkdz7IfTSyOyLbevWasL78HD3',
            userNames: 'West'
          },
          {
            userId: 'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1',
            userNames: 'Chinwendu'
          },
          {
            userId: 'f9TGDZzckNhTxr4KakHiChiAVYP2',
            userNames: 'Ebuka'
          }
        ]
      }
    }
  }
};
describe('AppStore', () => {
  it('should have an empty initial array for google update', () => {
    expect(AppStore.getAllMessages.length).toEqual(0);
  });
  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
  it('initializes with no google user item in the store', () => {
    const all = AppStore.getAllMessages();
    expect(all).toEqual([]);
  });
  it('should call getNewMember method when data is receieved ', () => {
    callback(allGroupMessages);
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
  it('should call the evnt listener when store receives data', () => {
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

