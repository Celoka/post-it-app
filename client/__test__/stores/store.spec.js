import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import AppStore from '../../src/stores/AppStore';
import {
  addedMember,
  getAllUsers,
  loadNewUsers,
  allGroupMessages,
  loadGroupNames,
  registerUser,
  postGroupMessage,
  getGroupUsers
} from './seeders';

jest.dontMock('../../src/stores/AppStore');

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
  });

  describe('User store', () => {
    it('should successfully receive registered users details payload', () => {
      AppDispatcher.dispatch(registerUser.action);
      expect(AppStore.getCurrentUser()).toEqual({
        isConfirmed: true,
        jwtToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJDandoVmZOZU9OT1ZrT1g5UVp6bVFGMko1ajgzIiwiZGlzcGxheU5hbWUiOiJFbWVrYSIsImlhdCI6MTUxMTYxODUzNCwiZXhwIjoxNTExNzA0OTM0fQ.ufKD1ru8iwhLru63f_mogzZcyq_5lUYt-vcGizvs3V0',
        message: 'Registration success'
      });
    });
  });

  describe('Group store', () => {
    it('should be updated with the group names and Ids', () => {
      const emitChange = jest.fn();
      emitChange();
      AppDispatcher.dispatch(loadGroupNames.action);
      expect(AppStore.getCurrentGroup()).toEqual([
        {
          status: 'Message retrieved successfully',
          userGroups: [
            {
              groupId: '-Kwz6LQ8P66M25GfxlNQ',
              groupName: 'Nwendu'
            },

            {
              groupId: '-Kwz6UdeGr7kjKRhpE0T',
              groupName: 'Ebuka'
            },

            {
              groupId: '-KwzMzLzSbVLm_Vsauwd',
              groupName: 'Andela'
            }
          ]
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

  describe('Get group users', () => {
    it('should update the group store with the groupnames data', () => {
      const emitChange = jest.fn();
      emitChange();
      AppDispatcher.dispatch(getGroupUsers.action);
      expect(AppStore.getUserGroup()).toEqual([{
        status: 'Message retrieved successfully',
        userGroups: [
          {
            groupId: '-Kwz6LQ8P66M25GfxlNQ',
            groupName: 'Nwendu'
          },
          {
            groupId: '-Kwz6UdeGr7kjKRhpE0T',
            groupName: 'Ebuka'
          },
          {
            groupId: '-KwzMzLzSbVLm_Vsauwd',
            groupName: 'Andela'
          }]
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

  describe('Group message store', () => {
    it('should should receive group messages posted by users', () => {
      const emitChange = jest.fn();
      emitChange();
      AppDispatcher.dispatch(postGroupMessage.action);
      expect(AppStore.getGroupMessage()).toEqual([
        {
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

  describe('Get all users', () => {
    it('should update all users store with all get all users data',
      () => {
        const emitChange = jest.fn();
        emitChange();
        AppDispatcher.dispatch(getAllUsers.action);
        expect(AppStore.getAllUsers()).toEqual(
          {
            message: 'Users retrieved successfully',
            usersDetails:
              [
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
                }]
          }
        );
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

  describe('Member add store', () => {
    it('should receive member data when a user adds a new member',
      () => {
        const emitChange = jest.fn();
        emitChange();
        AppDispatcher.dispatch(addedMember.action);
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
    it('should update load new users store with loadNewUsers data',
      () => {
        const emitChange = jest.fn();
        emitChange();
        AppDispatcher.dispatch(loadNewUsers.action);
        expect(AppStore.getNewMember()).toEqual(
          {
            users:
              [
                { userNames: 'West' },
                { userNames: 'Chinwendu' },
                { userNames: 'Ebuka' }
              ]
          });
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

  describe('All group message store', () => {
    it('should update all messages store with allGroupMessages data',
      () => {
        const emitChange = jest.fn();
        emitChange();
        AppDispatcher.dispatch(allGroupMessages.action);
        expect(AppStore.getAllMessages()).toEqual(
          {
            message: 'Message retrieved successfully',
            groupMessage:
              [{
                messageId: '-KznV7kzR0j3Ge8r9tr-',
                groupMessage: 'Hello world ',
                timeStamp: 'Saturday, November 25, 2017 3:06 PM',
                priority: 'Normal',
                displayName: 'Emeka'
              }]
          });
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
