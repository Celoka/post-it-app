import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../src/Routes.jsx';
import Home from '../src/components/Home.jsx';
import SignIn from '../src/components/Signin.jsx';
import NotFoundPage from '../src/components/NotFoundPage.jsx';
import DashBoard from '../src/components/DashBoard.jsx';
import ResetPassword from '../src/components/ResetPassword.jsx';


describe('<Routes.jsx/>', () => {
  const wrapper = mount(<MemoryRouter><Routes /></MemoryRouter>);
  it('should have all the', () => {
    expect(wrapper.find(Home).root).toHaveLength(1);
    expect(wrapper.find(SignIn).root).toHaveLength(1);
    expect(wrapper.find(NotFoundPage).root).toHaveLength(1);
    expect(wrapper.find(DashBoard).root).toHaveLength(1);
    expect(wrapper.find(ResetPassword).root).toHaveLength(1);
  });
});
