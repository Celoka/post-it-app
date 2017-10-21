import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let newMember = [];
let currentUser = [];
let groups = '';
let usersGroups = [];
const newMessage = [];
let allMessages = [];
let allUserDetails = [];
let addRegisteredUser = '';


  /**
   * @param {any} message
   *
   * @memberof AppStoreClass
   *
   * @returns {void}
   */

function saveGroupMessage(groupMessage) {
  newMessage.push(groupMessage);
  return newMessage;
}

function allGroupMessages(message) {
  allMessages = message;
  return allMessages;
}
  /**
   * @param {any} user
   *
   * @memberof AppStoreClass
   *
   * @returns {void}
   */
function setCurrentUser(user) {
  currentUser = user;
  return currentUser;
}
function setAllUsers(allUsers) {
  allUserDetails = allUsers;
  return allUserDetails;
}
function setAddMember(message) {
  addRegisteredUser = message;
  return addRegisteredUser;
}
function setNewMember (usersDetails) {
  newMember = usersDetails;
  return newMember;
}
 /**
   * @param {any} group
   *
   * @memberof AppStoreClass
   *
   * @returns {void}
   */
function currentGroup(group) {
  groups = group;
  return groups;
}

/**
  *
  * @param {Object} userGroups

  * @memberof AppStoreClass

  * @returns {Object} user groups
  */
function setUserGroup(userGroups) {
  usersGroups = userGroups;
  return usersGroups;
}


/**
 * @class AppStoreClass
 * @extends {EventEmitter}
 */
class AppStoreClass extends EventEmitter {

    /**
   * @description Store emits event change
   *
   * @memberof AppStoreClass
   *
   * @returns {void}
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @description Store change listener
   *
   * @param {any} callback
   *
   * @memberof AppStoreClass
   *
   * @returns {void}
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @description Remove chnage listener
   *
   * @param {any} callback
   *
   * @memberof AppStoreClass
   *
   * @returns {void}
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /**
   * @description This returns an array of group messages
   *
   * @memberof AppStoreClass
   *
   * @returns {Array} Returns an array of group messages
   */
  getGroupMessage() {
    return newMessage;
  }

  /**
   * @memberof AppStoreClass
   *
   * @returns {Object} current user object is returned
   */
  getCurrentUser() {
    return currentUser;
  }

  /**
   *
   * @memberof AppStoreClass
   *
   * @returns {Object} group object
   */
  getCurrentGroup() {
    return groups;
  }
 /**
  *
  * @param {Object} groupNames

  * @memberof AppStoreClass

  * @returns {Object} user groups
  */
  getUserGroup() {
    return usersGroups;
  }
  getAllMessages() {
    return allMessages;
  }
  getAllUsers() {
    return allUserDetails;
  }
  getAddMember() {
    return addRegisteredUser;
  }
  getNewMember() {
    return newMember;
  }
}

const AppStore = new AppStoreClass();

AppStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AppConstants.SET_USER:
      setCurrentUser(action.user);
      AppStore.emitChange();
      break;
    case AppConstants.CREATE_GROUP:
      currentGroup(action.group);
      AppStore.emitChange();
      break;
    case AppConstants.SET_GROUP:
      setUserGroup(action.userGroups);
      AppStore.emitChange();
      break;
    case AppConstants.SET_GROUP_MESSAGE:
      allMessages.push(action.groupMessage);
      saveGroupMessage(action.groupMessage);
      AppStore.emitChange();
      break;
    case AppConstants.LOAD_GROUP_MESSAGE:
      allGroupMessages(action.message);
      AppStore.emitChange();
      break;
    case AppConstants.GET_ALL_USERS:
      setAllUsers(action.allUsers);
      AppStore.emitChange();
      break;
    case AppConstants.ADD_MEMBER_TO_GROUP:
      setAddMember(action.message);
      AppStore.emitChange();
      break;
    case AppConstants.GET_NEW_USERS:
      setNewMember(action.usersDetails);
      AppStore.emitChange();
      break;
    default:
  }
});

export default AppStore;

