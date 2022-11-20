import { NextFunction, Request, Response } from 'express';
import { ErrorTypes } from '../errors/catalog';
import User from '../database/models/user';
import { UserZodSchema } from '../interfaces/IUser';

export default class ValidateUser {
  static model = User;

  static validateRegister = async (req: Request, _res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const userExists = await this.model.findOne({ where: { username } });
    
    if (userExists) {
      throw new Error(ErrorTypes.TakenUsername);
    }

    const parsed = UserZodSchema.safeParse({ username, password });

    if (!parsed.success) throw parsed.error;

    next();
  };

  static validateLogin = async (req: Request, _res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const parsed = UserZodSchema.safeParse({ username, password });

    if (!parsed.success) throw parsed.error;

    next();
  };
}
