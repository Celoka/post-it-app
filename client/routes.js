import IndexPage from './src/Components/IndexPage.jsx';
import HomePage from './src/Components/HomePage.jsx';
import LoginPage from './src/Container/LoginPage.jsx';
import SignUpPage from './src/Container/SignUpPage.jsx';

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
