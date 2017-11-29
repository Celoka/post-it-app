import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';

describe('LoadGroups.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should get all groups', () => {
    AppActions.loadGroups()
      .then(() => {
        const checkVariable = dispatch.mock.calls[0][0];
        expect(checkVariable.actionType).toEqual('LOAD_GROUP_NAMES');
        expect(checkVariable.actionType).toHaveProperty('userGroups')
          .toEqual([{ groupId: '-Kwz6LQ8P66M25GfxlNQ', groupname: 'Nwendu' },
          { groupId: '-Kwz6UdeGr7kjKRhpE0T', groupname: 'Ebuka' },
          { groupId: '-KwzMzLzSbVLm_Vsauwd', groupname: 'Andela' }]);
        expect(checkVariable.actionType).toEqual(AppConstants.LOAD_GROUP_NAMES);
      });
  });
});
