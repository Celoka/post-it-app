import express from 'express';
import {
  createUser,
  logIn,
  logOut,
  resetPassword,
  getUser,
  getAllUsers
} from '../controllers/users';
import {
  createGroup,
  addMember,
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
router.post('/group/:groupId/user', addMember);
router.post('/groups/:groupId/message', postMessage);

router.get('/user/getusers', getAllUsers);
router.get('/groups', getGroup);
router.get('/user/group', getUser);
router.get('/group/:groupId', getGroupMessage);

export default router;
