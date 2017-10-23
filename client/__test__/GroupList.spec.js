import React from 'react';
import { shallow } from 'enzyme';
import GroupList from '../src/components/GroupList.jsx';

const KeyName = {
  groupId: 'id',
  groupname: 'name',
};

const setGroupId = jest.fn();
const wrapper = shallow(<GroupList KeyName={KeyName} setGroupId={setGroupId} />);

describe('<GroupList/>', () => {
  it('should find a div', () => {
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should have props for GroupId and GroupName', () => {
    expect(wrapper.nodes[0].props.onClick).toBeDefined();
  });
  it('should update the state on click of a button', () => {
    wrapper.find('div').simulate('click');
  });
  it('should have children that matches name to exist', () => {
    expect(wrapper.node.props.children.props.children).toMatch('name');
  });
  it('should have style name to exist', () => {
    expect(wrapper.node.props.children.props.className).toMatch('list-group-item');
  });
  it('should have have the id style to exist', () => {
    expect(wrapper.node.props.children.props.id).toMatch('style-group');
  });
});
