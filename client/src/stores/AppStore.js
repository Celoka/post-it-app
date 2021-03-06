import { EventEmitter } from 'events';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { setAuthToken } from '../utils/';

const CHANGE_EVENT = 'change';

let newMember = [];
let currentUser = [];
const groupStore = [];
let usersGroups = [];
const newMessage = [];
let allMessages = [];
let allUserDetails = [];
let googleUsers = [];
let googleUserUpdate = [];
const addRegisteredUser = [];

/**
 * @description describes a function that sets a new message
 * posted to a group
 *
 * @function saveGroupMessage
 *
 * @param { Object } groupMessage
 *
 * @returns { Array } returns message posted to group
 */
function saveGroupMessage(groupMessage) {
  newMessage.push(groupMessage);
  return newMessage;
}

/**
 * @description describes a function that sets a messages
 * existing
 *
 * @function allGroupMessages
 *
 * @param { Object } message
 *
 * @returns { Array } returns all messages posted
 */
function allGroupMessages(message) {
  allMessages = message;
  return allMessages;
}

/**
 * @description describes a function that sets a user
 *
 * @function setCurrentUser
 *
 * @param { Object } userDetails
 *
 * @returns { Array } returns an array of object of new user
 */
function setCurrentUser(userDetails) {
  currentUser = userDetails;
  return currentUser;
}

/**
 * @description describes a function that sets all users details in a group
 *
 * @function setAllUsers
 *
 * @param { Object } allUsers
 *
 * @returns { Array } returns an array of object of all users
 */
function setAllUsers(allUsers) {
  allUserDetails = allUsers;
  return allUserDetails;
}

/**
 * @description describes a function that adds member to a group
 *
 * @function setAddMember
 *
 * @param { String } userData
 *
 * @returns { String } returns name of added user
 */
function setAddMember(userData) {
  addRegisteredUser.push(userData);
  return addRegisteredUser;
}

/**
 * @description describes a function that fetches a and sets it
 * member to a group
 *
 * @function setNewMember
 *
 * @param { Object } usersDetails
 *
 * @returns { Array } returns details of a member added to group
 */
function setNewMember(usersDetails) {
  newMember = usersDetails;
  return newMember;
}
/**
* @description describes a function that sets a group
*
* @function setNewMember
*
* @param { String } groupData
*
* @returns { String } returns name of group as string
*/
function currentGroup(groupData) {
  groupStore.push(groupData);
  return groupStore;
}

/**
 * @description describes a function that fetches user groups and sets it
 * member to a group
 *
 * @function setUserGroup
 *
 * @param { Object } userGroups
 *
 * @returns { Array } returns details of a member added to group
 */
function setUserGroup(userGroups) {
  usersGroups = userGroups;
  return usersGroups;
}

/**
 * @description describes a function that sets a new user using
 * google as a sign in method
 *
 * @function setNewGoogleUser
 *
 * @param { Object } googleData
 *
 * @returns { Array } details of a google user
 */
function setNewGoogleUser(googleData) {
  const jwtToken = googleData.jwtToken;
  localStorage.setItem('token', jwtToken);
  setAuthToken(jwtToken);
  const userDetails = jwt.decode(localStorage.token);
  localStorage.setItem('displayName',
    JSON.stringify(userDetails.displayName));
  localStorage.setItem('email',
    JSON.stringify(userDetails.email));
  localStorage.setItem('uid', userDetails.uid);
  googleUsers = googleData;
  return googleUsers;
}

/**
 * @description describes a function that sets a user
 * updating account with phone number
 *
 * @function setGoogleUpdate
 *
 * @param { Object } userData
 *
 * @returns { Array } google user update details
 */
function setGoogleUpdate(userData) {
  const jwtToken = userData.jwtToken;
  const displayName = jwt.decode(jwtToken).displayName;
  toastr.success(`Welcome, ${displayName}`);
  googleUserUpdate = userData;
  return googleUserUpdate;
}

/**
 *
 * @class AppStoreClass
 *
 * @extends {EventEmitter}
 */
class AppStoreClass extends EventEmitter {

