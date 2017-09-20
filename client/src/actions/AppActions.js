import axios from 'axios';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';


const AppActions = {

  registerUser(userDetails) {
    return axios
      .post('/user/signup', userDetails)
      .then((response) => {
        const { token } = response.data;
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
    return axios
      .get('/groups')
      .then((response) => {
        const { userGroups } = response.data;
        AppDispatcher.dispatch({
          actionType: AppConstants.SET_GROUP,
          userGroups
        });
      });
  },

  loginUser(signInDetails) {
    return axios
      .post('/user/signin', signInDetails)
      .then((response) => {
        const { token } = response.data;
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
    return axios
      .post('/group', groupname)
      .then((response) => {
        const group = response.data.groupname;
        AppDispatcher.dispatch({
          actionType: AppConstants.CREATE_GROUP,
          group
        });
      });
  },
  logOut() {
    return axios
      .post('/user/signout')
      .then((response) => {
        const { token } = response.data;
        localStorage.removeItem('token', token);
      });
  },

  resetPassword(resetEmail) {
    return axios
    .post('/user/passwordreset', resetEmail);
  },

  postMessage(messageDetail, groupId) {
    return axios
      .post(`/groups/${groupId}/message`, messageDetail, groupId)
      .then((response) => {
        const groupMessage = response.data.message;
        AppDispatcher.dispatch({
          actionType: AppConstants.SET_GROUP_MESSAGE,
          groupMessage
        });
      });
  },

  loadMessage(groupId) {
    return axios
      .get(`/group/${groupId}`)
      .then((response) => {
        const message = response.data.groupMessage;
        AppDispatcher.dispatch({
          actionType: AppConstants.LOAD_GROUP_MESSAGE,
          message,
        });
      });
  },
};

export default AppActions;
