import * as Jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import UserService from '../services/UserService';
import { readFileSync } from 'fs';
import { ErrorTypes } from '../errors/catalog';

const JWT_SECRET = readFileSync('./jwt.key', { encoding: "utf8" }); // A senha esta 'exposta' para fins de demostração ;)

export default class JwtValidation {
  private static _service = new UserService();
  
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
      
      const user = await this._service.findByUsername(decoded.data.username);
      
      if (!user) {
        return res.status(401).json({ message: 'Expired token' });
      }
      
      req.body = { ...req.body, user };
  
      next();
    } catch (err: any) {
      console.log(`Erro interno no JWT: ${err}`);
      throw new Error(ErrorTypes.InvalidToken);
    }
  };
}
