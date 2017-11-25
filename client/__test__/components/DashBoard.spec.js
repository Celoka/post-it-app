import React from 'react';
import { mount } from 'enzyme';

import AppStore from '../../src/stores/AppStore';
import MessageBoard from '../../src/components/container/MessageBoard.jsx';
import UsersInGroup from '../../src/components/container/UsersInGroup.jsx';
import Group from '../../src/components/container/Group.jsx';
import DashBoard from '../../src/components/container/DashBoard.jsx';

describe('<DashBoard />', () => {
  const addChangeListenerSpy = jest.spyOn(AppStore, 'addChangeListener');
  const removeChangeListenerSpy = jest.spyOn(AppStore, 'removeChangeListener');
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

  it('should show the initial state of the component when component will mount', () => {
    expect(wrapper.state().displayName).toBe(null);
    expect(wrapper.state().groupId).toBe(null);
    expect(wrapper.state().groupName).toEqual('');
    expect(wrapper.state().groupMessages).toEqual([]);
    expect(wrapper.state().newMember).toEqual([]);
    expect(wrapper.state().googleUser).toEqual([]);
    expect(wrapper.state().userId).toEqual([
      { userId: 'AKFnhd92XHNvMGHmUSHJ2CGt1Au1', userNames: 'West' },
      { userId: 'HIBpkdz7IfTSyOyLbevWasL78HD3', userNames: 'West' },
      { userId: 'JZDm5SXVRoRkX8ZZGwkGIqCg3Hn1', userNames: 'Chinwendu' },
      { userId: 'f9TGDZzckNhTxr4KakHiChiAVYP2', userNames: 'Ebuka' }]);
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

  it('should call setGroupId function', () => {
    const setGroupIdSpy = jest.spyOn(
      wrapper.instance(), 'setGroupId'
    ).mockImplementation(() => Promise.resolve({}));
    wrapper.setState({
      groupId: '6363ghrh',
      groupName: 'Andela'
    });
    expect(setGroupIdSpy).toBeDefined();
  });

  it('calls componentDidMount() lifecycle method', () => {
    expect(addChangeListenerSpy).toHaveBeenCalled();
  });
  it('calls componentWillUnmount', () => {
    wrapper.unmount();
    expect(removeChangeListenerSpy).toHaveBeenCalled();
  });
});

