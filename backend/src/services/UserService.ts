import * as bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';
import * as config from '../database/config/database';
import User from '../database/models/user';
import Account from '../database/models/account';
import { IUser } from '../interfaces/IUser';
// import JwtValidation from '../middlewares/jwt';

const sequelize = new Sequelize(config);

export default class UserService {
    model = User;
    accountModel = Account;

    create = async (obj: any) => {
        const { username, password } = obj;

        const result = await sequelize.transaction(async (t) => {
            const newAccount = await this.accountModel.create({ balance: 100.00 });
            
            const newUser = await this.model.create({
                username,
                password: bcrypt.hashSync(password, 8),
                accountId: newAccount.id,
            },
            { transaction: t });

            return newUser;
        });

        return result;
    };

    findAll = async () => {
        const result = await this.model.findAll();
        return result;
    };

    findById = async (id: string) => null;

    update = async (id: string, body: IUser) => null;

    delete = async (id: string) => {};
}
