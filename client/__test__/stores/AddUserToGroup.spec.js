import AppConstants from '../../src/constants/AppConstants';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import AppStore from '../../src/stores/AppStore';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/AppStore');

const callback = AppDispatcher.register.mock.calls[0][0];
const listenerCb = () => {
  'listenerCB';
};

const getAddedMember = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.ADD_USER_TO_GROUP,
    payload: {
      data: { message: 'User added successfully'
      }
    }
  }
};
describe('AppStore', () => {
  it('should have an empty initial array for google update', () => {
    expect(AppStore.getAddMember.length).toEqual(0);
  });
  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
  it('initializes with no google user item in the store', () => {
    const all = AppStore.getAddMember();
    expect(all).toEqual([]);
  });
  it('should call getAddMember method when data is receieved ', () => {
    callback(getAddedMember);
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
  it('should call the event listener when store receives data', () => {
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

