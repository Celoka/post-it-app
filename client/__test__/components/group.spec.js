import React from 'react';
import { mount } from 'enzyme';

import mockApiCall from '../../__mocks__/axios';
import AppStore from '../../src/stores/AppStore';
import AppActions from '../../src/actions/AppActions';
import Group from '../../src/components/container/Group.jsx';
import GroupList from '../../src/components/presentation/GroupList.jsx';

describe('<Group/>', () => {
  beforeAll(() => {
    global.window.$ = () => null;
  });
  const createGroupSpy = jest.spyOn(AppActions, 'createGroup')
    .mockImplementation(() => Promise.resolve({}));
  const addChangeListenerSpy = jest.spyOn(AppStore, 'addChangeListener');
  const getUserGroupSpy = jest.spyOn(AppStore, 'getUserGroup');
  const removeChangeListenerSpy = jest.spyOn(AppStore, 'removeChangeListener');

  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
  });
  const wrapper = mount(<Group />,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: {
        router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            setGroupId: '[function ]'
          }
        }
      }
    }
  );
  it('should contain a <GroupList /> component', () => {
    expect(wrapper.find(GroupList)).toHaveLength(0);
  });

  it('should create a group on click of a button', () => {
    wrapper.setState({ userGroupName: 'test' });
    wrapper.find('button').at(3).simulate('click');
    expect(createGroupSpy).toHaveBeenCalled();
  });

  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(
      wrapper.instance(), 'onChange'
    );
    const event = {
      target: {
        group: 'Andela'
      }
    };
    wrapper.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls componentDidMount() lifecycle method', () => {
    expect(addChangeListenerSpy).toHaveBeenCalled();
    expect(getUserGroupSpy).toHaveBeenCalled();
  });

  it('calls openCreateGroupModal', () => {
    const openCreateGroupModalSpy = jest.spyOn(
      wrapper.instance(), 'openCreateGroupModal'
    );
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().openCreateGroupModal(event);
    expect(openCreateGroupModalSpy).toBeCalled();
  });

  it('calls componentWillUnmount lifecycle method', () => {
    wrapper.unmount();
    expect(removeChangeListenerSpy).toHaveBeenCalled();
  });
});
