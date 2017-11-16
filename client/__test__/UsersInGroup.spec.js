import React from 'react';
import { mount } from 'enzyme';
import UsersInGroup from '../src/components/UsersInGroup.jsx';
import AppActions from '../src/actions/AppActions';
import { newProperty, nextProps, event } from '../__mocks__/seeders';

describe('<UsersInGroup/>', () => {
  const addUserToGroupSpy = jest.spyOn(AppActions, 'addUserToGroup');
  const wrapper = mount(<UsersInGroup newProperty={newProperty}/>);
  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(
      wrapper.instance(), 'onChange'
    );
    wrapper.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });
  it('calls a componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(), 'componentWillReceiveProps'
    );
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should add a memebr to group when condition is met', () => {
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


    // wrapper.find('.modal-footer').first().find('button').last()
    // .simulate('click');
  });
});
