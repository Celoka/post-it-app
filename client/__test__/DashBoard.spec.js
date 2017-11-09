import React from 'react';
import { mount } from 'enzyme';
import AppStore from '../src/stores/AppStore';
import AppActions from '../src/actions/AppActions';
import mockApiCall from '../__mocks__/axios';
import MessageBoard from '../src/components/MessageBoard.jsx';
import UsersInGroup from '../src/components/UsersInGroup.jsx';
import Group from '../src/components/Group.jsx';
import DashBoard from '../src/components/DashBoard.jsx';
import BoardNavigation from '../src/components/BoardNavigation.jsx';

describe('<DashBoard />', () => {
  const getUsersInGroupSpy = jest.spyOn(AppActions, 'getUsersInGroup');
  const addChangeListenerSpy = jest.spyOn(AppStore, 'addChangeListener');
  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
  });
  const wrapper = mount(<DashBoard/>,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: { router: {
        history: {
          push: () => null,
          createHref: () => null,
          replace: () => null,
          length: 10,
          action: 'PUSH',
          location: {
            pathname: '/dashboard',
            search: '',
            hash: '',
            key: 'qi4prx'
          }
        },
        route: {
          location: {
            pathname: '/dashboard',
            search: '',
            hash: '',
            key: 'qi4prx'
          },
          match: {
            path: '/',
            url: '/',
            params: {},
            isExact: false
          }
        }
      }
      },
    });

  it('contains a <BoardNavigation /> component', () => {
    expect(wrapper.find(BoardNavigation)).toHaveLength(1);
  });
  it('contains a <Group /> component', () => {
    expect(wrapper.find(Group)).toHaveLength(1);
  });
  it('contains a < UsersInGroup /> component', () => {
    expect(wrapper.find(UsersInGroup)).toHaveLength(1);
  });
  it('should show <MessageBoard /> component when the state is set', () => {
    expect(wrapper.find(MessageBoard)).toBeDefined();
  });
  it('should have an initial empty inital states state', () => {
    expect(wrapper.state().groupId).toEqual(null);
    expect(wrapper.state().groupname).toEqual('');
    expect(wrapper.state().groupMessage).toHaveLength(0);
    expect(wrapper.state().newMember).toHaveLength(0);
    expect(wrapper.state().userId).toBeDefined();
  });
  it('should have all component function to be  defined', () => {
    expect(wrapper.nodes[0].onStoreChange).toBeDefined();
    expect(wrapper.nodes[0].setGroupId).toBeDefined();
  });
  it('calls componentDidMount() lifecycle method', () => {
    expect(getUsersInGroupSpy).toHaveBeenCalled();
    expect(addChangeListenerSpy).toHaveBeenCalled();
  });
});
