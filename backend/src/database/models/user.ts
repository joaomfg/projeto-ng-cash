import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

import Account from './account';

class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

User.init({
  id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  username: { type: STRING(30), allowNull: false },
  password: { type: STRING(30), allowNull: false },
  accountId: { type: INTEGER, allowNull: false },
}, {
  underscored: true,
  modelName: 'User',
  sequelize: db,
  timestamps: false,
});

User.belongsTo(Account, { foreignKey: 'accountId', as: 'userAccount' });

Account.hasOne(User, { foreignKey: 'accountId', as: 'idAccount' });

export default User;
