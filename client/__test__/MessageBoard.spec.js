import React from 'react';
import { mount } from 'enzyme';
import mockApiCall from '../__mocks__/axios.js';
import AppActions from '../src/actions/AppActions';
import MessageBoard from '../src/components/MessageBoard.jsx';
import MessageForm from '../src/components/MessageForm.jsx';


describe('<MessageBoard/>', () => {
  let wrapper;
  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
    wrapper = mount(<MessageBoard />);
  });

  it('should contain <MessageForm /> component', () => {
    expect(wrapper.find(MessageForm)).toHaveLength(0);
  });
  it('should have a form ', () => {
    expect(wrapper.find('form').length).toEqual(2);
  });
  it('should change state when button is click', () => {
    wrapper.setState({ groupId: 'eafeafa' });
    const postMessageSpy = jest.spyOn(AppActions, 'postMessage');
    wrapper.find('form').at(1).simulate('submit');
    expect(postMessageSpy).toHaveBeenCalledTimes(1);
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
  it('should have all the method defined', () => {
    expect(wrapper.node.onStoreChange).toBeDefined();
    expect(wrapper.node.handlePriority).toBeDefined();
    expect(wrapper.node.onChange).toBeDefined();
    expect(wrapper.node.onSubmit).toBeDefined();
  });
  it('should have an empty initial state', () => {
    expect(wrapper.state().message).toEqual('');
    expect(wrapper.state().groupId).toEqual('');
    expect(wrapper.state().groupname).toEqual('');
    expect(wrapper.state().groupMessage).toHaveLength(0);
  });
});
