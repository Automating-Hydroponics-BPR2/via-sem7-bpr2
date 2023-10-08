import { Router } from 'express';
import passport from 'passport';
import { registerUser, loginUser, updateUserById, deleteUserById } from '../controllers/userController.js';

const userRouter = Router();

userRouter.patch('/', passport.authenticate('jwt', { session: false }), updateUserById);
userRouter.delete('/', passport.authenticate('jwt', { session: false }), deleteUserById);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

export default userRouter;
