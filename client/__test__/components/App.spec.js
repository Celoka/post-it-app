import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import App from '../../src/components/App.jsx';
import Routes from '../../src/Routes.jsx';

describe('<App />', () => {
  it('should contain browser router ', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(BrowserRouter)).toHaveLength(1);
  });

  it('contains a <Routes /> component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Routes)).toHaveLength(1);
  });
});

