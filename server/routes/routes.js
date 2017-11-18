import express from 'express';
import jwtVerify from '../middleware/jwtVerify';
import validateRequestBody from '../middleware/validateRequestBody';
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
router.post('/api/v1/user/googleupdate', validateRequestBody, googleUpdate);
router.post('/api/v1/user/signup', validateRequestBody, createUser);
router.post('/api/v1/user/signin', validateRequestBody, logIn);
router.post('/api/v1/user/googlesignin', validateRequestBody, googleSignIn);
router.post('/api/v1/user/signout', logOut);
router.post('/api/v1/user/passwordreset', validateRequestBody, resetPassword);
router.post('/api/v1/group', jwtVerify, validateRequestBody, createGroup);
router.post('/api/v1/group/groupId/user', jwtVerify,
  validateRequestBody, addMemberToGroup);
router.post('/api/v1/groups/:groupId/message',
 jwtVerify, validateRequestBody, postMessage);
router.get('/api/v1/groups/:groupId/members', jwtVerify, newUsersInGroup);
router.get('/api/v1/allusers', jwtVerify, getAllUsers);
router.get('/api/v1/:userId/groups',
  jwtVerify, validateRequestBody, getUserGroup);
router.get('/api/v1/group/:groupId', jwtVerify, getGroupMessage);
router.get('/api/v1/group/:groupId/users', jwtVerify, getUserInGroup);

export default router;