  /**
   * @description AppStore emit event change
   *
   * @memberof AppStoreClass
   *
   * @method emitChange
   *
   * @returns { void }
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @description AppStore change listener. Listens to change from the store
   * with respect to the listener in the component
   *
   * @param { Object } callback
   *
   * @method addChangeListener
   *
   * @memberof AppStoreClass
   *
   * @returns {void}
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @description Remove AppStore change listener
   *
   * @param { Object } callback
   *
   * @method removeChangeListener
   *
   * @memberof AppStoreClass
   *
   * @returns { void }
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /**
   * @description This returns an array of group messages
   *
   * @method getGroupMessage
   *
   * @memberof AppStoreClass
   *
   * @returns { Array } Returns an array of group messages
   */
  getGroupMessage() {
    return newMessage;
  }

  /**
   * @description describes a method that gets a set current user
   * for listening in the component
   *
   * @method getCurrentUser
   *
   * @memberof AppStoreClass
   *
   * @returns {Array} Returns an array of group messages
   */
  getCurrentUser() {
    return currentUser;
  }

  /**
   * @description describes a method that gets set groups
   * in app
   *
   * @method getCurrentGroup
   *
   * @memberof AppStoreClass
   *
   * @returns { String } Returns all group names
   */
  getCurrentGroup() {
    return groupStore;
  }
  /**
   * @description describes a method that gets
   * a registered users groups
   *
   * @memberof AppStoreClass
   *
   * @returns { Object } Returns group details
   */
  getUserGroup() {
    return usersGroups;
  }

  /**
   * @description describes a method that gets all messages in app
   *
   * @memberof AppStoreClass
   *
   * @returns { Array} Returns an array of all messages
   */
  getAllMessages() {
    return allMessages;
  }

  /**
   * @description describes a method that gets all users in a group
   *
   * @memberof AppStoreClass
   *
   * @returns { Array } Returns an array of users
   */
  getAllUsers() {
    return allUserDetails;
  }

  /**
   * @description describes a method that gets names of rmembers
   * added to groups
   *
   * @memberof AppStoreClass
   *
   * @returns { String } Returns a string of user names
   */
  getAddMember() {
    return addRegisteredUser;
  }

  /**
   * @description describes a method that gets the full user details of
   * a new member of a group
   *
   * @memberof AppStoreClass
   *
   * @returns { Array } Returns an array of users and their details
   */
  getNewMember() {
    return newMember;
  }
  /**
   * @description describes a method that gets a google users
   * sign in details
   *
   * @memberof AppStoreClass
   *
   * @returns { Array } returns object containing google user details
   */
  getNewGoogleUser() {
    return googleUsers;
  }

  /**
 * @description describes a method that gets a google users
 * sign in details
 *
 * @memberof AppStoreClass
 *
 * @returns { Array } returns object containing google user details
 */
  getGoogleUpdate() {
    return googleUserUpdate;
  }
}

const AppStore = new AppStoreClass();
AppStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AppConstants.SET_USER:
      setCurrentUser(action.credentials);
      AppStore.emitChange();
      break;
    case AppConstants.SET_GROUP_NAMES:
      usersGroups.push(action.groupData);
      currentGroup(action.groupData);
      AppStore.emitChange();
      break;
    case AppConstants.LOAD_GROUP_NAMES:
      setUserGroup(action.userGroups);
      AppStore.emitChange();
      break;
    case AppConstants.SET_GROUP_MESSAGE:
      allMessages.push(action.groupMessage);
      saveGroupMessage(action.groupMessage);
      AppStore.emitChange();
      break;
    case AppConstants.LOAD_GROUP_MESSAGES:
      allGroupMessages(action.message);
      AppStore.emitChange();
      break;
    case AppConstants.GET_ALL_USERS:
      setAllUsers(action.allUsers);
      AppStore.emitChange();
      break;
    case AppConstants.ADD_USER_TO_GROUP:
      newMember.push(action.userData);
      setAddMember(action.userData);
      AppStore.emitChange();
      break;
    case AppConstants.LOAD_NEW_USERS:
      setNewMember(action.usersDetails);
      AppStore.emitChange();
      break;
    case AppConstants.GOOGLE_LOGIN:
      setNewGoogleUser(action.googleData);
      AppStore.emitChange();
      break;
    case AppConstants.GOOGLE_UPDATE:
      setGoogleUpdate(action.userData);
      AppStore.emitChange();
      break;
    default:
  }
});

export default AppStore;

