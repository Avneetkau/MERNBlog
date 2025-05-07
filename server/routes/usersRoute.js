/*import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;*/
import express from 'express';
import { test } from '../controllers/userController.js';
import { updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser } from '../controllers/userController.js';
import { signOut } from '../controllers/userController.js';
import { getUsers } from '../controllers/userController.js';

import { getUser } from '../controllers/userController.js';


const router = express.Router();

router.get('/test', test);
router.put('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signOut);
router.get('/getusers', verifyToken, getUsers);

router.get('/:userId', getUser);


export default router;
