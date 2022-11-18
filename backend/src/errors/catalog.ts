export enum ErrorTypes {
    UserNotFound = 'UserNotFound',
    IncorrectUsername = 'IncorrectUsername',
    IncorrectPassword = 'IncorrectPassword',
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
      message: 'Object not found',
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
  };
  