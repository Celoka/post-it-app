import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';
import mockApiCall from '../../__mocks__/axios';

describe('AllGroupMembers.js', () => {
  let dispatch;
  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should get all group messages', () => {
    AppActions.getAllUsers('/api/v1/allusers')
      .then(() => {
        const messageResult = dispatch.mock.calls[0][0];
        expect(messageResult.actionType).toEqual('GET_ALL_USERS');
        expect(messageResult.actionType).toHaveProperty('allUsers')
          .toEqual([
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
        expect(messageResult.actionType).toEqual(AppConstants.GET_ALL_USERS);
      });
  });

  it('should dispatch actiontype GET_ALL_USERS successfully', () => {
    AppActions.getAllUsers('/api/v1/allusers')
      .then(() => {
        const allUsers = dispatch.mock.calls[0][0];
        expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
          actionType: AppConstants.GET_ALL_USERS,
          allUsers
        });
      });
  });
});
