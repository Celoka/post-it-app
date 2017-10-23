import groups from './groups.json';

const mockApiCall = {
  get() {
    return Promise.resolve(groups);
  }
};
export default mockApiCall;
