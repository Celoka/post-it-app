import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'chai';

import MessageBoard from '../src/components/MessageBoard.jsx';
import MessageForm from '../src/components/MessageForm.jsx';

describe('<MessageBoard/>', () => {
  it('should contain <MessageForm/> component', ()=> {
    const wrapper = shallow(<MessageBoard/>);
    expect(wrapper.find(MessageForm)).to.have.length(1);
  });
  it('should contain props for messageform', ()=> {
    const wrapper = shallow(<MessageBoard/>);
    expect(wrapper.props().groupname).to.be.defined;
  });
  it('should have a form ', ()=> {
    const wrapper = shallow(<MessageBoard/>);
    expect(wrapper.find('form')).to.have.length(1);
  })
  it('should have a textarea for message input', ()=> {
    const wrapper = shallow(<MessageBoard/>);
    expect(wrapper.find('textarea')).to.have.length(1);
  });
  it('should have a button', ()=> {
    const wrapper = shallow(<MessageBoard/>);
    expect(wrapper.find('button')).to.have.length(1);
  });
  it('should have a select ', ()=> {
    const wrapper = shallow(<MessageBoard/>);
    expect(wrapper.find('select')).to.have.length(1);
  });
  it('should have a option ', ()=> {
    const wrapper = shallow(<MessageBoard/>);
    expect(wrapper.find('option')).to.have.length(3);
  });
  it('should have anempty initial state', ()=> {
    const wrapper = shallow(<MessageBoard/>);
    expect(wrapper.state().message).to.equal('');
    expect(wrapper.state().groupId).to.equal('');
  })
});
