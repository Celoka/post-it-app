import React from 'react';
import { mount } from 'enzyme';
import UsersInGroup from '../../src/components/UsersInGroup.jsx';
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
      },
    ]
  };
  const addUserToGroupSpy = jest.spyOn(AppActions, 'addUserToGroup');
  const wrapper = mount(<UsersInGroup newProperty={newProperty} {...props} />);
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

  it('should add a memebr to group when condition is met', () => {
    global.$ = () => null;
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
    global.modal = () => null;
    const userValidationSpy = jest.spyOn(
      wrapper.instance(), 'userValidation'
    );
    const displayName = 'user';
    wrapper.instance().userValidation(displayName);
    expect(userValidationSpy).toHaveBeenCalled();
  });

  it('should call openAddMemberModal', () => {
    const openAddMemberModalSpy = jest.spyOn(
      wrapper.instance(), 'openAddMemberModal'
    );
    const event3 = {
      preventDefault: jest.fn()
    };
    wrapper.instance().openAddMemberModal(event3);
    expect(openAddMemberModalSpy).toHaveBeenCalled();
  });
});
