import React from 'react';
import { mount } from 'enzyme';

import MessageForm from '../src/components/MessageForm.jsx';

describe('<MessageForm/>', () => {
  const props = {
    groupname: 'name',
    messageList: [{ hello: '1234' }, { eloka: '3333' }]
  };
  const wrapper = mount(<MessageForm props={ props }/>);
  it('should contain a form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });
  it('should contain a h1 tag', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
  });
  it('should have a all props', () => {
    expect(wrapper.props().groupname).toBeUndefined();
    expect(wrapper.props().messageList).toBeUndefined();
  });
});
