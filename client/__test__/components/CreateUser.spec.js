import React from 'react';
import { mount } from 'enzyme';
import CreateUser from '../../src/components/container/CreateUser.jsx';
import AppActions from '../../src/actions/AppActions';


describe('<Signup/>', () => {
  const wrapper = mount(<CreateUser />,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: {
        router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            path: '/signup',
            component: '[function CreateUser]',
            location: {
              pathname: '/signup',
              search: '',
              hash: '',
              key: 'xmsy02'
            },
            computedMatch: {
              path: '/signup',
              url: '/signup',
              isExact: true,
              params: {}
            }

          }
        }
      }
    }
  );

  it('should redirect to dashboard on click of submit', () => {
    const registerUserSpy = jest.spyOn(AppActions, 'registerUser');
    wrapper.setState({
      email: 'test@yahoo.com',
      password: 'andela2',
      confirmPassword: 'andela2',
      userName: 'TestUser',
      phoneNumber: '2347876445637'
    });
    wrapper.find('form').simulate('submit');
    expect(registerUserSpy).toHaveBeenCalled();
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
  it('should successfully create a user and call onsubmit method', () => {
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
