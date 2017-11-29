import React from 'react';
import { mount } from 'enzyme';

import UsersInGroup from '../../src/components/container/UsersInGroup.jsx';
import AppActions from '../../src/actions/AppActions';
import { newProperty, nextProps, event } from '../../__mocks__/seeders';

describe('<UsersInGroup/>', () => {
  const props = {
    userId: [
      {
        displayName: 'West',
        userId: 'A7332TqlocVLBlIxX9r91vGjyVY2'
      },

      {
        displayName: 'Tobi',
        userId: 'A7332TqlocVLBlIxasdfrar91vGjyVY2'
      }
    ]
  };
  const modal = jest.fn();
  const wrapper = mount(<UsersInGroup newProperty={newProperty}
    {...props} modal={modal} />);

  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(
      wrapper.instance(), 'onChange'
    );
    wrapper.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(), 'componentWillReceiveProps'
    );
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(
      wrapper.instance(), 'onChange'
    );
    const events = {
      target: {
        group: 'Andela'
      }
    };
    wrapper.instance().onChange(events);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should add a memebr to group when condition is met', () => {
    const addUserToGroupSpy = jest.spyOn(AppActions, 'addUserToGroup')
      .mockImplementation(() => Promise.resolve({}));
    const onClickSpy = jest.spyOn(
      wrapper.instance(), 'onClick'
    );
    const event2 = {
      preventDefault: jest.fn()
    };
    wrapper.setState(newProperty);
    wrapper.instance().onClick(event2);
    expect(onClickSpy).toHaveBeenCalled();
    expect(addUserToGroupSpy).toHaveBeenCalled();
  });

  it('should call userValidation method', () => {
    const userValidationSpy = jest.spyOn(
      wrapper.instance(), 'userValidation'
    );
    const displayName = 'user';
    wrapper.instance().userValidation(displayName);
    expect(userValidationSpy).toHaveBeenCalled();
  });

  it('should not add a user to group because user does not exist', () => {
    const onClickSpy = jest.spyOn(AppActions, 'addUserToGroup').mockImplementation(() => Promise.reject({}));
    wrapper.setState({
      newUser: 'Andela',
    });
    wrapper.find('button').at(3).simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
