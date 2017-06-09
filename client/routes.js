import HomePage from './Components/HomePage.jsx';
import IndexPage from './Components/IndexPage.jsx';
import LoginPage from './Container/LoginPage.jsx';
import SignUpPage from './Container/SignUpPage.jsx';

const routes = {
  // base component (wrapper for the whole application).
  component: IndexPage,
  childRoutes: [

    {
      path: '/',
      component: HomePage
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    }

  ]
};

export default routes;
