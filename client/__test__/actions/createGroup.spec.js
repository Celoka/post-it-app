import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';
import mockApiCall from '../../__mocks__/axios';

describe('CreateGroup.js ', () => {
  let dispatch;
  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should successfully match the returned group details', () => {
    AppActions.createGroup('/api/v1/group')
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
        expect(messageResult.actionType).toEqual(AppConstants.SET_GROUP_NAME);
      });
  });

  it('should dispatch actiontype SET_GROUP_NAMES successfully', () => {
    AppActions.createGroup('/api/v1/group').then(() => {
      const groupData = dispatch.mock.calls[0][0];
      expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
        actionType: AppConstants.SET_GROUP_NAMES,
        groupData
      });
    });
  });
});
