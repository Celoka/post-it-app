import groups from './groups.json';
import loadmessage from './loadmessage.json';
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
    if (url === '/groups/test/members') {
      return Promise.resolve(loadmessage);
    } else if (url === '/group/test') {
      return Promise.resolve(getNewUsers);
    } else if (url === '/user/allusers') {
      return Promise.resolve(allGroupMembers);
    }
    return Promise.resolve(groups);
  },
  post(url) {
    if (url === '/user/signup') {
      return Promise.resolve(registerUser);
    } else if (url === '/user/signin') {
      return Promise.resolve(loginUser);
    } else if (url === '/group') {
      return Promise.resolve(createGroup);
    } else if (url === '/group/groupId/user') {
      return Promise.resolve(addUser);
    } else if (url === '/user/passwordreset') {
      return Promise.resolve(resetPassword);
    } else if (url === '/user/signout') {
      return Promise.resolve(signOut);
    } else if (url === '/user/googlesignin') {
      return Promise.resolve(googleLogin);
    } else if (url === '/user/googleupdate') {
      return Promise.resolve(googleUpdate);
    }
    return Promise.resolve(postMessage);
  }
};
export default mockApiCall;
