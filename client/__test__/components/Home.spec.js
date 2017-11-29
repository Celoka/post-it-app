import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../src/components/presentation/Navbar';
import Home from '../../src/components/presentation/Home';

describe('<Home />', () => {
  const wrapper = shallow(<Home />);

  it('should contain a <Navbar/> component', () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });
  it('should have function Navbar to be defined', () => {
    expect(wrapper.nodes[0].props.types).toBeUndefined();
  });
  it('should find line break', () => {
    expect(wrapper.find('br')).toHaveLength(2);
  });
  it('should find button', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });
  it('should find a link tag', () => {
    expect(wrapper.find('Link')).toHaveLength(1);
  });
  it('should contain a section ', () => {
    expect(wrapper.find('section')).toHaveLength(1);
  });
  it('should redirect on click of a button', () => {
    wrapper.find('button').simulate('click');
  });
});
