import axios from 'axios';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';


const AppActions = {

  registerUser(user) {
    return axios.post('/user/signup', user)
      .then((response) => {
        const { userDetails } = response.data.message;
        AppDispatcher.dispatch({
          actionType: AppConstants.REGISTER_USER,
          userDetails
        });
      });
  },

  loginUser(signInDetails) {
    return axios.post('user/signin', signInDetails).then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', JSON.stringify(token));
      AppDispatcher.dispatch({
        actionType: AppConstants.LOGIN_USER,
        token
      });
    });
  },

  createGroup(groupDetail) {
    return axios.post('group', groupDetail);
  }
};


// // export function createGroup(group) {
// //   return axios.post('/group', group).then((response) => {
// //     appDispatcher.dispatch({
// //       type: CREATE_USER_GROUP,
// //       group: response.data.group
//     });
//   }).catch((error) => {
//     if (error.response) {
//       console.log(error.response);
//     }
//   });
// }

// export function getGroup(group) {
//   return axios.post('/group', group).then((response) => {
//     appDispatcher.dispatch({
//       type: GET_USER_GROUP,
//       group: response.data.group
//     });
//   }).catch((error) => {
//     if (error.response) {
//       console.log(error.response);
//     }
//   });
// }

export default AppActions;
