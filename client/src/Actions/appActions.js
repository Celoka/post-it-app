import axios from 'axios';
import dispatcher from '../Dispatcher/dispatcher';
import Constants from '../Actions/appActiontypes';

const ViewActions = {
  signUp: () => {
    axios.post('/user/signup', {
      email: '',
      password: '',
      username: ''
    })
    .then(() => {
      dispatcher.handleViewAction({
        type: Constants.LOGIN_USER,
      });
    })
    .catch((err) => {
      dispatcher({
        type: Constants.REGISTRATION_FAILURE,
        err: err.message,
        status: 'Unable to register'
      });
    });
  },

  signIn: () => {
    axios.post('/user/signin', {
      email: '',
      password: ''
    })
    .then(() => {
      dispatcher.handleViewAction({
        type: Constants.GET_GROUPS,
      });
    })
    .catch((err) => {
      dispatcher({
        type: Constants.LOGIN_FAILURE,
        err: err.message,
        status: 'Unable to login'
      });
    });
  },

  signOut: () => {
    dispatcher.handleViewAction({
      type: Constants.SIGN_OUT
    });
  }
};

export default ViewActions;
