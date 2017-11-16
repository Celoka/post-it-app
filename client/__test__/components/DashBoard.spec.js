import React from 'react';
import { mount } from 'enzyme';
import AppStore from '../../src/stores/AppStore';
import MessageBoard from '../../src/components/MessageBoard.jsx';
import UsersInGroup from '../../src/components/UsersInGroup.jsx';
import Group from '../../src/components/Group.jsx';
import DashBoard from '../../src/components/DashBoard.jsx';

describe('<DashBoard />', () => {
  const addChangeListenerSpy = jest.spyOn(AppStore, 'addChangeListener');
  const removeChangeListenerSpy = jest.spyOn(AppStore, 'removeChangeListener');

  const groupId = 'test';
  const groupName = 'test';
  const wrapper = mount(<DashBoard />,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: {
        router: {
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

  it('should', () => {
    expect(wrapper.state().displayName).toBe(null);
    expect(wrapper.state().groupId).toBe(null);
    expect(wrapper.state().groupName).toEqual('');
    expect(wrapper.state().groupMessage).toHaveLength(0);
    expect(wrapper.state().userId).toBe(undefined);
    expect(wrapper.state().newMember).toHaveLength(0);
    expect(wrapper.state().googleUser).toHaveLength(0);
  });

  it('contains a <Group /> component', () => {
    expect(wrapper.find(Group)).toHaveLength(1);
  });

  it('contains a < UsersInGroup /> component', () => {
    expect(wrapper.find(UsersInGroup)).toHaveLength(1);
  });
  it('should find <MessageBoard /> component when the state is set', () => {
    expect(wrapper.find(MessageBoard)).toBeDefined();
  });
  it('calls componentDidMount() lifecycle method', () => {
    expect(addChangeListenerSpy).toHaveBeenCalled();
  });
  it('calls componentWillUnmount', () => {
    wrapper.unmount();
    expect(removeChangeListenerSpy).toHaveBeenCalled();
  });
  it('calls setGroupId method', () => {
    const setGroupIdSpy = jest.spyOn(
      wrapper.instance(), 'setGroupId'
    );
    wrapper.setState({
      groupId: 'hfhfhf',
      groupName: 'test'
    });
    wrapper.instance().setGroupId(groupId, groupName);
    expect(setGroupIdSpy).toHaveBeenCalled();
  });
});

