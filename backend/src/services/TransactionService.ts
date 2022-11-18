import { Op, Sequelize } from 'sequelize';
import Transaction from '../database/models/transaction';
import * as config from '../database/config/database';
import { ITransaction } from '../interfaces/ITransaction';
import Account from '../database/models/account';
import User from '../database/models/user';
import { IAccount } from '../interfaces/IAccount';
import { ErrorTypes } from '../errors/catalog';

const sequelize = new Sequelize(config);

export default class TransactionService {
    private _transactionModel = Transaction;
    private _accountModel = Account;

    newTransaction = async (obj: ITransaction): Promise<ITransaction> => {
        const { debitedAccountId, creditedAccountId, value } = obj;

        const accounts = await this.getAccounts({ debitedAccountId, creditedAccountId });

        const makeTransaction = await sequelize.transaction(async (t) => {
            // Debit the value from the account
            await this._accountModel.update(
                { balance: accounts[0].balance - value },
                { where: { id: debitedAccountId } },
            );

            // Credit the user account
            await this._accountModel.update(
                { balance: accounts[1].balance + value },
                { where: { id: creditedAccountId } },
            );

            const createTransaction = await this._transactionModel.create({
                debitedAccountId,
                creditedAccountId,
                value,
            });

            return createTransaction;
        });

        return makeTransaction;
    };

    getAccounts = async (obj: Partial<ITransaction>): Promise<IAccount[]> => {
        const { debitedAccountId, creditedAccountId } = obj;

        const debitedUser = await this._accountModel.findByPk(debitedAccountId);

        if (!debitedUser) throw new Error(ErrorTypes.UserNotFound);

        const creditedUser = await this._accountModel.findByPk(creditedAccountId);

        if (!creditedUser) throw new Error(ErrorTypes.UserNotFound);

        return [debitedUser, creditedUser];
    };

    findUserTransactions = async (accountId: string): Promise<ITransaction[]> => {
        const allTransactions = await this._transactionModel.findAll({
            where: {
              [Op.or]: [
                { debitedAccountId: accountId },
                { creditedAccountId: accountId },
              ]
            },
        });

        return allTransactions;
    };
}
