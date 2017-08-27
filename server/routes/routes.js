import express from 'express';
import {
  createUser,
  logIn,
  logOut
} from '../controllers/users';
import {
  createGroup,
  addUser,
  sendMessage
} from '../controllers/groups';

const router = express.Router();

router.post('/user/signup', createUser);
router.post('/user/signin', logIn);
router.post('/user/signout', logOut);
router.post('/group', createGroup);
router.post('/group/:groupId/user', addUser);
router.post('/groupName/message', sendMessage);

export default router;
