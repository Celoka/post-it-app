import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import MessageBoard from '../src/components/MessageBoard.jsx';
import UsersInGroup from '../src/components/UsersInGroup.jsx';
import Group from '../src/components/Group.jsx';
import DashBoard from '../src/components/DashBoard.jsx';
import BoardNavigation from '../src/components/BoardNavigation.jsx';

describe('<DashBoard />', ()=> {
 
   const wrapper = shallow(<DashBoard />);

  it('contains a <BoardNavigation /> component', ()=> {
    wrapper;
    expect(wrapper.find(BoardNavigation)).to.have.length(1);
  });
  it ('contains a <Group /> component', ()=> {
    wrapper;
    expect(wrapper.find(Group)).to.have.length(1);
  });
  it('contains a < UsersInGroup /> component',()=> {
    wrapper;
    expect(wrapper.find(UsersInGroup)).to.have.length(1);
  });
  it('contains a <MessageBoard /> component', ()=> {
    wrapper;
    expect(wrapper.find(MessageBoard)).to.have.length(0);
  });
  it('should have an initial groupId state', ()=> {
    wrapper;
    expect(wrapper.state().groupId).to.equal(null);
  });
  it('should not have an initial state to be set', ()=> {
    wrapper;
    expect(wrapper.state().groupname).to.equal('');
    expect(wrapper.state().groupMessage.length).to.equal(0);
    expect(wrapper.state().userId.length).to.equal(0);
    expect(wrapper.state().newMember.length).to.equal(0);
  });
  
});