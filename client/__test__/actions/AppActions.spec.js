import mockApiCall from '../../__mocks__/axios.js';
import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';

describe('AppActions.js', () => {
  let dispatch;
  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });
  it('should get data', () =>
    AppActions.loadGroups()
    .then(() => {
      const checkVariable = dispatch.mock.calls[0][0];
      expect(checkVariable.actionType).toEqual(AppConstants.SET_GROUP);
    })
  );
});
