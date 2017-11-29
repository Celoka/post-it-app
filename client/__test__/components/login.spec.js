import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';

import mockApiCall from '../../__mocks__/axios';
import firebase from '../../src/firebase/firebase';
import AppActions from '../../src/actions/AppActions';
import Login from '../../src/components/container/Login.jsx';

jest.mock('../../src/firebase/firebase', () => {
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
  const props = {
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    loginUser: jest.fn(() => Promise.resolve())
  };
  const wrapper = mount(<Login {...props} />,
    {
      childContextTypes: { router: React.PropTypes.object },

      context: {
        router: {
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

  it('should find a link', () => {
    expect(wrapper.find(Link).at(4).prop('to')).toEqual('/resetpassword');
  });

  it('should have an empty initial state', () => {
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().isConfirmed).toBe(null);
  });

  it('should find a label', () => {
    expect(wrapper.find('label').length).toEqual(3);
  });

  it('should find a button', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('should register a user on click of button', () => {
    wrapper.setState({
      email: 'andela1.test@yahoo.com',
      password: 'uuryryrurue'
    });
    wrapper.find('form').simulate('submit');
    expect(loginUserSpy).toHaveBeenCalled();
  });

  it('should redirect to another page on click of a button', () => {
    wrapper.find(Link).at(4).simulate('click');
  });

  it('should contain a google button, and firebase method called', () => {
    wrapper.setState({
      isConfirmed: false
    });
    wrapper.find(GoogleButton).simulate('click');
    expect(firebase.auth.GoogleAuthProvider.prototype.addScope)
      .toHaveBeenCalledTimes(2);
    expect(firebase.auth().signInWithPopup).toHaveBeenCalled();
  });

  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(
      wrapper.instance(), 'onChange'
    );
    const event = {
      target: {
        email: 'user@email.com'
      }
    };
    wrapper.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should register a user on click of button', () => {
    const onSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onSubmit'
    );
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.setState({
      email: 'user@email.com',
      password: 'asdf;lkj'
    });
    wrapper.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('should not login a user for invalid credential', () => {
    const registerUserSpy = jest.spyOn(AppActions, 'loginUser').mockImplementation(() => Promise.reject({}));
    wrapper.setState({
      email: '.com',
      password: 'andela2',
    });
    wrapper.find('form').simulate('submit');
    expect(registerUserSpy).toHaveBeenCalled();
  });

  it('should login a user and redirect to dashboard', () => {
    const registerUserSpy = jest.spyOn(AppActions, 'loginUser').mockImplementation(() => Promise.resolve({}));
    wrapper.setState({
      email: 'test@yahoo.com',
      password: 'andela2',
    });
    wrapper.find('form').simulate('submit');
    expect(registerUserSpy).toHaveBeenCalled();
  });

  it('should successfully redirect a google user to dashboard', () => {
    const googleSignInSpy = jest.spyOn(
      wrapper.instance(), 'googleSignIn'
    ).mockImplementation(() => Promise.resolve({}));
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.setState({
      email: 'user@email.com',
      password: 'asdf;lkj'
    });
    wrapper.instance().googleSignIn(event);
    wrapper.find(GoogleButton).simulate('click');
    expect(googleSignInSpy).toHaveBeenCalled();
  });
});
