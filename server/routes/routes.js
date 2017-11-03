import express from 'express';
import {
  validateCreateUser,
  validateLogin,
  validateCreateGroup,
  validateAddmember,
  validateResetPassword
 } from '../utils/helpers';
import {
  createUser,
  logIn,
  logOut,
  resetPassword,
  getAllUsersInGroup,
  newUsersInGroup,
  googleSignIn
} from '../controllers/users';
import {
  createGroup,
  addMemberToGroup,
  postMessage,
  getGroup,
  getGroupMessage,
  getUserInGroup
} from '../controllers/groups';

const router = express.Router();

router.post('/user/signup', validateCreateUser, createUser);
router.post('/user/signin', validateLogin, logIn);
router.post('/user/googlesignin', googleSignIn);
router.post('/user/signout', logOut);
router.post('/user/passwordreset', validateResetPassword, resetPassword);
router.post('/group', validateCreateGroup, createGroup);
router.post('/group/groupId/user', validateAddmember, addMemberToGroup);
router.post('/groups/:groupId/message', postMessage);
router.get('/groups/:groupId/members', newUsersInGroup);
router.get('/user/allusers', getAllUsersInGroup);
router.get('/groups', getGroup);
router.get('/group/:groupId', getGroupMessage);
router.get('/group/:groupId/users', getUserInGroup);

export default router;
