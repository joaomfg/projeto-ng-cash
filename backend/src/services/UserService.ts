import * as bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';
import * as config from '../database/config/database';
import User from '../database/models/user';
import Account from '../database/models/account';
import { IUser } from '../interfaces/IUser';
import JwtValidation from '../auth/jwt';
import { ErrorTypes } from '../errors/catalog';

const sequelize = new Sequelize(config);

export default class UserService {
    private _model = User;
    private _accountModel = Account;

    create = async (obj: any): Promise<string> => {        
        const { username, password } = obj;

        const result = await sequelize.transaction(async (t) => {
            const newAccount = await this._accountModel.create({ balance: 100.00 });

            await this._model.create({
                username,
                password: bcrypt.hashSync(password, 8),
                accountId: newAccount.id,
            },
                { transaction: t });

            return JwtValidation.createJwt(username);
        });

        return result;
    };

    findById = async (id: string): Promise<IUser> => {
        const user = await this._model.findByPk(
            id,
            { include: { model: Account, as: 'userAccount' },
        });

        if (!user) {
            throw new Error(ErrorTypes.UserNotFound);
        }

        return user;
    };

    login = async (obj: IUser): Promise<string> => {
        const { username, password } = obj;

        const user = await this._model.findOne({ where: { username } });

        if (!user) {
            throw new Error(ErrorTypes.IncorrectUsername);
        }

        const comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            throw new Error(ErrorTypes.IncorrectPassword);
        }

        const token = JwtValidation.createJwt(username);

        return token;
    };

    findByUsername = async (username: string): Promise<IUser> => {
        console.log(username);
        
        const user = await this._model.findOne({ 
          where: { username },
          include: { model: Account, as: 'userAccount' },
        });

        if (!user) {
            throw new Error(ErrorTypes.UserNotFound);
        }

        return user;
    };
}
