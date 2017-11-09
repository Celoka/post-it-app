import axios from 'axios';
import toastr from 'toastr';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ToastrError from '../vendors/index';


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
      .post('/api/v1/user/signup', userDetails)
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
      .post('/api/v1/user/signin', signInDetails)
      .then((response) => {
        const { token } = response.data;
        const user = response.data.userDetails[0];
        localStorage.setItem('token', JSON.stringify(token));
        toastr.success(response.data.message);
        AppDispatcher.dispatch({
          actionType: AppConstants.SET_USER,
          user
        });
      })
      .catch(ToastrError);
  },
  /**
   * @description describes an actions that makes a call to
   * google login API with a resolved promised from google
   * sign in with popup
   *
   * @param { Object } result
   *
   * @returns { Object } return google
   */
  googleLogin(result) {
    return axios
      .post('/api/v1/user/googlesignin', result)
      .then((response) => {
        const token = response.data.user.stsTokenManager.accessToken;
        const googleUser = response.data.user;
        const displayName = response.data.user.displayName;
        localStorage.setItem('token', JSON.stringify(token));
        toastr.success(`Welcome ${displayName}`);
        AppDispatcher.dispatch({
          actionType: AppConstants.GOOGLE_LOGIN,
          googleUser
        });
      })
      .catch((error) => {
        toastr.error(error.message);
      });
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
    return axios
      .post('/api/v1/group', groupDetail)
      .then((response) => {
        const groupName = response.data.groupName;
        toastr.success(`${groupName} created successfully`);
        AppDispatcher.dispatch({
          actionType: AppConstants.CREATE_GROUP,
          groupName
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
      .get('/api/v1/groups')
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
 * a message to user group
 *
 * @param { Object } messageDetail
 * @param {String } groupId
 *
 * @returns { Object } returns group message and details
 */
  postMessage(messageDetail, groupId) {
    return axios
      .post(`/api/v1/groups/${groupId}/message`, messageDetail, groupId)
      .then((response) => {
        const groupMessage = response.data;
        AppDispatcher.dispatch({
          actionType: AppConstants.SET_GROUP_MESSAGE,
          groupMessage
        });
      })
    .catch(ToastrError);
  },

/**
 * @description describes an action that makes
 * API call to the server for a get request to get
 * message in a group
 *
 * @param { String } groupId
 *
 * @returns { Object } returns group message and details
 */
  loadMessage(groupId) {
    return axios
      .get(`/api/v1/group/${groupId}`)
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
      .get(`/api/v1/groups/${groupId}/members`, groupId)
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
    .post('/api/v1/group/groupId/user', userDetails)
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
    .get('/api/v1/user/allusers')
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
    .post('/api/v1/user/passwordreset', resetEmail)
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
      .post('api/v1/user/signout')
      .then((response) => {
        const { token } = response.data;
        localStorage.removeItem('token', token);
      })
      .catch(ToastrError);
  },
};

export default AppActions;
