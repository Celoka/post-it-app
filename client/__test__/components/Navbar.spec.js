import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { expect } from 'chai';

import Navbar from '../../src/components/Navbar';

describe('<Navbar />', () => {
  it('should contain links', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find(Link)).to.have.length(4);
  });
});
