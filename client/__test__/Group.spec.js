import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Group from '../src/components/Group.jsx';
import GroupList from '../src/components/GroupList.jsx';

describe('<Group/>', () => {
  const wrapper = mount(<MemoryRouter><Group /></MemoryRouter>);
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
    wrapper.setState({ userGroupName: '' });
    wrapper.find('form').simulate('click');
  });
  it('should have an input for groupname', () => {
    expect(wrapper.find('input')).toHaveLength(1);
  });
  it('should have an initial state set to empty', () => {
    expect(wrapper.state().userGroupName).toEqual('');
    expect(wrapper.state().groupName.length).toHaveLength(0);
  });
});
