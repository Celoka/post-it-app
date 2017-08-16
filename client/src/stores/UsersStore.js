import { EventEmitter } from 'events';
import {
  GET_ALL_USERS,
  REGISTER_NEW_USER,
  LOGIN_USER } from '../constants/constants';
import dispatcher from '../dispatcher/dispatcher';

/**
 */
class UsersStore extends EventEmitter {
  /**
   */
  constructor() {
    super();
    this.users = {};
    this.user = {};
    this.error = {};
    this.handleActions = this.handleActions.bind(this);
  }
/**
 * @returns {*} getuser
 */
  getStatus() {
    const user = this.user;
    const error = this.error;
    return {
      user,
      error
    };
  }

  /**
   * @returns {Object} -
   * @memberof UsersStore
   */
  getUser() {
    return this.user;
  }
  /**
   * @returns {*} handle actions
   * @param {*} action
   */
  handleActions(action) {
    switch (action.type) {
    case GET_ALL_USERS:
      this.users = action.data;
      this.error = action.error;
      break;
    case LOGIN_USER:
      this.user = action.user;
      this.emit('login_success');
      break;
    case REGISTER_NEW_USER:
      this.error = action.error;
      this.user = action.data;
      break;
    default:
      //
    }
  }
}

const usersStore = new UsersStore();

dispatcher.register(usersStore.handleActions.bind(usersStore));
// dispatcher.login(usersStore.handleActions.bind(usersStore));

export default usersStore;

