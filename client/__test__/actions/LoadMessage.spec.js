import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';


describe('LoadMessages.js', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should get all messages', () => {
    AppActions.loadMessage('test')
    .then(() => {
      const messageResult = dispatch.mock.calls[0][0];
      expect(messageResult.actionType).toEqual(AppConstants.LOAD_GROUP_MESSAGE);
    });
  });
});
