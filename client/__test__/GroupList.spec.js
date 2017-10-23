import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import GroupList from '../src/components/GroupList.jsx';

describe('<GroupList/>', () => {
  it('should find a div', () => {
    const wrapper = shallow(<GroupList />);
    expect(wrapper.find('div')).to.have.length(1);
  });
  it('should have props for GroupId and GroupName', ()=> {
    const wrapper = shallow(<GroupList/>);
    expect(wrapper.props().KeyName.groupname).to.be.defined;
    expect(wrapper.props().KeyName.groupId).to.be.defined;
  });
  it('should update the state on click of a button', ()=> {
    const wrapper = shallow(<GroupList/>);
    wrapper.find('div').simulate('click')
  })
});
