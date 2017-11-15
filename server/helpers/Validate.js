/**
 * @description describes a function that checks for invalid
 * body request object
 *
 * @param { object } obj
 * 
 * @return { object } validationError messages for the particular identified
 */
function validate(obj) {
  if (obj.hasOwnProperty('body')) {
    for (const key in obj.body) {
      switch (key) {
        case 'email':
          obj.check('email', 'Email is required').notEmpty();
          obj.check('email', 'Invalid email format').isEmail();
          break;
        case 'password':
          obj.check('password', 'Password is required').notEmpty();
          obj.check('password',
          'Password must be at least 6 character and contain number')
         .isLength({ min: 5 })
         .matches(/\d/);
          break;
        case 'userName':
          obj.check('userName', 'Username is required').notEmpty().matches(/\w/);
          break;
        case 'group':
          obj.check('group', 'Groupname is required').notEmpty().matches(/\w/);
          break;
        case 'newUser':
          obj.check('newUser', 'Username is required').notEmpty().matches(/\w/);
          break;
        case 'userId':
          obj.check('userId', 'UserId is requied').notEmpty();
          break;
        case 'groupId':
          obj.check('groupId', 'GroupId is required').notEmpty();
          break;
        default:
          obj.check('name', 'Invalid email format').notEmpty();
      }
    }
  }
  return obj.validationErrors();
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
