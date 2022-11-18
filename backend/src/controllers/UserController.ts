import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  service = new UserService();

  login = async (req: Request, res: Response) => {
    const { body } = req;

    const user = await this.service.login(body);

    if (user === 'Incorrect email' || user === 'Incorrect password') {
      return res
        .status(401).json({ message: 'Incorrect email or password' });
    }

    res.status(200).json({ token: user });
  };

  create = async (req: Request, res: Response) => {
    const { body } = req;

    const newUser = await this.service.create(body);

    res.status(200).json({ token: newUser });
  };
}

export default UserController;
