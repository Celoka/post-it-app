import React from 'react';
import { mount,shallow } from 'enzyme';
import { expect } from 'chai';

import Group from '../src/components/Group.jsx';
import GroupList from '../src/components/GroupList.jsx';

describe ('<Group/>', ()=> {
  
  it('should contain a <GroupList /> component', ()=> {
   const wrapper =  mount(<Group />);
    expect(wrapper.find(GroupList)).to.have.length(0);
  });
  it('should have a button', ()=> {
    const wrapper =  shallow(<Group />);
    expect(wrapper.find('button')).to.have.length(4);
  });
  it('should find a form', ()=> {
    const wrapper = shallow(<Group/>);
    expect(wrapper.find('form')).to.have.length(1);
  })
  it('should update the state when on click of a button', ()=> {
    const wrapper = mount(<Group/>);
    wrapper.setState({ userGroupName: 'Eloka' });
    wrapper.find('form').simulate('click');
  });
  it('should have an input for groupname', ()=> {
    const wrapper =  shallow(<Group />);
    expect(wrapper.find('input')).to.have.length(1);
  });
  it('should have an initial state set to empty', ()=> {
    const wrapper =  shallow(<Group />);
    expect(wrapper.state().userGroupName).to.equal('');
    expect(wrapper.state().groupName.length).to.equal(0);
  })
});