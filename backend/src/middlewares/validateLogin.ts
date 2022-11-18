import { NextFunction, Request, Response } from 'express';
import User from '../database/models/user';

export default class VerifyLogin {
  static model = User;

  static validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    const userExists = await this.model.findOne({ where: { username } });
    
    if (userExists) {
      return res.status(400).json({ message: 'This username is taken!' });
    }

    next();
  };
}
