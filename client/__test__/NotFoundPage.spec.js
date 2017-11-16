import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import NotFoundPage from '../src/components/NotFoundPage.jsx';

describe('<NotFoundPage/>', () => {
  const wrapper = mount(<NotFoundPage/>,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: { router: {
        history: {
          push: () => null,
          createHref: () => null,
          replace: () => null,
          component: '[function NotFoundPage]',
          location: {
            pathname: '/knjj',
            search: '',
            hash: ''
          },
          computedMatch: {
            path: '/',
            url: '/',
            params: {},
            isExact: false
          }

        }
      } }
    }
);
 
  it('should redirect to gome page on click of a button', () => {
    wrapper.find('Link').at(1).simulate('click');
  });
  it('should find the first jsx element', () => {
    const container = wrapper.first('div');
    assert.equal(container.length, 1);
  });
});
