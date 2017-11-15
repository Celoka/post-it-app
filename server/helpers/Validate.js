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
export const validateCreateUser = (req, res, next) => {
  req.check('email', 'Email is required').notEmpty();
  req.check('userName', 'Username is required').notEmpty().matches(/\w/);
  req.check('email', 'Bad email format').isEmail();
  req.check('password', 'Password is required').notEmpty();
  req.check('phoneNumber', 'Phone number is required').notEmpty().matches(/\d/);
  req.check('password',
   'Password must be at least 6 character and contain number')
  .isLength({ min: 5 })
  .matches(/\d/);

  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};

/**
 * @description describes a function that validates a user
 * input on login
 *
 * @param { object } req
 * @param { object } res
 * @param { function } next
 *
 * @function  validateLogin
 *
 * @return { object } return object containing validation error message
 */
export const validateLogin = (req, res, next) => {
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Invalid email format').isEmail();
  req.check('password', 'Password is required').notEmpty();
  req.check('password',
   'Password must be at least 6 character and contain number')
  .isLength({ min: 5 })
  .matches(/\d/);

  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};

/**
 * @description describes a function that validates string
 * when a group is being created
 *
 * @param { object } req
 * @param { object } res
 * @param { function } next
 *
 * @function  validateCreateGroup
 *
 * @return { object } return object containing validation error message
 */
export const validateCreateGroup = (req, res, next) => {
  req.check('group', 'Groupname is required').notEmpty().matches(/\w/);
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};

/**
 * @description describes a function that validates string for input field
 * when a member is being added to a group
 *
 * @param { object } req request object containg user details
 * @param { object } res response object containing the user details
 * @param { function } next function that runs the next
 * block of code when conditions is true
 *
 * @function validateAddmember
 *
 * @return { object } return object containing validation error message
 */
export const validateAddmember = (req, res, next) => {
  req.check('newUser', 'Username is required').notEmpty().matches(/\w/);
  req.check('userId', 'UserId is requied').notEmpty();
  req.check('groupId', 'GroupId is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};

/**
 * @description describes a function that validates input string
 * for email when requesting for a password reset
 *
 * @param { object } req request object containg user details
 * @param { object } res response object containing the user details
 * @param { function } next function that runs the next
 * block of code when conditions is true
 *
 * @function validateResetPassword
 *
 * @return { object } return object containing validation error message
 */
export const validateResetPassword = (req, res, next) => {
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Invalid email format').isEmail();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
    next();
  }
};

export const validateGetGroup = (req, res, next) => {
  req.check('userId', 'userId isrequired').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  }
};

