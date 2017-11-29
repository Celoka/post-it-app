import React from 'react';
import { mount } from 'enzyme';
import AppActions from '../../src/actions/AppActions';
import MessageBoard from '../../src/components/container/MessageBoard';


describe('<MessageBoard/>', () => {
  const wrapper = mount(<MessageBoard />);

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

  it('should change state when button is click', () => {
    wrapper.setState({ groupId: 'eafeafa' });
    const postMessageSpy = jest.spyOn(AppActions, 'postMessage');
    wrapper.find('form').at(1).simulate('submit');
    expect(postMessageSpy).toHaveBeenCalledTimes(1);
  });
  it('calls a componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(), 'componentWillReceiveProps'
    );
    const nextProps = {
      groupId: '-KyybV9vHkNxABB5dnSm',
      groupMessage: [
        { messageId: '-Kyybmac4pp2WCL_sKy4',
          message: 'Hello world ',
          timeStamp: 'Wednesday, November 15, 2017 8:40 AM',
          priority: 'Normal',
          displayName: 'West' }
      ],
      groupName: 'Andela'
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});
