import groups from './groups.json';
import loadmessage from './loadmessage.json';
//import registerUser from './resgisterUser.json';
import loginUser from './loginUser.json';

const mockApiCall = {
  get(url) {
    if (url === '/group/test') {
      return Promise.resolve(loadmessage);
    }
    return Promise.resolve(groups);
  },
  post(url) {
    if (url === '/user/test') {
      return Promise.resolve(loginUser);
    } 
     //  return Promise.resolve(loginUser);
    
  }
};
export default mockApiCall;
