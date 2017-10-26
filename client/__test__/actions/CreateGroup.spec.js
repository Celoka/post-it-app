import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';


describe('CreateGroup.js ', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should successfully match the returned group details', () => {
    AppActions.createGroup('/group')
    .then(() => {
      const messageResult = dispatch.mock.calls[0][0];
      expect(messageResult.actionType).toEqual(AppConstants.CREATE_GROUP);
    });
  });
});
