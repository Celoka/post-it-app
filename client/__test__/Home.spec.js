import React from 'react';
import { Link } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Navbar from '../src/components/Navbar.jsx';
import Home from '../src/components/Home.jsx';


describe('<Home />', () => {
  it('should contain a <Navbar/> component', ()=> {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(Navbar)).to.have.length(1);
  });
  it('should find line break', ()=> {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('br')).to.have.length(2);
  });
  it('should find button', ()=> {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('button')).to.have.length(1);
  });
  it('should find a link tag', ()=> {
    const wrapper = shallow (<Home/>);
    expect(wrapper.find('Link')).to.have.length(1);
  });
  it('should contain a section ', ()=> {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('section')).to.have.length(1);
  })
  it('should redirect on click of a button', ()=> {
    const wrapper = shallow(<Home/>);
    wrapper.find('button').simulate('click');
  });
});