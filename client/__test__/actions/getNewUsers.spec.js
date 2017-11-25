import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import { getNewUsers } from '../actions/seeders';
import AppConstants from '../../src/constants/AppConstants.js';


describe('GetNewUsers.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('Should call the action creator with the expected details ', () => {
    const getNewUsersSpy = jest.spyOn(AppActions, 'getNewUsers');
    expect(getNewUsersSpy).toBeCalledWith(getNewUsers);
  });

  it('should return the details of added member', () => {
    AppActions.getNewUsers('groups/test/members')
      .then(() => {
        const messageResult = dispatch.mock.calls[0][0];
        expect(messageResult.actionType).toEqual('SET_GROUP_NAMES');
        expect(messageResult.actionType).toHaveProperty('groupData')
          .toEqual({
            message: 'User group created successfully',
            groupname: 'Andela',
            datecreated: 'Thu Oct 26 2017 14:28:55 GMT+0100 (WAT)',
            groupKey: '-KxNrlB8sWhbiFnLjQhP'
          });
        expect(messageResult.actionType).toEqual(AppConstants.LOAD_NEW_USERS);
      });
  });
});
