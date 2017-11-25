/**
 * @description describes a function that checks for invalid
 * body request object
 *
 * @param { object } request
 *
 * @return { object } validationError messages for the particular identified
 */
function validate(request) {
  if (request.hasOwnProperty('body')) {
    for (const key in request.body) {
      switch (key) {
        case 'email':
          request.check('email', 'Email is required').notEmpty();
          request.check('email', 'Invalid email format').isEmail();
          break;

        case 'password':
          request.check('password', 'Password is required').notEmpty();
          request.check('password',
            'Password must be at least 6 character and contain number')
            .isLength({ min: 5 })
            .matches(/\d/);
          break;

        case 'phoneNumber':
          request.check('phoneNumber', 'Phone number is required')
            .notEmpty().matches(/\d/);
          break;

        case 'userName':
          request.check('userName', 'Username is required')
            .notEmpty().matches(/\w/);
          request.check('userName', 'User name should be at least 3 characters')
            .isLength(3, 50);
          break;

        case 'group':
          request.check('group', 'Group name is required')
            .notEmpty().matches(/\w/);
          request.check('group', 'Group name should be at least 3 characters')
            .isLength(3, 50);
          break;

        case 'newUser':
          request.check('newUser', 'Username is required')
            .notEmpty().matches(/\w/);
          break;

        case 'userId':
          request.check('userId', 'User Id is required').notEmpty();
          break;

        case 'groupId':
          request.check('groupId', 'GroupId is required').notEmpty();
          break;

        case 'displayName':
          request.check('displayName', 'Displayname is required')
            .notEmpty().matches(/\w/);
          request.check('displayName',
            'Display name should be at least 3 characters')
            .isLength(3, 50);
          break;

        case 'priority':
          request.check('priority', 'Message priority is required')
            .notEmpty().matches(/\w/);
          break;

        case 'uid':
          request.check('uid', 'This field cannot be empty')
            .notEmpty().matches(/\w/);
          break;
        default:
      }
    }
  }

  return request.validationErrors();
}

/**
 * @description describes a function that validates a user
 * input on signup
 *
 * @param { object } req
 * @param { object } res
 * @param { function } next
 *
 * @function  validateCreateUser
 *
 * @return { object } return object containing validation error message
 */
const validateRequestBody = (req, res, next) => {
  const errors = validate(req);
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};
export default validateRequestBody;
