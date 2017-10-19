import { EventEmitter } from 'events';
import _ from 'lodash';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _currentUser = [];
let _groups = '';
let _userGroups = [];
let newMessage = [];
let allMessages = [];


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
  _currentUser = user;
  return _currentUser;
}

 /**
   * @param {any} group
   *
   * @memberof AppStoreClass
   *
   * @returns {void}
   */
function currentGroup(group) {
  _groups = group;
  return _groups;
}

/**
  *
  * @param {Object} userGroups

  * @memberof AppStoreClass

  * @returns {Object} user groups
  */
function setUserGroup(userGroups) {
  _userGroups = userGroups;
  return _userGroups;
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
    return _currentUser;
  }

  /**
   *
   * @memberof AppStoreClass
   *
   * @returns {Object} group object
   */
  getCurrentGroup() {
    return _groups;
  }
 /**
  *
  * @param {Object} groupNames

  * @memberof AppStoreClass

  * @returns {Object} user groups
  */
  getUserGroup() {
    return _userGroups;
  }
  getAllMessages() {
    return allMessages;
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
    default:
  }
});

export default AppStore;

