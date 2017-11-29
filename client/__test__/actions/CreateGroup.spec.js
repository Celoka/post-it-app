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
        console.log(dispatch.mock.calls[0][0], 'from creategroup')
        const messageResult = dispatch.mock.calls[0][0];
        expect(messageResult.actionType).toEqual(AppConstants.SET_GROUP_NAME);
      });
  });
});
