import React from 'react';
import { mount } from 'enzyme';
import UsersInGroup from '../src/components/UsersInGroup.jsx';
import mockApiCall from '../__mocks__/axios';
import AppStore from '../src/stores/AppStore';
import AppActions from '../src/actions/AppActions';


describe('<UsersInGroup/>', () => {
  const addUserToGroupSpy = jest.spyOn(AppActions, 'addUserToGroup');

  const userValidation = jest.fn().mockReturnValue(Promise.resolve({
    newMember: ['testUser']
  }));
  const addChangeListenerSpy = jest.spyOn(AppStore, 'addChangeListener');

  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
  });

  const wrapper = mount(<UsersInGroup/>);
  it('should contain a form, input', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('should contain a center', () => {
    expect(wrapper.find('center').length).toEqual(1);
  });
  it('should contain a button', () => {
    expect(wrapper.find('button').length).toEqual(4);
  });
  it('should contain a input', () => {
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('should contain an empty initial state', () => {
    expect(wrapper.state().newUser).toEqual('');
    expect(wrapper.state().error).toEqual('');
    expect(wrapper.state().message).toEqual('');
    expect(wrapper.state().newMember).toHaveLength(0);
  });
  it('should have on click method to be defined', () => {
    expect(wrapper.node.onClick).toBeDefined();
  });
  it('should have on store change method to be defined', () => {
    expect(wrapper.node.onStoreChange).toBeDefined();
  });
  it('should have user validation method to be defined', () => {
    expect(wrapper.node.userValidation).toBeDefined();
  });
  it('should call componentDidMount() lifecycle method', () => {
    expect(addChangeListenerSpy).toHaveBeenCalled();
  });
  it('should add a memebr to group when condition is met', () => {
    wrapper.setState({
      newUser: 'testUser',
      groupId: 'testId',
      userId: 'testId'
    });
    wrapper.find('button').at(3).simulate('submit');
    expect(userValidation.addUserToGroupSpy).toHaveBeenCalled();
  });
});
