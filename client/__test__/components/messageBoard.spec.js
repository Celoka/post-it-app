import React from 'react';
import { mount } from 'enzyme';

import AppActions from '../../src/actions/AppActions';
import MessageBoard from '../../src/components/container/MessageBoard';

describe('<MessageBoard/>', () => {
  const KeyName = {
    groupId: 'id',
    groupname: 'name',
  };
  const length = jest.fn();
  const wrapper = mount(<MessageBoard length={length} KeyName={KeyName} />);

  it('should have a form ', () => {
    expect(wrapper.find('form').length).toEqual(2);
  });

  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(
      wrapper.instance(), 'onChange'
    );
    const event = {
      target: {
        message: 'hello'
      }
    };
    wrapper.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should call onChange method', () => {
    const handlePrioritySpy = jest.spyOn(
      wrapper.instance(), 'handlePriority'
    );
    const event = {
      target: {
        priority: 'normal'
      }
    };
    wrapper.instance().handlePriority(event);
    expect(handlePrioritySpy).toHaveBeenCalled();
  });

  it('Should call postMessage action when a button is clicked', () => {
    wrapper.setState({ groupId: 'eafeafa' });
    const postMessageSpy = jest.spyOn(AppActions, 'postMessage');
    wrapper.find('form').at(1).simulate('submit');
    expect(postMessageSpy).toHaveBeenCalledTimes(1);
  });

  it('ensures that component will change state when it receieves props',
    () => {
      const nextProps = {
        groupId: '-KyybV9vHkNxABB5dnSm',
        groupMessages: [
          {
            messageId: '-Kyybmac4pp2WCL_sKy4',
            message: 'Hello world ',
            timeStamp: 'Wednesday, November 15, 2017 8:40 AM',
            priority: 'Normal',
            displayName: 'West'
          }
        ],
        groupName: 'Andela'
      };
      wrapper.setProps(nextProps);
      expect(wrapper.state('groupId')).toEqual(nextProps.groupId);
      expect(wrapper.state('groupMessages')).toEqual(nextProps.groupMessages);
    });
});
