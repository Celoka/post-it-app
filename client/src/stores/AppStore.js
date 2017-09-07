import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

class AppStoreClass extends EventEmitter {


  constructor() {
    super();
    this.users = {};
    this.user = {};
    this.error = {};
    this.currentUser = {};
  }
  
  getStatus() {
    const user = this.user;
    const error = this.error;
    return {
      user,
      error
    };
  }
  getUser() {
    return this.user;
  }
  setCurrentUser(user) {
    return this.currentUser = user;
  }  
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getCurrentUser() {
    return currentUser;
  }
  
}

const AppStore = new AppStoreClass();

AppStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
  case AppConstants.REGISTER_USER:
    AppStore.setCurrentUser(action.userDetails);
    AppStore.emitChange();
    break;
  case AppConstants.LOGIN_USER:
    AppStore.setCurrentUser(action.user);
    AppStore.emitChange('login_success');
    break;
  default:
  }
});

export default AppStore;

