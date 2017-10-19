import axios from 'axios';
import toastr from 'toastr';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const ToastrError = (error) => {
  const status = error.response.data.message;
  toastr.error(status);
};

const AppActions = {

  registerUser(userDetails) {
    return axios
      .post('/user/signup', userDetails)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', JSON.stringify(token));
        const user = response.data.userDetails[0];
        toastr.success(response.data.message);
        AppDispatcher.dispatch({
          actionType: AppConstants.NEW_USER,
          user,
          token
        });
      })
      .catch(ToastrError);
  },


  loginUser(signInDetails) {
    return axios
      .post('/user/signin', signInDetails)
      .then((response) => {
        const { token } = response.data;
        const user = response.data.userDetails[0];
        toastr.success(response.data.message);
        localStorage.setItem('token', JSON.stringify(token));
        AppDispatcher.dispatch({
          actionType: AppConstants.SET_USER,
          user
        });
      })
      .catch(ToastrError);
  },

  createGroup(groupDetail) {
    const groupname = { groupname: groupDetail };
    return axios
      .post('/group', groupname)
      .then((response) => {
        const group = response.data.groupname;
        toastr.success(`${group} created successfully`);
        AppDispatcher.dispatch({
          actionType: AppConstants.CREATE_GROUP,
          group
        });
      })
      .catch(ToastrError);
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
      })
      .catch(ToastrError);
  },

  postMessage(messageDetail, groupId) {
    return axios
      .post(`/groups/${groupId}/message`, messageDetail, groupId)
      .then((response) => {
        const groupMessage = response.data;
        AppDispatcher.dispatch({
          actionType: AppConstants.SET_GROUP_MESSAGE,
          groupMessage
        });
      })
      .catch(ToastrError);
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
      })
      .catch(ToastrError);
  },

  resetPassword(resetEmail) {
    return axios
    .post('/user/passwordreset', resetEmail)
    .then((response) => {
      const status = response.data.message;
      toastr.success(status);
    })
    .catch(ToastrError);
  },

  logOut() {
    return axios
      .post('/user/signout')
      .then((response) => {
        const { token } = response.data;
        localStorage.removeItem('token', token);
      })
      .catch(ToastrError);
  },
};

export default AppActions;
