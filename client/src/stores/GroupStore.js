import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import dispatcher from '../dispatcher/dispatcher';

/**
 */
class GroupStore extends EventEmitter {
  /**
   */
  constructor() {
    super();
    this.group = {};
    this.allGroups = [];
    this.handleActions = this.handleActions.bind(this);
  }

  handleActions(action) {
    switch (action.type) {
    case CREATE_USER_GROUP:
      this.error = action.error;
      this.group = action.data;
      break;
    case GET_USER_GROUP:
      this.error = action.error;
      this.group = action.data;
      break;
    default:
      //
    }
  }
}
const groupStore = new GroupStore();

dispatcher.register(groupStore.handleActions.bind(groupStore));

export default groupStore;
