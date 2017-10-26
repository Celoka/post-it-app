import React from 'react';
import { mount } from 'enzyme';
import mockApiCall from '../__mocks__/axios.js';
import AppActions from '../src/actions/AppActions';
import MessageBoard from '../src/components/MessageBoard.jsx';
import MessageForm from '../src/components/MessageForm.jsx';


describe('<MessageBoard/>', () => {
  const props = {
    groupname: '',
    messageList: []
  };
  let wrapper;
  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
    wrapper = mount(<MessageBoard props={props}/>);
  });

  it('should contain <MessageForm /> component', () => {
    expect(wrapper.find(MessageForm).length).toEqual(0);
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
  it('should have an empty initial state', () => {
    expect(wrapper.props().props.groupname).toEqual('');
    expect(wrapper.props().props.messageList).toHaveLength(0);
  });
});
