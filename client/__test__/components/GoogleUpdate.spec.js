import React from 'react';
import { mount } from 'enzyme';
import GoogeleUpdate from '../../src/components/container/GoogleUpdate';

describe('<GoogleUpdate />', () => {
  const wrapper = mount(<GoogeleUpdate />,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: {
        router: {
          history: {
            push: () => null,
            createHref: () => null,
            replace: () => null,
            path: '/googlepage',
            component: '[function GoogleUpdate]',
            location: {
              pathname: '/googlepage',
              search: '',
              hash: ''
            },
            computedMatch: {
              path: '/googlepage',
              url: '/googlepage',
              isExact: true,
              params: {}
            }

          }
        }
      }
    }
  );
  it('should show the initial state of the component when it mounts', () => {
    expect(wrapper.state().phoneNumber).toEqual('');
    expect(wrapper.state().email).toBe(null);
    expect(wrapper.state().displayName).toBe(null);
    expect(wrapper.state().uid).toBe(null);
  });

  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(
      wrapper.instance(), 'onChange'
    );

    const event = {
      target: {
        phoneNumber: 'user@email.com'
      }
    };

    wrapper.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should call onSubmit method', () => {
    const onSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onSubmit'
    );
    wrapper.setState({
      credential: {}
    });
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalled();
  });
});
