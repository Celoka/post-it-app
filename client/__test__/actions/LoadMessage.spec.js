import AppActions from '../../src/actions/AppActions.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import AppConstants from '../../src/constants/AppConstants.js';
import { loadGroupMessage } from '../actions/seeders';
import mockApiCall from '../../__mocks__/axios';

describe('LoadMessage.js', () => {
  let dispatch;
  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
    dispatch = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatch.mockReset();
  });

  it('Should call the action creator with the expected details ', () => {
    const loadGroupMessageSpy = jest.spyOn(AppActions, 'loadGroupMessage');
    expect(loadGroupMessageSpy).toBeCalledWith(loadGroupMessage);
  });

  it('should get all messages', () => {
    AppActions.loadGroupMessage('/api/v1/group/groupId')
      .then(() => {
        const checkVariable = dispatch.mock.calls[0][0];
        expect(checkVariable.actionType).toEqual('LOAD_GROUP_MESSAGES');
        expect(checkVariable.actionType).toEqual(AppConstants.LOAD_GROUP_MESSAGES);
      });
  });
});
