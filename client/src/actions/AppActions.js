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
   * @param { Object } credentials contains registration details of a new user
   * email, password, username, phonenumber
   *
   * @returns { void }
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
 * @param { Object } signInDetails contains the login details of a
 * user
 *
 * @returns { void }
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
   * @param { Object } googleUserDetails contains details of a user
   * from google
   *
   * @returns { boolean } this confirms the status of a google user
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

  /**
   * @description describes an actions that makes a call to
   * API, posts a first time google user account details to for update
   *
   * @param { Object } credential contains details the phone number, uid
   * displayName of a the google user
   *
   * @returns { boolean } this confirms the status of a google user
   */
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
 * @param { Object } groupDetail contains the details of a
 * a user group
 *
 * @returns { boolean } return a boolean after promise has been resolved
 * to close modal
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
 * @param { string } userId contains the user id of the current
 * user to for the aim of fetching groups
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
 * @param { Object } messageDetail contains messagedetails
 * @param {String } groupId contains the group id of a speciific
 * usergroup that a message has been posted to
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
 * @param { String } groupId this group id is used to
 * fetch group messages in a particular user group
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
 * @param {String } groupId this group id is used to fetch
 * group member that has just been added to the group
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
 * @param { Object } userDetails contains the name and uid of
 * the user to be added to group
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
 * @param { Object } resetEmail this contains email
 * address of a user
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
