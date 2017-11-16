import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import mockApiCall from '../__mocks__/axios';
import firebase from '../src/firebase/index';
import Login from '../src/components/Login.jsx';
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
  const props = {
    history: { push: jest.fn() },
    router: {
      history: { push: jest.fn() },
    },
    loginUser: jest.fn(() => Promise.resolve())
  };
  const wrapper = mount(<Login {...props}/>,
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

  it('should find a link', () => {
    expect(wrapper.find(Link).at(4).prop('to')).toEqual('/resetpassword');
  });
  it('should have an empty initial state', () => {
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().isConfirmed).toBe(null);
  });
  it('should find label', () => {
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
  it('should contain a google button', () => {
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
});
