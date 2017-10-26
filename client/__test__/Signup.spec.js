import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Link } from 'react-router-dom';
import Signup from '../src/components/Signup.jsx';
import mockApiCall from '../__mocks__/axios';
import Navbar from '../src/components/Navbar.jsx';
import AppActions from '../src/actions/AppActions';


describe('<Signup/>', () => {
  const registerUserSpy = jest.spyOn(AppActions, 'registerUser');

  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
  });

  const wrapper = mount(<MemoryRouter><Signup /></MemoryRouter>);
  it('should contain a <Navbar /> component', () => {
    expect(wrapper.find(Navbar).length).toEqual(0);
  });
  it('should test that the node contains a function', () => {
    expect(wrapper.nodes[0].props.children.type).toBeDefined();
  });
  it('should redirect to dashboard on click of submit', () => {
    expect(wrapper.find('form').length).toEqual(1);
    wrapper.find('form').simulate('submit');
    expect(registerUserSpy).toHaveBeenCalled();
  });
  it('should contain a label', () => {
    expect(wrapper.find('label').length).toEqual(4);
  });
  it('should contain a fieldset', () => {
    expect(wrapper.find('fieldset').length).toEqual(1);
  });
});
