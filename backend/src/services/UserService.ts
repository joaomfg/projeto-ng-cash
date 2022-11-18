import * as bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';
import * as config from '../database/config/database';
import User from '../database/models/user';
import Account from '../database/models/account';
import { IUser } from '../interfaces/IUser';
import JwtValidation from '../auth/jwt';

const sequelize = new Sequelize(config);

export default class UserService {
    model = User;
    accountModel = Account;

    create = async (obj: any): Promise<string> => {        
        const { username, password } = obj;

        const result = await sequelize.transaction(async (t) => {
            const newAccount = await this.accountModel.create({ balance: 100.00 });

            await this.model.create({
                username,
                password: bcrypt.hashSync(password, 8),
                accountId: newAccount.id,
            },
                { transaction: t });

            return JwtValidation.createJwt(username);
        });

        return result;
    };

    findById = async (id: string): Promise<IUser | string> => {
        const user = await this.model.findByPk(
            id,
            { include: { model: Account, as: 'userAccount' },
        });

        if (!user) {
            return 'User does not exist';
        }

        return user;
    };

    login = async (obj: IUser): Promise<string> => {
        const { username, password } = obj;

        const user = await this.model.findOne({ where: { username } });

        if (!user) {
          return 'Incorrect username';
        }

        const comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return 'Incorrect password';
        }

        const token = JwtValidation.createJwt(username);

        return token;
    };
}
