import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import mockApiCall from '../../__mocks__/axios';
import AppActions from '../../src/actions/AppActions';
import ResetPassword from '../../src/components/ResetPassword.jsx';
import Navbar from '../../src/components/Navbar.jsx';

describe('<ResetPassword />', () => {
  const resetPasswordSpy = jest.spyOn(AppActions, 'resetPassword');

  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
  });

  const wrapper = mount(<ResetPassword />,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: {
        router: {
          history: {
            push: () => null,
            replace: () => null,
            createHref: () => null,
            exact: true,
            path: '/resetpassword',
            component: '[function ResetPassword]',
            location: {
              pathname: '/resetpassword',
              search: '',
              hash: '',
              key: '9no4lb'
            },
            computedMatch: {
              path: '/resetpassword',
              url: '/resetpassword',
              isExact: true,
              params: {}
            }
          }
        }
      }
    });
  it('should contain a <Header /> component', () => {
    const component = wrapper.find(Navbar);
    assert.equal(component.length, 0);
  });
  it('should find form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });
  it('should have initial state set to empty', () => {
    expect(wrapper.state().email).toEqual('');
  });
  it('should find fieldset', () => {
    expect(wrapper.find('fieldset')).toHaveLength(1);
  });
  it('should have defined functions', () => {
    expect(wrapper.node.onChange).toBeDefined();
    expect(wrapper.node.onSubmit).toBeDefined();
  });
  it('should redirect to home page after button click', () => {
    wrapper.find('form').simulate('submit');
    expect(resetPasswordSpy).toHaveBeenCalled();
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
});
