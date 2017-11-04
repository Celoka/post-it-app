
import toastr from 'toastr';


/**
 * @function ToastrError
 *
 * @param { object } error
 *
 * @return { object } error message
 */
const ToastrError = (error) => {
  const status = error.response.data.message;
  toastr.error(status);
};

export default ToastrError;

