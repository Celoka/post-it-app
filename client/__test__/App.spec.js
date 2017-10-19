import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import App from '../src/components/App.jsx';

describe('<App />', () => {
  it('should contain <Routes />', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(App)).to.have.length(0);
  });
//   it('should contain <BrowserRouter />', ()=> {
//       const wrapper = shallow(<App/>);
//       expect(wrapper.find(Routes)).to.have.lenght(1);
//   })
});

