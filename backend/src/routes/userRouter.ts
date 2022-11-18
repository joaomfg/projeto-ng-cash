import { Router } from 'express';
import ValidateUser from '../middlewares/validateUser';
import JwtValidation from '../auth/jwt';

import UserController from '../controllers/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter.get('/', ValidateUser.validateLogin, userController.login);

userRouter.get('/validate', JwtValidation.validateToken, userController.findById);

userRouter.post('/register', ValidateUser.validateRegister, userController.create);

export default userRouter;
