import express from 'express';
import {registerUser, getUser, updateUser, deleteUser} from '../controllers/user.js';

const router = express.Router();

router.get('/users/:username', getUser).post('/users/register', registerUser).put('/users/:username', updateUser).delete('/users/:username', deleteUser);

export default router;