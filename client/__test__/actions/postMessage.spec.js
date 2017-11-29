import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';

describe('LoginUser.js action ', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('should successfully match the user login details', () => {
    AppActions.postMessage()
      .then(() => {
        const messageResult = dispatch.mock.calls[0][0];
        expect(messageResult.actionType).toEqual('SET_GROUP_MESSAGE');
        expect(messageResult.actionType).toHaveProperty('groupMessage')
          .toEqual({
            status: 'Message posted successfully',
            message: 'Hello world',
            priority: 'Normal',
            timestamp: 'Thu Oct 26 2017 16:45:25 GMT+0100 (WAT)'
          });
        expect(messageResult.actionType).toEqual(AppConstants.SET_GROUP_MESSAGE);
      });
  });
  it('should dispatch actiontype SET_GROUP_MESSAGE successfully', () => {
    AppActions.postMessage()
      .then(() => {
        const groupMessage = dispatch.mock.calls[0][0];
        expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
          actionType: AppConstants.SET_GROUP_MESSAGE,
          groupMessage
        });
      });
  });
});
