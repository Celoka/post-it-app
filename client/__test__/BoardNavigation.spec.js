import React from 'react';
import { mount, shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { expect } from 'chai';

import BoardNavigation from '../src/components/BoardNavigation.jsx';

describe('<BoardNavigation />', ()=> {
  it('it should contain link', ()=> {
    const wrapper = shallow(<BoardNavigation />);
    expect(wrapper.find(Link)).to.have.length(2);
  });
  it('simulates click event', ()=> {
    const wrapper = shallow (<BoardNavigation />);
    wrapper.find('li').simulate('click', { preventDefault() {onclick} });
  })
});
