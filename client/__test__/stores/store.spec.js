import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import AppStore from '../../src/stores/AppStore';
import {
  addedMember,
  getAllUsers,
  loadNewUsers,
  googleUpdate,
  allGroupMessages,
  groupNames,
  googleLogin,
  registerUser,
  groupMessage,
  groupName,
} from './seeders';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/AppStore');

const callback = AppDispatcher.register.mock.calls[0][0];
const listenerCallBack = () => {
  'listenerCallBack';
};

describe('Appstore', () => {
  it('should return the default state of the store', () => {
    expect(AppStore.getGroupMessage()).toEqual([]);
    expect(AppStore.getCurrentUser()).toEqual([]);
    expect(AppStore.getCurrentGroup()).toEqual([]);
    expect(AppStore.getUserGroup()).toEqual([]);
    expect(AppStore.getAllMessages()).toEqual([]);
    expect(AppStore.getAllUsers()).toEqual([]);
    expect(AppStore.getAddMember()).toEqual([]);
    expect(AppStore.getNewMember()).toEqual([]);
    expect(AppStore.getNewGoogleUser()).toEqual([]);
    expect(AppStore.getGoogleUpdate()).toEqual([]);
  });

  describe('Create user', () => {
    it('should successfully receive registered users details payload', () => {
      callback(registerUser);
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getCurrentUser()).toEqual([{
        isConfirmed: true,
        jwtToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJDandoVmZOZU9OT1ZrT1g5UVp6bVFGMko1ajgzIiwiZGlzcGxheU5hbWUiOiJFbWVrYSIsImlhdCI6MTUxMTYxODUzNCwiZXhwIjoxNTExNzA0OTM0fQ.ufKD1ru8iwhLru63f_mogzZcyq_5lUYt-vcGizvs3V0',
        message: 'Registration success'
      }
      ]);
    });
  });

  describe('Create group', () => {
    it('should update the group store with group names and Ids', () => {
      callback(groupName);
      const emitChange = jest.fn();
      emitChange();
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getCurrentGroup()).toEqual([
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
      ]);
      expect(emitChange).toHaveBeenCalled();
    });
    it('should call the event listener when store receives data', () => {
      AppStore.addChangeListener(listenerCallBack);
      const events = AppStore._events;
      expect(Object.keys(events).length).toEqual(1);
    });
    it('should remove change listener when data change has been emitted',
      () => {
        AppStore.removeChangeListener(listenerCallBack);
        const events = AppStore._events;
        expect(Object.keys(events).length).toEqual(0);
      });
  });

  describe('Load groups', () => {
    it('should update the group store with the groupnames mock data', () => {
      callback(groupNames);
      const emitChange = jest.fn();
      emitChange();
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getUserGroup()).toEqual([
        {
          groupId: '-Kwz6LQ8P66M25GfxlNQ',
          groupname: 'Nwendu'
        },

        {
          groupId: '-Kwz6UdeGr7kjKRhpE0T',
          groupname: 'Ebuka'
        },

        {
          groupId: '-KwzMzLzSbVLm_Vsauwd',
          groupname: 'Andela'
        }
      ]);
      expect(emitChange).toHaveBeenCalled();
    });
    it('should call the event listener when store receives data', () => {
      AppStore.addChangeListener(listenerCallBack);
      const events = AppStore._events;
      expect(Object.keys(events).length).toEqual(1);
    });
    it('should remove change listener when data change has been emitted',
      () => {
        AppStore.removeChangeListener(listenerCallBack);
        const events = AppStore._events;
        expect(Object.keys(events).length).toEqual(0);
      });
  });

  describe('Post group message', () => {
    it('should update the post message store with the group messages mock data',
      () => {
        callback(groupMessage);
        const emitChange = jest.fn();
        emitChange();
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
        expect(AppStore.getGroupMessage([
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
        ]));
        expect(emitChange).toHaveBeenCalled();
      });
    it('should call the event listener when store receives data', () => {
      AppStore.addChangeListener(listenerCallBack);
      const events = AppStore._events;
      expect(Object.keys(events).length).toEqual(1);
    });
    it('should remove change listener when data change has been emitted',
      () => {
        AppStore.removeChangeListener(listenerCallBack);
        const events = AppStore._events;
        expect(Object.keys(events).length).toEqual(0);
      });
  });

  describe('Get all users', () => {
    it('should update all users store with all get all users mock data',
      () => {
        callback(getAllUsers);
        const emitChange = jest.fn();
        emitChange();
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
        expect(AppStore.getAllUsers()).toEqual([
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
        ]);
        expect(emitChange).toHaveBeenCalled();
      });
    it('should call the event listener when store receives data', () => {
      AppStore.addChangeListener(listenerCallBack);
      const events = AppStore._events;
      expect(Object.keys(events).length).toEqual(1);
    });
    it('should remove change listener when data change has been emitted',
      () => {
        AppStore.removeChangeListener(listenerCallBack);
        const events = AppStore._events;
        expect(Object.keys(events).length).toEqual(0);
      });
  });

  describe('Add user to group', () => {
    it('should update add user to group store with all get addedMember mock data', () => {
      callback(addedMember);
      const emitChange = jest.fn();
      emitChange();
      expect(AppDispatcher.register.mock.calls.length).toBe(1);
      expect(AppStore.getAddMember()).toEqual([{
        message: 'User added successfully'
      }]);
      expect(emitChange).toHaveBeenCalled();
    });
    it('should call the event listener when store receives data', () => {
      AppStore.addChangeListener(listenerCallBack);
      const events = AppStore._events;
      expect(Object.keys(events).length).toEqual(1);
    });
    it('should remove change listener when data change has been emitted',
      () => {
        AppStore.removeChangeListener(listenerCallBack);
        const events = AppStore._events;
        expect(Object.keys(events).length).toEqual(0);
      });
  });

  describe('Load new users', () => {
    it('should update load new users store with loadNewUsers mock data',
      () => {
        callback(loadNewUsers);
        const emitChange = jest.fn();
        emitChange();
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
        expect(AppStore.getNewMember()).toEqual([
          {
            userNames: 'West'
          },

          {
            userNames: 'Chinwendu'
          },

          {
            userNames: 'Ebuka'
          }
        ]);
        expect(emitChange).toHaveBeenCalled();
      });
    it('should call the event listener when store receives data', () => {
      AppStore.addChangeListener(listenerCallBack);
      const events = AppStore._events;
      expect(Object.keys(events).length).toEqual(1);
    });
    it('should remove change listener when data change has been emitted',
      () => {
        AppStore.removeChangeListener(listenerCallBack);
        const events = AppStore._events;
        expect(Object.keys(events).length).toEqual(0);
      });
  });

  describe('Google login', () => {
    it('should update Google login store with googleLogin mock data',
      () => {
        callback(googleLogin);
        const emitChange = jest.fn();
        emitChange();
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
        expect(AppStore.getNewGoogleUser()).toEqual([
          {
            isConfirmed: false,
            jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJDQnJYS05mSFdZUVZUa2wyMlkwRzZNWWFyMHQxIiwiZGlzcGxheU5hbWUiOiJFbG9rYSBjaGltYSIsImVtYWlsIjoiZWxva2FjaGltYUBnbWFpbC5jb20iLCJpYXQiOjE1MTA4Mjk2MDMsImV4cCI6MTUxMDgzMzIwM30.V6ECaccJ3lR0gwc3y2bzb2psjMT7JFddWiQTRODp_MM',
            message: 'Another step is required '
          }]);
        expect(emitChange).toHaveBeenCalled();
      });
    it('should call the event listener when store receives data', () => {
      AppStore.addChangeListener(listenerCallBack);
      const events = AppStore._events;
      expect(Object.keys(events).length).toEqual(1);
    });
    it('should remove change listener when data change has been emitted',
      () => {
        AppStore.removeChangeListener(listenerCallBack);
        const events = AppStore._events;
        expect(Object.keys(events).length).toEqual(0);
      });
  });

  describe('Google update', () => {
    it('should update Google update store with googleUpdate mock data',
      () => {
        callback(googleUpdate);
        const emitChange = jest.fn();
        emitChange();
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
        expect(AppStore.getGoogleUpdate()).toEqual([{
          isConfirmed: true,
          jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJEYmdRTWpzWjVCVkptRW43RG1ZVzJQbGdVdXoyIiwiZGlzcGxheU5hbWUiOiJFbG9rYSBjaGltYSIsImVtYWlsIjoiZWxva2FjaGltYUBnbWFpbC5jb20iLCJpYXQiOjE1MTA4MzA1MTIsImV4cCI6MTUxMDgzNDExMn0.np2HOTEgliKNpO__GDYD3XWQ1ncVl9phbEi5uVXGiXk',
          message: 'Login successful'
        }]);
        expect(emitChange).toHaveBeenCalled();
      });
    it('should call the event listener when store receives data', () => {
      AppStore.addChangeListener(listenerCallBack);
      const events = AppStore._events;
      expect(Object.keys(events).length).toEqual(1);
    });
    it('should remove change listener when data change has been emitted',
      () => {
        AppStore.removeChangeListener(listenerCallBack);
        const events = AppStore._events;
        expect(Object.keys(events).length).toEqual(0);
      });
  });

  describe('Get all group message', () => {
    it('should update all messages store with allGroupMessages mock data',
      () => {
        callback(allGroupMessages);
        const emitChange = jest.fn();
        emitChange();
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
        expect(AppStore.getAllMessages()).toEqual([
          {
            messageId: '-KznV7kzR0j3Ge8r9tr-',
            groupMessage: 'Hello world ',
            timeStamp: 'Saturday, November 25, 2017 3:06 PM',
            priority: 'Normal',
            displayName: 'Emeka'
          }
        ]);
        expect(emitChange).toHaveBeenCalled();
      });

    it('should call the event listener when store receives data', () => {
      AppStore.addChangeListener(listenerCallBack);
      const events = AppStore._events;
      expect(Object.keys(events).length).toEqual(1);
    });

    it('should remove change listener when data change has been emitted',
      () => {
        AppStore.removeChangeListener(listenerCallBack);
        const events = AppStore._events;
        expect(Object.keys(events).length).toEqual(0);
      });
  });
});
