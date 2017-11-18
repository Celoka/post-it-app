import AppConstants from '../../src/constants/AppConstants';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import AppStore from '../../src/stores/AppStore';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/AppStore');

const callback = AppDispatcher.register.mock.calls[0][0];
const listenerCb = () => {
  'listenerCB';
};

const groupMessage = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.SET_GROUP_MESSAGE,
    data: {
      status: 'Message retrived succcessfully',
      groupMessage: [
        {
          messageId: '-Kx-bhNDZLmYclETVJUc',
          message: 'Humanity is the oldest religion.',
          time: 'Sat Oct 21 2017 21:27:51 GMT+0100 (WAT)',
          priority: 'Critical',
          user: 'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1'
        },
        {
          messageId: '-Kx-bpTOVwHSHS8Qv7mf',
          message: 'We will hereby commence our product launch',
          time: 'Sat Oct 21 2017 21:28:25 GMT+0100 (WAT)',
          priority: 'Urgent',
          user: 'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1'
        },
        {
          messageId: '-KxAdcAa8gylf2UncLw5',
          message: 'Hello world ',
          time: 'Tue Oct 24 2017 00:52:04 GMT+0100 (WAT)',
          priority: 'Normal',
          user: 'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1'
        }
      ]
    }
  }
};
describe('AppStore', () => {
  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
  it('initializes with no google user item in the store', () => {
    const all = AppStore.getGroupMessage();
    expect(all).toEqual([]);
  });
  it('should call getGroupMessage method when data is receieved ', () => {
    callback(groupMessage);
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

