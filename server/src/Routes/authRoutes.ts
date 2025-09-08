import * as express from 'express';

import { getCurrentUser, login, logout, signup } from '../Controllers/user/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const authRoutes = express.Router();
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user", authMiddleware, getCurrentUser);
authRoutes.get("/logout", logout);

export default authRoutes;
