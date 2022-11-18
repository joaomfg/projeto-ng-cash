import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  service = new UserService();

  login = async (req: Request, res: Response) => {
    const { body } = req;

    const user = await this.service.login(body);

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

    res.status(200).json(findUser);
  };
}

export default UserController;
