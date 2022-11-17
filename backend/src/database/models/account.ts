import { Model, INTEGER } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  balance!: number;
}

Account.init({
  id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  balance: { type: INTEGER, allowNull: false },
}, {
  underscored: true,
  modelName: 'Account',
  sequelize: db,
  timestamps: false,
});

// 1:1 USERS

export default Account;
