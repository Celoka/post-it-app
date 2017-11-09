import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { MemoryRouter } from 'react-router-dom';

import NotFoundPage from '../src/components/NotFoundPage.jsx';

describe('<NotFoundPage/>', () => {
  const wrapper = mount(<MemoryRouter><NotFoundPage/></MemoryRouter>);
  it('should contain a link ', () => {
    expect(wrapper.find('Link')).toHaveLength(1);
  });
  it('should redirect to gome page on click of a button', () => {
    wrapper.find('Link').simulate('click');
  });
  it('should find the first jsx element', () => {
    const container = wrapper.first('div');
    assert.equal(container.length, 1);
  });
});
