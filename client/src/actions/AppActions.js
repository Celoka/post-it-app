import axios from 'axios';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';


const AppActions = {

  registerUser(userDetails) {
    return axios.post('/user/signup', userDetails)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', JSON.stringify(token));
        const user = response.data.userDetails[0];
        AppDispatcher.dispatch({
          actionType: AppConstants.SET_USER,
          user,
          token
        });
      });
  },

  loadGroups() {
    return axios.get('/groups')
    .then((response) => {
      const userGroups = response.data.userGroups.map(groups => groups.groupname);
      AppDispatcher.dispatch({
        actionType: AppConstants.SET_GROUP,
        userGroups
      });
    });
  },

  loginUser(signInDetails) {
    return axios.post('/user/signin', signInDetails)
    .then((response) => {
      const token = response.data.token;
      const user = response.data.userDetails[0];
      localStorage.setItem('token', JSON.stringify(token));
      AppDispatcher.dispatch({
        actionType: AppConstants.SET_USER,
        user
      });
    });
  },

  createGroup(groupDetail) {
    const groupname = { groupname: groupDetail };
    return axios.post('/group', groupname)
    .then((response) => {
      const group = response.data.group;
      AppDispatcher.dispatch({
        actionType: AppConstants.CREATE_GROUP,
        group
      });
    });
  },

  // getGroup(groupDetails) {
  //   return axios.get('/user/group', groupDetails)
  //   .then((response) => {
  //     const group = response.data.group;
  //     AppDispatcher.dispatch({
  //       actionType: AppConstants.GET_GROUP,
  //       group
  //     });
  //   });
  // },

  logOut() {
    return axios.post('/user/signout')
    .then((response) => {
      const token = response.data.token;
      localStorage.removeItem('token', token);
    });
  },

  resetPassword(resetEmail) {
    return axios.post('/user/passwordreset', resetEmail);
  },

  postMessage(messageDetail) {
    return axios.post('/groupname/message', messageDetail)
    .then((response) => {
      const groupMessage = response.data.group;
      console.log(groupMessage);
      AppDispatcher.dispatch({
        actionType: AppConstants.POST_MESSAGE,
        groupMessage
      });
    });
  },

  loadMessages() {
    return axios.get('/group/message')
    .then((response) => {
      const groupMessage = response.data.userGroups.map(groups => groups.messages);
      AppDispatcher.dispatch({
        actionType: AppConstants.SET_GROUP_MESSAGE,
        groupMessage
      });
    });
  },
};

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
