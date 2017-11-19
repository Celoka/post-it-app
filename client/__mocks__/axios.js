import groups from './groups.json';
import loadMessage from './loadMessage.json';
import registerUser from './resgisterUser.json';
import loginUser from './loginUser.json';
import createGroup from './createGroup.json';
import getNewUsers from './getNewUsers.json';
import addUser from './addUser.json';
import allGroupMembers from './allGroupMembers.json';
import resetPassword from './resetPassword.json';
import signOut from './signOut.json';
import postMessage from './postMessage.json';
import googleLogin from './googleLogin.json';
import googleUpdate from './googleUpdate.json';

const mockApiCall = {
  get(url) {
    if (url === '/api/v1/group/groupId') {
      return Promise.resolve(loadMessage);
    } else if (url === '/group/test') {
      return Promise.resolve(getNewUsers);
    } else if (url === '/api/v1/allusers') {
      return Promise.resolve(allGroupMembers);
    }
    return Promise.resolve(groups);
  },
  post(url) {
    if (url === '/api/v1/user/signup') {
      return Promise.resolve(registerUser);
    } else if (url === '/api/v1/user/signin') {
      return Promise.resolve(loginUser);
    } else if (url === '/api/v1/group') {
      return Promise.resolve(createGroup);
    } else if (url === '/api/v1/group/groupId/user') {
      return Promise.resolve(addUser);
    } else if (url === '/user/passwordreset') {
      return Promise.resolve(resetPassword);
    } else if (url === '/user/signout') {
      return Promise.resolve(signOut);
    } else if (url === '/api/v1/user/googlesignin') {
      return Promise.resolve(googleLogin);
    } else if (url === '/api/v1/user/googleupdate') {
      return Promise.resolve(googleUpdate);
    }
    return Promise.resolve(postMessage);
  }
};
export default mockApiCall;
