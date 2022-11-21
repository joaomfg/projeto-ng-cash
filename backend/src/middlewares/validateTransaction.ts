import { NextFunction, Request, Response } from 'express';
import Account from '../database/models/account';
import User from '../database/models/user';
import { ErrorTypes } from '../errors/catalog';

export default class ValidateTransaction {
  private static _model = User;

  static validateUsers = async (req: Request, _res: Response, next: NextFunction) => {
    const { debitUserId, creditUser, value } = req.body;

    const getDebitUser = await this._model.findByPk(debitUserId, { include: { model: Account, as: 'userAccount' } });
    const getCreditUser = await this._model.findOne({ where: { username: creditUser } });

    if (!getCreditUser || !getDebitUser) {
      throw new Error(ErrorTypes.UserNotFound);
    }

    if (getDebitUser.username === getCreditUser.username) {
      throw new Error(ErrorTypes.EqualUsernames);
    }

    req.body = {
      debitUser: getDebitUser,
      creditUser: getCreditUser,
      value,
    };

    next();
  };

  static validateAccount = async (req: Request, _res: Response, next: NextFunction) => {
    const { debitUser, creditUser, value } = req.body;

    const { userAccount } = debitUser;

    if ((Number(userAccount.balance) - Number(value)) <= 0) {
      throw new Error(ErrorTypes.InsuficientFunds);
    }

    req.body = {
      debitedAccountId: userAccount.id,
      creditedAccountId: creditUser.userAccount.id,
      value,
    };

    next();
  };
}
