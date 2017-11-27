import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Routes from '../../src/Routes.jsx';
import Home from '../../src/components/presentation/Home';
import Login from '../../src/components/container/Login';
import NotFoundPage from '../../src/components/presentation/NotFoundPage';
import DashBoard from '../../src/components/container/DashBoard';
import ResetPassword from '../../src/components/container/ResetPassword';

describe('<Routes.jsx/>', () => {
  const wrapper = mount(<MemoryRouter><Routes /></MemoryRouter>);
  it('should contain all the child component in the component', () => {
    expect(wrapper.find(Home).root).toHaveLength(1);
    expect(wrapper.find(Login).root).toHaveLength(1);
    expect(wrapper.find(NotFoundPage).root).toHaveLength(1);
    expect(wrapper.find(DashBoard).root).toHaveLength(1);
    expect(wrapper.find(ResetPassword).root).toHaveLength(1);
  });
});
