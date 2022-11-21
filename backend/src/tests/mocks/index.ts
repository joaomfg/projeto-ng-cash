import * as bcrypt from 'bcryptjs';
import JwtValidation from '../../auth/jwt';

// LOGIN
export const validLogin = {
  username: 'joao',
  password: '12345678',
};

export const validRegister = {
  username: 'fulano',
  password: '87654321'
}

export const mockLogin = {
  username: 'joao',
  password: bcrypt.hashSync('12345678'),
  accountId: 1,
};

export const mockUserAccount = {
  dataValues: {
    username: 'joao',
    accountId: 1,
    userAccount: {
      id: 1,
      balance: 100,
    }
  }
}

export const mockAccount = {
  id: 1,
  balance: 100,
}

export const mockUserInfo = {
  username: 'joao',
  accountId: 1,
}

export const mockUserTransaction = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 1,
    value: 50,
    craetedAt: '2022-10-06T10:10:10Z',
  },
];

export const validateResponse = {
  user: mockUserAccount,
  transactions: mockUserTransaction,
}

export const invalidUsername = {
  username: 'sicrano',
  password: '12345678',
}

export const invalidPassword = {
  username: 'joao',
  password: 'senha_secreta',
}

export const mockJwtVerify = {
  username: 'joao',
}

export const validToken = JwtValidation.createJwt('joao');

export const invalidToken = 'th15.12.v4l1d'

// TRANSACTIONS

