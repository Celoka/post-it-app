
import toastr from 'toastr';
import axios from 'axios';


/**
 * @function ToastrError
 *
 * @param { object } error
 *
 * @return { object } error message
 */
export const ToastrError = (error) => {
  console.log(error)
  // const status = error.response.data.message;
  // toastr.error(status);
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

