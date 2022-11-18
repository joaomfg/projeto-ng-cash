import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  service = new UserService();

  login = async (req: Request, res: Response) => {
    const { body } = req;

    const user = await this.service.login(body);

    if (user === 'Incorrect username' || user === 'Incorrect password') {
      return res
        .status(401).json({ message: user });
    }

    res.status(200).json({ token: user });
  };

  create = async (req: Request, res: Response) => {
    const { body } = req;

    const newUser = await this.service.create(body);

    res.status(200).json({ token: newUser });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.body;

    const findUser = await this.service.findById(id);

    if (typeof findUser === 'string') {
      return res.status(400).json({ message: findUser });
    }

    res.status(200).json(findUser);
  };
}

export default UserController;
