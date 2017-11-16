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
        expect(checkVariable.actionType).toEqual(AppConstants.LOAD_GROUP_NAMES);
      });
  });
});
