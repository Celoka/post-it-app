import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import App from '../src/components/App.jsx';
import Routes from '../src/Routes.jsx';

describe('<App />', () => {
  it('should contain browser router ', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(BrowserRouter)).to.have.length(1);
  });

  it('contains a <Routes /> component', ()=> {
       const wrapper = mount(<App/>);
       expect(wrapper.find(Routes)).to.have.length(1);
  })
});

