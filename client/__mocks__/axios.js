import groups from './groups.json';

const mockApiCall = {
  get() {
    return Promise.resolve(groups);
  },
  post() {
    return Promise.resolve();
  }
};
export default mockApiCall;
