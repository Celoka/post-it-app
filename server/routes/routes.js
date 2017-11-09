import express from 'express';
import {
  validateCreateUser,
  validateLogin,
  validateCreateGroup,
  validateAddmember,
  validateResetPassword
 } from '../utils/helpers';
import jwtVerify from '../utils/authentication';
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
router.post('/api/v1/group', validateCreateGroup, jwtVerify, createGroup);
router.post('/api/v1/group/groupId/user', validateAddmember,
 jwtVerify, addMemberToGroup);
router.post('/api/v1/groups/:groupId/message', jwtVerify, postMessage);
router.get('/api/v1/groups/:groupId/members', jwtVerify, newUsersInGroup);
router.get('/api/v1/user/allusers', jwtVerify, getAllUsersInGroup);
router.get('/api/v1/groups', jwtVerify, getGroup);
router.get('/api/v1/group/:groupId', jwtVerify, getGroupMessage);
router.get('/api/v1/group/:groupId/users', jwtVerify, getUserInGroup);

export default router;
