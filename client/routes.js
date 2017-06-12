import HomePage from './src/Components/HomePage.jsx';
import IndexPage from './src/Components/IndexPage.jsx';
import LoginPage from './src/Container/LoginPage.jsx';
import SignUpPage from './src/Container/SignUpPage.jsx';

const Routes = {
  // base component (wrapper for the whole application).
  component: IndexPage,
  childRoutes: [

    {
      path: '/',
      component: HomePage
    },

    {
      path: '/user/signin',
      component: LoginPage
    },

    {
      path: '/user/signup',
      component: SignUpPage
    }

  ]
};

export default Routes;
