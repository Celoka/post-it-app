import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import App from '../../src/components/presentation/App';
import Routes from '../../src/Routes';

describe('<App />', () => {
  const wrapper = mount(<App />);
  it('should contain browser router ', () => {
    expect(wrapper.find(BrowserRouter)).toHaveLength(1);
  });

  it('contains a <Routes /> component', () => {
    expect(wrapper.find(Routes)).toHaveLength(1);
  });
});

