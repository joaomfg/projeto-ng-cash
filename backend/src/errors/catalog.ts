export enum ErrorTypes {
    EntityNotFound = 'EntityNotFound',
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
  };
  