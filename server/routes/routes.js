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

router.post('/api/v1/user/signup', validateCreateUser, createUser);
router.post('/api/v1/user/signin', validateLogin, logIn);
router.post('/api/v1/user/googlesignin', googleSignIn);
router.post('/api/v1/user/signout', logOut);
router.post('/api/v1/user/passwordreset', validateResetPassword, resetPassword);
router.post('/api/v1/group', validateCreateGroup, createGroup);
router.post('/api/v1/group/groupId/user', validateAddmember, addMemberToGroup);
router.post('/api/v1/groups/:groupId/message', postMessage);
router.get('/api/v1/groups/:groupId/members', newUsersInGroup);
router.get('/api/v1/user/allusers', getAllUsersInGroup);
router.get('/api/v1/groups', getGroup);
router.get('/api/v1/group/:groupId', getGroupMessage);
router.get('/api/v1/group/:groupId/users', getUserInGroup);

export default router;
