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
  postMessage,
  getGroup,
  getGroupMessage
} from '../controllers/groups';

const router = express.Router();

router.post('/user/signup', createUser);
router.post('/user/signin', logIn);
router.post('/user/signout', logOut);
router.post('/user/passwordreset', resetPassword);
router.post('/group', createGroup);
router.post('/group/:groupId/user', addUser);
router.post('/groups/:groupId/message', postMessage);

router.get('/groups', getGroup);
router.get('/user/group', getUser);
router.get('/group/:groupId', getGroupMessage);

export default router;
