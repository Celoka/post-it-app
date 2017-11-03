import React from 'react';
import { mount } from 'enzyme';
import mockApiCall from '../__mocks__/axios';
import AppStore from '../src/stores/AppStore';
import AppActions from '../src/actions/AppActions';
import Group from '../src/components/Group.jsx';
import GroupList from '../src/components/GroupList.jsx';

describe('<Group/>', () => {
  const createGroupSpy = jest.spyOn(AppActions, 'createGroup');
  const loadGroupsSpy = jest.spyOn(AppActions, 'loadGroups');
  const addChangeListenerSpy = jest.spyOn(AppStore, 'addChangeListener');
  const getUserGroupSpy = jest.spyOn(AppStore, 'getUserGroup');
  const removeChangeListenerSpy = jest.spyOn(AppStore, 'removeChangeListener');

  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
  });
  const wrapper = mount(<Group />);
  it('should contain a <GroupList /> component', () => {
    expect(wrapper.find(GroupList)).toHaveLength(0);
  });
  it('should have a button', () => {
    expect(wrapper.find('button')).toHaveLength(4);
  });
  it('should find a form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });
  it('should update the state when on click of a button', () => {
    wrapper.setState({ userGroupName: 'test' });
    wrapper.find('button').at(3).simulate('click');
    expect(createGroupSpy).toHaveBeenCalled();
    expect(loadGroupsSpy).toHaveBeenCalled();
  });
  it('should have an input for groupname', () => {
    expect(wrapper.find('input')).toHaveLength(1);
  });
  it('should have an it state to be equal to test', () => {
    expect(wrapper.state().userGroupName).toEqual('');
    expect(wrapper.state().groupName).toEqual([
    { groupId: '-Kwz6LQ8P66M25GfxlNQ', groupname: 'Nwendu' },
    { groupId: '-Kwz6UdeGr7kjKRhpE0T', groupname: 'Ebuka' },
    { groupId: '-KwzMzLzSbVLm_Vsauwd', groupname: 'Andela' }]);
  });
  it('calls componentDidMount() lifecycle method', () => {
    expect(loadGroupsSpy).toHaveBeenCalled();
    expect(addChangeListenerSpy).toHaveBeenCalled();
    expect(getUserGroupSpy).toHaveBeenCalled();
  });
  it('should unmount the component after mounting', () => {
    wrapper.unmount();
    expect(removeChangeListenerSpy).toHaveBeenCalled();
  });
});
