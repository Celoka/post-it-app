import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

class AppStoreClass extends EventEmitter {

  /**
   * Creates an instance of AppStoreClass.
   * @memberof AppStoreClass
   */
  constructor() {
    super();
    // this.user = {};
    this.users = {};
    this.error = {};
    this.currentUser = {};
    this.userGroups = [];
    this.message = [];
  }
  /**
   * @return {user,error}
   * @memberof AppStoreClass
   */
  getStatus() {
    const user = this.user;
    const error = this.error;
    return {
      user,
      error
    };
  }

  setGroupMessage(groupMessage) {
    this.message = groupMessage;
  }
  getGroupMessage() {
    return this.message;
  }
  /**
   *
   * @param {any} user
   * @memberof AppStoreClass
   */
  setCurrentUser(user) {
    this.currentUser = user;
  }

  /**
   *
   * @returns
   * @memberof AppStoreClass
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   *
   * @param {any} group
   * @memberof AppStoreClass
   */
  currentGroup(groupDetail) {
    this.groups = groupDetail;
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
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  /**
   * @description Store change listener
   * @param {any} callback
   * @memberof AppStoreClass
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  /**
   * @description Remove chnage listener
   * @param {any} callback
   * @memberof AppStoreClass
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
    AppStore.currentGroup(action.groupDetail);
    AppStore.emitChange();
    break;
  case AppConstants.SET_GROUP:
    AppStore.setUserGroup(action.userGroups);
    AppStore.emitChange();
    break;
  case AppConstants.SET_GROUP_MESSAGE:
    AppStore.setGroupMessage(action.groupMessage);
    AppStore.emitChange();
    break;
  default:
  }
});

export default AppStore;

