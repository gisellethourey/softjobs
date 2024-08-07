import express from 'express';
import { newUser, loginUser, getUsers } from '../controllers/userController.js';
import {authenticateToken} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/usuarios', newUser);
router.post('/login', loginUser);
router.get('/usuarios', authenticateToken, getUsers);

export default router;