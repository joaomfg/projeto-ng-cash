import { Router } from 'express';
import VerifyLogin from '../middlewares/validateLogin';
import JwtValidation from '../auth/jwt';

import UserController from '../controllers/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter.get('/validate', JwtValidation.validateToken, userController.findById);

userRouter.get('/', userController.login);

userRouter.post('/register', VerifyLogin.validateRegister, userController.create);

export default userRouter;
