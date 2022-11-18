import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private _service = new UserService();

  login = async (req: Request, res: Response) => {
    const { body } = req;

    const user = await this._service.login(body);

    res.status(200).json({ token: user });
  };

  create = async (req: Request, res: Response) => {
    const { body } = req;

    const newUser = await this._service.create(body);

    res.status(200).json({ token: newUser });
  };

  findById = async (req: Request, res: Response) => {    
    const { user: { id } } = req.body;

    const findUser = await this._service.findById(id);

    res.status(200).json(findUser);
  };
}

export default UserController;
