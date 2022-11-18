import * as Jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import User from '../database/models/user';
import { readFileSync } from 'fs';
import { ErrorTypes } from '../errors/catalog';

const JWT_SECRET = readFileSync('./jwt.key', { encoding: "utf8" }); // A senha esta 'exposta' para fins de demostração ;)

export default class JwtValidation {
  static createJwt = (username: string): string => {
    const token = Jwt.sign(
      { data: { username } },
      JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '1d' },
    );

    return token;
  };

  static validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      
      if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
      }
      
      const decoded = Jwt.verify(authorization, JWT_SECRET) as Jwt.JwtPayload;
      const user = await User.findOne({ where: { username: decoded.data.username } });
      
      if (!user) {
        return res.status(401).json({ message: 'Expired token' });
      }
      
      req.body = { ...req.body, user };
  
      next();
    } catch (err: any) {
      console.log(`Erro interno no JWT: ${err.message}`);
      throw new Error(ErrorTypes.InvalidToken);
    }
  };
}
