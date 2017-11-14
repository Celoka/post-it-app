import axios from 'axios';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { ToastrError, setCurrentUser, setAuthToken } from '../utils/';


const AppActions = {
  /**
   * @description describes an action that makes
   * API call to the server for a post request
   * to register a user
   *
   * @param { Object } credentials
   *
   * @returns { Object } returns registered user registration details
   */
  registerUser(credentials) {
    return axios
      .post('/api/v1/user/signup', credentials)
      .then((response) => {
        setCurrentUser(response);
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
        setCurrentUser(response);
      })
      .catch(ToastrError);
  },
  /**
   * @description describes an actions that makes a call to
   * google login API with a resolved promised from google
   * sign in with popup
   *
   * @param { Object } googleUserDetails
   *
   * @returns { Object } return google
   */
  googleLogin(googleUserDetails) {
    return axios
      .post('/api/v1/user/googlesignin', googleUserDetails)
      .then((response) => {
        const { jwtToken } = response.data;
        localStorage.setItem('token', jwtToken);
        setAuthToken(jwtToken);
        const userDetails = jwt.decode(localStorage.token);
        localStorage.setItem('displayName',
        JSON.stringify(userDetails.displayName));
        localStorage.setItem('email',
        JSON.stringify(userDetails.email));
        localStorage.setItem('uid', userDetails.uid);
        const googleData = response.data;
        AppDispatcher.dispatch({
          actionType: AppConstants.GOOGLE_LOGIN,
          googleData
        });
        return { isConfirmed: response.data.isConfirmed };
      })
      .catch((error) => {
        toastr.error(error.message);
      });
  },

  googleUpdate(credential) {
    return axios.post('/api/v1/user/googleupdate', credential)
    .then((response) => {
      const userData = response.data;
      AppDispatcher.dispatch({
        actionType: AppConstants.GOOGLE_UPDATE,
        userData
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
        const { groupName } = response.data;
        const groupData = response.data;
        toastr.success(`${groupName} created successfully`);
        AppDispatcher.dispatch({
          actionType: AppConstants.SET_GROUP_NAME,
          groupData
        });
        $('#myModal').modal('hide');
        return true;
      })
     .catch(ToastrError);
  },

/**
 * @description describes an action that makes
 * API call to the server for a get request to fetch
 * all user groups
 *
 * @param { object } userId
 *
 * @returns { Object } returns all user groups group details
 */
  loadGroups(userId) {
    return axios
      .get(`/api/v1/${userId}/groups`)
      .then((response) => {
        const { userGroups } = response.data;
        AppDispatcher.dispatch({
          actionType: AppConstants.LOAD_GROUP_NAMES,
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
  loadGroupMessage(groupId) {
    return axios
      .get(`/api/v1/group/${groupId}`)
      .then((response) => {
        const message = response.data.groupMessage;
        AppDispatcher.dispatch({
          actionType: AppConstants.LOAD_GROUP_MESSAGES,
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
      .then((response) => {
        const usersDetails = response.data.users;
        AppDispatcher.dispatch({
          actionType: AppConstants.LOAD_NEW_USERS,
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
      const memberDisplayName = response.data.displayName;
      const userData = response.data;
      toastr.success(`${memberDisplayName} added successfully`);
      AppDispatcher.dispatch({
        actionType: AppConstants.ADD_USER_TO_GROUP,
        userData
      });
      $('#my-Modal').modal('hide');
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
  getAllUsers() {
    return axios
    .get('/api/v1/allusers')
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
        localStorage.clear(response);
      })
      .catch(ToastrError);
  },
};

export default AppActions;
