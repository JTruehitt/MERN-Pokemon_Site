import express from 'express';
import {registerUser, getUser} from '../controllers/user.js';

const router = express.Router();

router.get('/users/:username', getUser).post('/users/register', registerUser);

export default router;