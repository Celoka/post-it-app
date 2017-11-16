import AppConstants from '../../src/constants/AppConstants';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import AppStore from '../../src/stores/AppStore';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/AppStore');

const callback = AppDispatcher.register.mock.calls[0][0];
const listenerCb = () => {
  'listenerCB';
};

const userCredential = {
  source: 'VIEW_ACTION',
  action: {
    actionType: AppConstants.GET_ALL_USERS,
    payload: {
      data: { message: 'Registration success',
        userDetails: [
          {
            uid: 'xzzy@yahoo.com',
            displayName: null,
            photoURL: null,
            email: 'xzzy@yahoo.com',
            phoneNumber: null,
            providerId: 'password'
          }
        ],
        token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4NzA3NDE3MmQ2YTA1MmQxY2Q5NjhlZWIyYTdmYTdjZTU2ZmRjMWMifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWxva2EtNjY3YmUiLCJhdWQiOiJlbG9rYS02NjdiZSIsImF1dGhfdGltZSI6MTUwOTAwMjMwMywidXNlcl9pZCI6IkFLRm5oZDkyWEhOdk1HSG1VU0hKMkNHdDFBdTEiLCJzdWIiOiJBS0ZuaGQ5MlhITnZNR0htVVNISjJDR3QxQXUxIiwiaWF0IjoxNTA5MDAyMzAzLCJleHAiOjE1MDkwMDU5MDMsImVtYWlsIjoieHp6eUB5YWhvby5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsieHp6eUB5YWhvby5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.v6rhLqGgGtOrBEmKIbRp56swlF5_Efp0Uo-JLggqeN-qRH3tUkv3j1Z8l106tCZoKl2-ILey9u8XgYxQcaCapxwLi9OXMvYqMvdi1Hne1APjlluQErw5J-GQAysQ_cDms-UvAN1gCO72BzBGbUXy_kipwa5E_9B-I6EDS3QR5A1fS3CFKvFO4Vb1Ol4mf8Jw5wbPkyEMfFqo0LwHpWJjqEtMTmnQ5haUIoS_U4Fq9YY8hhgzISbYdj8ToZtzS6jYmVfyWM01YWEGOIbr4Nz0dnrX6PhvS5Sr_Cw2w1Olii3R4XH5d-urk8HE0xj_F0N7M8wYaLpAfE8rgAZRljSupg'
      }
    }
  }
};
describe('AppStore', () => {
  it('should have an empty initial array for google update', () => {
    expect(AppStore.getCurrentUser.length).toEqual(0);
  });
  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
  it('initializes with no google user item in the store', () => {
    const all = AppStore.getCurrentUser();
    expect(all).toEqual([]);
  });
  it('should call getNewMember method when data is receieved ', () => {
    callback(userCredential);
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

