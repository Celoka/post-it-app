import express from 'express';
import {
  validateCreateUser,
  validateLogin,
  validateCreateGroup,
  validateAddmember,
  validateResetPassword
 } from '../helpers/Validate';
import jwtVerify from '../helpers/Auth';
import {
  createUser,
  logIn,
  logOut,
  resetPassword,
  getAllUsers,
  newUsersInGroup,
  googleSignIn,
  googleUpdate
} from '../controllers/UserControllers';
import {
  createGroup,
  addMemberToGroup,
  postMessage,
  getUserGroup,
  getGroupMessage,
  getUserInGroup
} from '../controllers/GroupControllers';

const router = express.Router();
router.post('/api/v1/user/googleupdate', googleUpdate);
router.post('/api/v1/user/signup', validateCreateUser, createUser);
router.post('/api/v1/user/signin', validateLogin, logIn);
router.post('/api/v1/user/googlesignin', googleSignIn);
router.post('/api/v1/user/signout', logOut);
router.post('/api/v1/user/passwordreset', validateResetPassword, resetPassword);
router.post('/api/v1/group', jwtVerify, validateCreateGroup, createGroup);
router.post('/api/v1/group/groupId/user', jwtVerify,
 validateAddmember, addMemberToGroup);
router.post('/api/v1/groups/:groupId/message', jwtVerify, postMessage);
router.get('/api/v1/groups/:groupId/members', jwtVerify, newUsersInGroup);
router.get('/api/v1/allusers', jwtVerify, getAllUsers);
router.get('/api/v1/:userId/groups', jwtVerify, getUserGroup);
router.get('/api/v1/group/:groupId', jwtVerify, getGroupMessage);
router.get('/api/v1/group/:groupId/users', jwtVerify, getUserInGroup);

export default router;
