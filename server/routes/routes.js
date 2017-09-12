import express from 'express';
import {
  createUser,
  logIn,
  logOut,
  resetPassword,
  getUser
} from '../controllers/users';
import {
  createGroup,
  addUser,
  sendMessage,
  getGroup,
  getGroupMessages
} from '../controllers/groups';

const router = express.Router();

router.post('/user/signup', createUser);
router.post('/user/signin', logIn);
router.post('/user/signout', logOut);
router.post('/user/passwordreset', resetPassword);
router.post('/group', createGroup);
router.post('/group/:groupId/user', addUser);
router.post('/groupname/message', sendMessage);

router.get('/groups', getGroup);
router.get('/user', getUser);
router.get('/group/message', getGroupMessages);

export default router;
