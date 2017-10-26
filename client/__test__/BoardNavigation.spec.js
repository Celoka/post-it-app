import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router-dom';
import { expect } from 'chai';

import BoardNavigation from '../src/components/BoardNavigation.jsx';
import mockApiCall from '../__mocks__/axios.js';

describe('<BoardNavigation />', () => {
  beforeEach(() => {
    jest.mock('axios', () => mockApiCall);
  });
  const wrapper = mount(<BoardNavigation />,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: { router: {
        history: {
          push: () => null,
          createHref: () => null,
          replace: () => null
        }
      } }
    }
  );
  it('it should contain link', () => {
    expect(wrapper.find(Link)).to.have.length(2);
  });
  it('simulates click event', () => {
    wrapper.find('li').simulate('click');
  });
});
