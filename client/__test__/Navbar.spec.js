import React from 'react';
import { mount, shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { expect } from 'chai';

import Navbar from '../src/components/Navbar';

describe('<Navbar />', () => {
    it('', () => {
        const wrapper = shallow(<Navbar />);

        expect(wrapper.find(Link)).to.have.length(4);
    });
});