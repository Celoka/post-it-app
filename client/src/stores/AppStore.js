import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

/**
 * @class AppStoreClass
 * @extends {EventEmitter}
 */
class AppStoreClass extends EventEmitter {

  /**
   * Creates an instance of AppStoreClass.
   * @memberof AppStoreClass
   */
  constructor() {
    super();
    this.currentUser = {};
    this.groups = '';
    this.userGroups = [];
    this.message = [];
  }
   /**
   * @param {any} message
   * @memberof AppStoreClass
   * @returns {void}
   */
  setGroupMessage(message) {
    this.message = message;
  }

  /**
   * @description This returns an array of group messages
   * @memberof AppStoreClass
   * @returns {Array} Returns an array of group messages
   */
  getGroupMessage() {
    return this.message;
  }
  /**
   * @param {any} user
   * @memberof AppStoreClass
   * @returns {void}
   */
  setCurrentUser(user) {
    this.currentUser = user;
  }

  /**
   * @memberof AppStoreClass
   * @returns {Object} current user object is returned
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * @returns {void}
   * @param {any} group
   * @memberof AppStoreClass
   */
  currentGroup(group) {
    this.groups = group;
  }

  /**
   * @returns {Object} group object
   * @memberof AppStoreClass
   */
  getCurrentGroup() {
    return this.groups;
  }

/**
  *
  * @param {Object} userGroups
  * @memberof AppStoreClass
  * @returns {Object} user groups
  */
  setUserGroup(userGroups) {
    this.userGroups = userGroups;
  }

 /**
  *
  * @param {Object} groupNames
  * @memberof AppStoreClass
  * @returns {Object} user groups
  */
  getUserGroup() {
    return this.userGroups;
  }

  /**
   * @description Store emits event change
   * @memberof AppStoreClass
   * @returns {void}
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  /**
   * @description Store change listener
   * @param {any} callback
   * @memberof AppStoreClass
   * @returns {void}
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  /**
   * @description Remove chnage listener
   * @param {any} callback
   * @memberof AppStoreClass
   * @returns {void}
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const AppStore = new AppStoreClass();

AppStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AppConstants.SET_USER:
      AppStore.setCurrentUser(action.user);
      AppStore.emitChange();
      break;
    case AppConstants.CREATE_GROUP:
      AppStore.currentGroup(action.group);
      AppStore.emitChange();
      break;
    case AppConstants.SET_GROUP:
      AppStore.setUserGroup(action.userGroups);
      AppStore.emitChange();
      break;
    case AppConstants.SET_GROUP_MESSAGE:
      AppStore.setGroupMessage(action.message);
      AppStore.emitChange();
      break;
    default:
  }
});

export default AppStore;

