import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';

import Account from './account';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transaction.init({
  id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  debitedAccountId: { type: INTEGER, allowNull: false },
  creditedAccountId: { type: INTEGER, allowNull: false },
  value: { type: INTEGER, allowNull: false },
  createdAt: { type: DATE, allowNull: false, defaultValue: Date.now() },
}, {
  underscored: true,
  modelName: 'Transaction',
  sequelize: db,
  timestamps: false,
});

Transaction.belongsTo(Account, { foreignKey: 'debitedAccountId', as: 'accountDebited' });
Transaction.belongsTo(Account, { foreignKey: 'creditedAccountId', as: 'accountCredited' });

Account.hasOne(Transaction, { foreignKey: 'debitedAccountId', as: 'transactionDebited' });
Account.hasOne(Transaction, { foreignKey: 'creditedAccountId', as: 'transactionCredited' });

export default Transaction;
