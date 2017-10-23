import React from 'react';
import { mount, shallow } from 'enzyme';
// import { expect } from 'chai';

import MessageBoard from '../src/components/MessageBoard.jsx';
import MessageForm from '../src/components/MessageForm.jsx';


describe('<MessageBoard/>', () => {
  const props = {
    groupname: 'name',
    messageList: [{ hello: '1234' }, { eloka: '3333' }]
  };
  const wrapper = shallow(<MessageBoard props={props}/>);
  it('should contain <MessageForm /> component', () => {
    expect(wrapper.find(MessageForm)).toHaveLength(1);
  });
  it('should have a form ', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });
  it('should change state when button is click', () => {
    wrapper.find('form').simulate('click');
  });
  it('should have the component to match all strings', () => {
    expect(wrapper.nodes[0].props.children[1].props.id).toMatch('message');
    expect(wrapper.nodes[0].props.children[1].props.className)
    .toMatch('container-fluid');
  });
  it('should have a textarea for message input', () => {
    expect(wrapper.find('textarea')).toHaveLength(1);
  });
  it('should have a button', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });
  it('should have a select ', () => {
    expect(wrapper.find('select')).toHaveLength(1);
  });
  it('should have a option ', () => {
    expect(wrapper.find('option')).toHaveLength(3);
  });
  it('should have an empty initial state', () => {
    expect(wrapper.state().message).toEqual('');
    expect(wrapper.state().groupId).toEqual('');
    expect(wrapper.state().groupname).toEqual('');
    expect(wrapper.state().groupMessage.length).toEqual(0);
  });
});
