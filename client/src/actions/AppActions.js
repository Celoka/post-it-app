import axios from 'axios';
import toastr from 'toastr';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';


/**
 * @function ToastrError
 *
 * @return { object } error message
 *
 * @param { * } error
 */
const ToastrError = (error) => {
  const status = error.response.data.message;
  toastr.error(status);
};

const AppActions = {

  /**
   * @description describes an action that makes
   * API call to the server for a post request
   * to register a user
   *
   * @param { Object } userDetails
   *
   * @returns { Object } returns registered user registration details
   */
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

/**
 * @description describes an action that makes
 * API call to the server for a post request to sign in
 * a user
 *
 * @param { Object } signInDetails
 *
 * @returns { Object } returns registered user details
 */
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
/**
 * @description describes an action that makes
 * API call to the server for a post request to create
 * a user group
 *
 * @param { Object } groupDetail
 *
 * @returns { Object } returns created group details
 */
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

/**
 * @description describes an action that makes
 * API call to the server for a get request to fetch
 * all user groups
 *
 *
 * @returns { Object } returns all user groups group details
 */
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

/**
 * @description describes an action that makes
 * API call to the server for a post/get request to post
 * a message to user group and fetch group messages
 *
 * @param { Object } messageDetail
 * @param {String } groupId
 *
 * @returns { Object } returns group message and details
 */
  postMessage(messageDetail, groupId) {
    return axios
      .post(`/groups/${groupId}/message`, messageDetail, groupId)
      .then((response) => {
        const groupMessage = response.data;
        AppDispatcher.dispatch({
          actionType: AppConstants.SET_GROUP_MESSAGE,
          groupMessage
        });
        axios
      .get(`/group/${groupId}`)
      .then((res) => {
        const message = res.data.groupMessage;
        AppDispatcher.dispatch({
          actionType: AppConstants.LOAD_GROUP_MESSAGE,
          message,
        });
      })
      .catch(ToastrError);
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
/**
 * @description describes an action that makes
 * API call to the server for a get request to fetch users
 * added to user group
 *
 * @param {String } groupId
 *
 * @returns { Object } returns user details of added member
 */
  getNewUsers(groupId) {
    return axios
      .get(`/groups/${groupId}/members`, groupId)
      .then((res) => {
        const usersDetails = res.data.users;
        AppDispatcher.dispatch({
          actionType: AppConstants.GET_NEW_USERS,
          usersDetails
        });
      })
      .catch(ToastrError);
  },

/**
 * @description describes an action that makes
 * API call to the server for a post request to add
 * a member to a user group
 *
 * @param { Object } userDetails
 *
 * @returns { Object } returns user details and a message
 *
 */
  addUserToGroup(userDetails) {
    return axios
    .post('/group/groupId/user', userDetails)
    .then((response) => {
      const message = response.data.message;
      toastr.success(response.data.message);
      AppDispatcher.dispatch({
        actionType: AppConstants.ADD_MEMBER_TO_GROUP,
        message
      });
    })
    .catch(ToastrError);
  },
/**
 * @description describes an action that makes
 * API call to the server for a get request to fetch
 * all users in agroup
 *
 * @returns { Object } returns details of users in a group
 *
 */
  getUsersInGroup() {
    return axios
    .get('/user/allusers')
    .then((response) => {
      const allUsers = response.data.usersDetails;
      AppDispatcher.dispatch({
        actionType: AppConstants.GET_ALL_USERS,
        allUsers
      });
    })
    .catch(ToastrError);
  },
/**
 * @description describes an action that makes
 * API call to the server for a post request to send
 * reset password link to a registered user
 *
 * @param { Object } resetEmail
 *
 * @returns { Object } returns email and success message
 *
 */
  resetPassword(resetEmail) {
    return axios
    .post('/user/passwordreset', resetEmail)
    .then((response) => {
      const status = response.data.message;
      toastr.success(status);
    })
    .catch(ToastrError);
  },
/**
 * @description describes an action that makes
 * API call to the server for a post request to
 * sign out a user
 *
 * @returns { Object } returns a user object
 *
 */
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
