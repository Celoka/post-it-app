import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { MemoryRouter } from 'react-router-dom';

import MessageBoard from '../src/components/MessageBoard.jsx';
import UsersInGroup from '../src/components/UsersInGroup.jsx';
import Group from '../src/components/Group.jsx';
import DashBoard from '../src/components/DashBoard.jsx';
import BoardNavigation from '../src/components/BoardNavigation.jsx';

describe('<DashBoard />', () => {
  const wrapper = mount(<MemoryRouter><DashBoard/></MemoryRouter>);

  it('contains a <BoardNavigation /> component', () => {
    expect(wrapper.find(BoardNavigation)).to.have.length(1);
  });
  it('contains a <Group /> component', () => {
    expect(wrapper.find(Group)).to.have.length(1);
  });
  it('contains a < UsersInGroup /> component', () => {
    expect(wrapper.find(UsersInGroup)).to.have.length(1);
  });
  it('contains a <MessageBoard /> component', () => {
    expect(wrapper.find(MessageBoard)).to.have.length(0);
  });
  it('should have an initial groupId state', () => {
    expect(wrapper.state().groupId.length).to.equal(0);
  });
  it('should not have an initial state to be set', () => {
    expect(wrapper.state().groupname.length).to.equal(0);
    expect(wrapper.state().groupMessage.length).to.equal(0);
    expect(wrapper.state().userId.length).to.equal(0);
    expect(wrapper.state().newMember.length).to.equal(0);
  });
});
