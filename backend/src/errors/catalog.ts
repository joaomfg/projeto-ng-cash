export enum ErrorTypes {
    EntityNotFound = 'EntityNotFound',
    InvalidToken = 'InvalidToken',
  }
  
  type ErrorResponseObject = {
    message: string;
    httpStatus: number,
  };
  
  export type ErrorCatalog = {
    [key in ErrorTypes]: ErrorResponseObject;
  };
  
  export const errorCatalog: ErrorCatalog = {
    EntityNotFound: {
      message: 'Object not found',
      httpStatus: 404,
    },
    InvalidToken: {
      message: 'invalid token',
      httpStatus: 401,
    }
  };
  