export enum ErrorTypes {
    UserNotFound = 'UserNotFound',
    IncorrectUsername = 'IncorrectUsername',
    IncorrectPassword = 'IncorrectPassword',
    TakenUsername = 'TakenUsername',
    InvalidToken = 'InvalidToken',
    EqualUsernames = 'EqualUsernames',
    InsuficientFunds = 'InsuficientFunds',
  }
  
  type ErrorResponseObject = {
    message: string;
    httpStatus: number,
  };
  
  export type ErrorCatalog = {
    [key in ErrorTypes]: ErrorResponseObject;
  };
  
  export const errorCatalog: ErrorCatalog = {
    UserNotFound: {
      message: 'User not found',
      httpStatus: 404,
    },
    IncorrectUsername: {
      message: 'Incorrect username',
      httpStatus: 401,
    },
    IncorrectPassword: {
      message: 'Incorrect password',
      httpStatus: 401,
    },
    InvalidToken: {
      message: 'Invalid token',
      httpStatus: 401,
    },
    TakenUsername: {
      message: 'This username is taken',
      httpStatus: 409,
    },
    EqualUsernames: {
      message: 'You can\'t make a transaction to yourself',
      httpStatus: 400,
    },
    InsuficientFunds: {
      message: 'Insuficient funds',
      httpStatus: 400,
    },
  };
  