import DefaultController from './DefaultController';
import UserService from '../services/UserService';
import { IUser } from '../interfaces/IUser';

export default class UserController extends DefaultController<IUser> {
  constructor(service = new UserService()) {
    super(service);
  }
}
