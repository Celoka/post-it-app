import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import mockApiCall from '../__mocks__/axios';
import firebase from '../src/firebase/index';
import SignIn from '../src/components/Signin.jsx';
import Navbar from '../src/components/Navbar.jsx';
import AppActions from '../src/actions/AppActions';

jest.mock('../src/firebase/index', () => {
/**
 * @description describes a function that mocks firebase module,
 * fires it action to make an Api call, returns a promise that is mocked
 *
 * @param { void } void takes no parameter
 *
 * @return { object } mockfirebase object
 *
 * @function Test
 */
  function Test() {

  }
  const mockFirebase = jest.fn().mockReturnValue({
    signInWithPopup: jest.fn().mockReturnValue(Promise.resolve({
      user: 'testUser'
    }))
  });
  Test.prototype.addScope = jest.fn();
  mockFirebase.GoogleAuthProvider = Test;
  return {
    auth: mockFirebase,
  };
});

describe('<Signin/>', () => {
  const loginUserSpy = jest.spyOn(AppActions, 'loginUser');
  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
  });

  const wrapper = mount(<SignIn />,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: { router: {
        history: {
          push: () => null,
          replace: () => null,
          createHref: () => null,
          path: '/signin',
          component: '[function SignIn]',
          location: {
            pathname: '/signin',
            search: '',
            hash: '',
            key: 'g5nscy'
          },
          computedMatch: {
            path: '/signin',
            url: '/signin',
            isExact: true,
            params: {}
          }
        }
      }
      }
    }
  );

  it('should contain a <Navbar /> component', () => {
    console.log(wrapper.nodes[0].onChange)
    expect(wrapper.find(Navbar).root.length).toEqual(1);
  });
  it('should find a link', () => {
    expect(wrapper.find(Link).at(4).prop('to')).toEqual('/resetpassword');
  });
  it('should find a form', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('should find fieldset', () => {
    expect(wrapper.find('fieldset').length).toEqual(1);
  });
  it('should have an empty initial state', () => {
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().user.length).toEqual(0);
  });
  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
    expect(wrapper.nodes[0].getCurrentUser).toBeDefined();
    expect(wrapper.nodes[0].googleSignIn).toBeDefined();
  });
  it('should find label', () => {
    expect(wrapper.find('label').length).toEqual(3);
  });
  it('should find a button', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('should register a user on click of button', () => {
    wrapper.find('form').simulate('submit');
    expect(loginUserSpy).toHaveBeenCalled();
  });
  it('should redirect to another page on click of a button', () => {
    wrapper.find(Link).at(4).simulate('click');
  });
  it('should contain a google button', () => {
    wrapper.find(GoogleButton).simulate('click');
    expect(firebase.auth.GoogleAuthProvider.prototype.addScope)
    .toHaveBeenCalledTimes(2);
    expect(firebase.auth().signInWithPopup).toHaveBeenCalled();
  });
});
